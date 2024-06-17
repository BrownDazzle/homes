import mongoose from 'mongoose';
import Reservation, { IReservation } from "../lib/database/models/reservation.model";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query['listing.userId'] = authorId; // Assuming the authorId refers to the userId of the listing
    }

    const reservations = await Reservation.find(query)
      .populate('listing')
      .sort({ createdAt: 'desc' })
      .exec();

    // Convert Mongoose documents to plain JavaScript objects
    const plainReservations = reservations.map((reservation) => {
      return reservation.toObject();
    });

    return plainReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
