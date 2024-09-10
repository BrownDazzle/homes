'use client';
import React, { useCallback } from "react"
import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import useReservationModal from "@/app/hooks/useReservationModal";
import Chat from "../Chat";
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { IListing } from "@/app/lib/database/models/listing.model";
import Avatar from "../Avatar";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import HostGrading from "../ui/host-grading";



interface ListingReservationProps {
  propertyUserId: string;
  listing: IListing;
  listingId: string;
  currentUser: SafeUser;
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
  locationValue: string;
  category: string;
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  propertyUserId,
  listing,
  listingId,
  currentUser,
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  locationValue,
  category
}) => {
    const { data: session } = useSession()
    const userId = session?.user._id;
    const user = session?.user;
    const router = useRouter();

    const reservationModal = useReservationModal();
    const reservationFee = 0.5 / 10 * totalPrice;

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng

    const onReserve = useCallback((data: any) => {
      reservationModal.propertyUserId = data.userId;
      reservationModal.listingId = data._id;
      reservationModal.price = reservationFee;
      reservationModal.onOpen();
    }, [reservationModal, reservationFee]);

    const handleProfile = () => {
      router.push(`/profile/${user?._id}`)
    }

    return (
      <div
        className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
      >

        <div className="
      flex flex-col gap-1 p-4">
          <div
            className="
           mb-5
            flex 
            flex-row 
            items-center
            gap-2
            cursor-pointer
          "
            onClick={handleProfile}
          >
            <Image
              className="rounded-lg"
              height="70"
              width="70"
              alt="Avatar"
              src={user?.image || '/images/placeholder.jpg'}
            />
            <div className="flex flex-col w-full gap-2 p-2">
              <p className="text-xl font-semibold text-slate-800">Hosted by</p>
              <p className="text-2xl font-semibold">{user?.name}</p>

            </div>

          </div>
          <HostGrading propertiesListed={40 || 0} />

          <div className="font-light text-slate-800 bg-neutral-100 py-4 px-1 rounded-lg">
            Hi {user?.name}, I would like to know more about this listing.
          </div>
        </div>
        <hr />

        {listing.category === "Booking" && (<Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) =>
            onChangeDate(value.selection)}
        />)}
        <hr />
        <div
          className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
        >
          <div>
            Reservation fee
          </div>
          <div>
            ZMW {reservationFee}
          </div>
        </div>
        <hr />
        {userId !== propertyUserId ? (<div className="p-4">
          <Button
            disabled={disabled}
            label="Poke Landlord"
            onClick={() => onReserve({ listing: listing, userId: propertyUserId })}
          />
        </div>) : null}
      </div>
    );
  }

export default ListingReservation;