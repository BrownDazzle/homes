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
import { images } from "./ListingHead";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
  startTime: Date; // Start time of the listing
  duration: number; // Duration of the listing in minutes
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  startTime,
  duration
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date(startTime?.getTime() + duration * 60000); // Convert duration to milliseconds
      const timeDifference = endTime.getTime() - now.getTime();

      if (timeDifference <= 0) {
        // Listing has expired
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        // Update remaining time
        setRemainingTime(timeDifference);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startTime, duration]);

  // Format remaining time
  const formattedRemainingTime = new Date(remainingTime).toISOString().substr(11, 8);


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

    return data.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
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
          <Sliders banners={data.imageSrc as string[]} speed={500} slidesToShow={1} rtl={false} dots={true} />
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
        </div>
        <div onClick={() => router.push(`/listings/${data._id}`)} className="flex flex-col gap-4 w-full p-2">
          <Heading
            title={data?.title as string}
            subtitle={`${data?.district}, ${data?.compound}`}
          />
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">
              {data.property_type}
            </div>
            <div className="font-light font-semibold text-neutral-500">
              {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1 w-full">
              {!reservation && (
                <div className="font-light">{`${data.roomCount} Room${data?.roomCount && data?.roomCount > 1 ? "s" : ""}`}</div>
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