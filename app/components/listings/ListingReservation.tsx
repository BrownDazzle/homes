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

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingReservationProps {
  propertyUserId: string;
  currentUser: SafeUser;
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  locationValue: string;
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  propertyUserId,
  currentUser,
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  locationValue
}) => {
    const reservationModal = useReservationModal();
    const reservationFee = 0.5 / 10 * totalPrice;

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng

    const onReserve = useCallback((id: string) => {
      reservationModal.propertyUserId = id;
      reservationModal.onOpen();
    }, [reservationModal, reservationFee]);

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
      flex flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">
            ZMW {price}
          </div>
          <div className="font-light text-neutral-600">
            night
          </div>
        </div>
        <hr />
        <Map center={coordinates} />
        {/* <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) =>
            onChangeDate(value.selection)}
        />*/}
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
        <div className="p-4">
          <Button
            disabled={disabled}
            label="Poke Landlord"
            onClick={() => onReserve(propertyUserId)}
          />
        </div>
      </div>
    );
  }

export default ListingReservation;