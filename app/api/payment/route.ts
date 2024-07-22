import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectToDatabase } from "@/app/lib/database";
import { orderProcess } from "@/app/lib/payment.server";
import { Currencies } from "flutterwave-node-v3-withtypes/utils/types";
import { MobileMoneyNetworks } from "flutterwave-node-v3-withtypes/services/mobile-money/types";
import { initiateMtnPayment } from "@/app/lib/mtn.apis";
import Reservation from "@/app/lib/database/models/reservation.model";
import User from "@/app/lib/database/models/user.model";

export async function POST(
    request: Request,
) {
    try {
        const body = await request.json();
        const { amount, mobileNumber, listingId, totalPrice } = body;
        console.log("PAY_RES_MTN_BODY", body)

        await connectToDatabase(); // Connect to MongoDB

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const paymentResponse = await initiateMtnPayment(amount, mobileNumber);

        console.log("PAYME_T", paymentResponse)

        const reservationData = {
            userId: currentUser._id,
            listingId,
            totalPrice
        }
        const reservation = new Reservation(reservationData);
        await reservation.save();

        // Get the ID of the newly created reservation
        const reservationId = reservation._id;

        // Find the listing document by ID and update it with the reservation ID

        const listingAndReservation = await User.findOneAndUpdate(
            { _id: currentUser._id },
            { $addToSet: { reservations: reservationId } }, { new: true });

        if (!listingAndReservation) {
            return new NextResponse('Not Found', { status: 404 });
        }
        console.log("PAY_RES:", listingAndReservation);
        //return NextResponse.json(listingAndReservation);
        return NextResponse.json(listingAndReservation);
    } catch (error) {
        console.log("Error updating listing:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
