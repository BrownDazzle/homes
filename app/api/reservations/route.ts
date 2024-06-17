import { NextResponse } from "next/server";
import mongoose from "mongoose";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/app/lib/database/models/listing.model";
import { getUserByEmail } from "@/app/actions/user.actions";
import Reservation from "@/app/lib/database/models/reservation.model";

export async function POST(
  request: Request,
) {
  const body = await request.json();
  const {
    user,
    listingId,
    startDate,
    endDate,
    totalPrice
  } = body;

  const currentUser = await getUserByEmail(user?.email);
  console.log("PROFILE_User", currentUser, body)
  if (!currentUser) {
    return NextResponse.error();
  }



  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const reservationData = {
    userId: currentUser._id,
    startDate,
    endDate,
    totalPrice
  }

  try {
    // Update the listing document in MongoDB
    // Create a new reservation document
    const reservation = new Reservation(reservationData);
    await reservation.save();

    // Get the ID of the newly created reservation
    const reservationId = reservation._id;

    // Find the listing document by ID and update it with the reservation ID

    const listingAndReservation = await Listing.findByIdAndUpdate(listingId, {
      $addToSet: { reservations: reservationId } // Assuming reservations is an array field in the Listing model
    }, { new: true });

    if (!listingAndReservation) {
      return NextResponse.error();
    }

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.error();
  }
}
