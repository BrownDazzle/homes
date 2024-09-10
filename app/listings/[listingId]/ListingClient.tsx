'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval, isValid } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { CreateUserParams, SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories, listingCategories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { useSession } from "next-auth/react";
import { IListing } from "@/app/lib/database/models/listing.model";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: IListing & {
    user: CreateUserParams;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  console.log("LIST_NG", listing)

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: SafeReservation) => {
      const startDate = new Date(reservation?.startDate);
      const endDate = new Date(reservation?.endDate);

      // Ensure both dates are valid and that startDate is before or equal to endDate
      if (isValid(startDate) && isValid(endDate) && startDate <= endDate) {
        const range = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });

        dates = [...dates, ...range];
      }
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return listingCategories.find((items) =>
      items.label === listing.property_type);
  }, [listing.property_type]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!user) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios.post('/api/reservations', {
      user,
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?._id
    })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
    [
      totalPrice,
      dateRange,
      listing?._id,
      router,
      user,
      loginModal
    ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          sm:pt-20
          md:pt-10
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc as string[]}
            district={listing.district}
            compound={listing.compound}
            id={listing._id}
            currentUser={user as SafeUser}
            locationValue={listing.locationValue as string}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={user as SafeUser}
              listingId={listing._id}
              category={category}
              property_type={listing.property_type as string}
              description={listing.description as string}
              roomCount={listing.roomCount as number}
              guestCount={listing.guestCount as number}
              bathroomCount={listing.bathroomCount as number}
              amenities={listing.amenities as string[]}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              locationValue={listing.locationValue as string}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                listing={listing}
                propertyUserId={listing.user._id}
                listingId={listing._id}
                currentUser={currentUser as SafeUser}
                price={listing.price as number}
                totalPrice={totalPrice as number}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                locationValue={listing.locationValue as string}
                category={listing.category as string}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
