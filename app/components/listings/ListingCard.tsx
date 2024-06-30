'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useEffect, useState } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import {
  SafeListing,
  SafeReservation,
  SafeUser
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import Sliders from "../sliders";
import Heading from "../Heading";
import Badge from "../ui/badge";
import { CiBadgeDollar } from "react-icons/ci";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null

};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,

}) => {
  const router = useRouter();
  const { getByValue } = useCountries();


  const location = getByValue(data?.locationValue as string);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    //return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group shadow-lg rounded-md bg-white"
    >
      <div className="flex flex-col-reverse sm:flex-row-reverse gap-2 w-full h-full">
        <div
          className="
             
            w-full
            h-full
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Sliders banners={data?.imageSrc as string[]} speed={500} slidesToShow={1} rtl={false} dots={true} />
          <div className="
            absolute
            top-3
            right-3
            w-full
          ">
            <HeartButton
              listingId={data?._id}
              currentUser={currentUser}
            />
          </div>
          {data?.isPremium && (
            <div className="absolute top-2 left-2">
              <Badge label="Premium" icon={CiBadgeDollar} />
            </div>
          )}
        </div>
        <div onClick={() => router.push(`/listings/${data?._id}`)} className="flex flex-col gap-1 w-full p-2">
          <Heading
            title={data?.title as string}
            subtitle={`${data?.district}, ${data?.compound}`}
          />
          <div className="flex flex-col gap-1 pl-2">
            <div className="font-semibold text-lg">
              {data?.property_type}
            </div>
            <div className="font-light font-semibold text-neutral-500">
              {reservationDate || data?.category}
            </div>
            <div className="flex flex-row items-center gap-1 w-full">
              {!reservation && (
                <div className="font-light">{`${data?.roomCount} Room${data?.roomCount && data?.roomCount > 1 ? "s" : ""}`}</div>
              )}
              <div className="font-semibold">
                ZMW {price}
              </div>
            </div>
          </div>
          {/* onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )*/}
        </div>
      </div>
    </div>
  );
}

export default ListingCard;