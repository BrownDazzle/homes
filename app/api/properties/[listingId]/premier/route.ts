import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import Listing from "@/app/lib/database/models/listing.model";
import { getUserByEmail } from "@/app/actions/user.actions";

interface IParams {
    listingId?: string;
}

export async function PATCH(
    request: Request,
    { params }: { params: IParams }
) {
    const body = await request.json();
    const { user, data } = body;
    const currentUser = await getUserByEmail(user.email);

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    try {
        const listing = await Listing.findOne({
            _id: listingId,
            userId: currentUser._id
        });

        if (!listing) {
            return NextResponse.json(new Error("Listing not found or user not authorized to update it"));
        }

        // Update the isReserved property to true
        listing.premiumTargetDate = data.premiumTargetDate;
        listing.isPremium = true;
        await listing.save();

        return NextResponse.json({ message: "Listing marked as reserved successfully" });
    } catch (error) {
        console.error("Error marking listing as reserved:", error);
        return NextResponse.json(new Error("An error occurred while marking the listing as reserved"));
    }
}
