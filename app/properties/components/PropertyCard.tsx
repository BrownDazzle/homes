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

import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";

interface PropertyCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
    startTime?: Date | undefined; // Start time of the listing
    duration?: number; // Duration of the listing in minutes
};

const PropertyCard: React.FC<PropertyCardProps> = ({
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
            onClick={() => router.push(`/properties/${data._id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
                >
                    <Image
                        fill
                        className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
                        src={data?.imageSrc[0] as string}
                        alt="Listing"
                    />
                </div>
                <div className="font-semibold text-lg">
                    {data.title}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default PropertyCard;