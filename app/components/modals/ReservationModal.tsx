'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import useReservationModal from "@/app/hooks/useReservationModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from '../Heading';
import Input from '../inputs/Input';
import { FieldValues, useForm } from 'react-hook-form';
import PhoneInput from '../inputs/InputNumber';
import { listingTypes } from '../navbar/Categories';
import { networkTypes } from '@/app/data';
import Chat from '../Chat';
import { useSession } from 'next-auth/react';
import ChatBox from '../ChatBox';
import getConversationById from '@/app/actions/getConversationById';
import { CreateUserParams } from '@/app/types';
import axios from 'axios';
import socket from '../../lib/socket.io';
import getListingById from '@/app/actions/getListingById';
import { IParams } from '@/app/listings/[listingId]/page';
import { IListing } from '@/app/lib/database/models/listing.model';
import { IConversation } from '@/app/lib/database/models/conversation.model';
import { IUser } from '@/app/lib/database/models/user.model';
import ChatHome from '../chat/chat';
import ChatId from '../chat/chatId/chat-id';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

interface listingType {
  listing: IListing & {
    user: CreateUserParams;
  };
}

interface ChatBoxProps {
  conversation: IConversation & {
    users: IUser[],
    listing: IListing
  }
}

const ReservationModal = () => {
  const router = useRouter();
  const reservationModal = useReservationModal();
  const propertyUserId = reservationModal.propertyUserId;
  const price = reservationModal.price;
  const listingId = reservationModal.listingId;

  const [step, setStep] = useState(STEPS.LOCATION);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      phoneNumber: 1,
      network: ''
    }
  });
  const [conversation, setConversation] = useState<ChatBoxProps>();
  const [listing, setListing] = useState<listingType>();

  const network = watch('network');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: propertyUserId })
      .then((data) => {

        // router.push(`/conversations/${data.data._id}`);
      })
      .finally(() => setIsLoading(false));

  }, [propertyUserId, router]);

  const onSubmit = useCallback(async () => {

    try {
      setIsLoading(true);
      const reserve = await axios.post('/api/reservations', { listingId, totalPrice: price })
      if (reserve) {
        axios.post('/api/conversations', { userId: propertyUserId })
          .then((data) => {
            router.push(`/conversations/${data.data._id}`);
            reservationModal.onClose();
          })
          .finally(() => setIsLoading(false));
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    step,
    reservationModal,
    onNext,
    listing
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Reservation';
    }
    return 'Process Payment';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Reservation fee payment" subtitle="Note: The transaction is irreversable!" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
        {networkTypes.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(network) => setCustomValue('network', network)}
              selected={network === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
      <PhoneInput
        id="phone_number"
        label="Enter phone"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
    </div>
  );


  return (
    <Modal
      isOpen={reservationModal.isOpen}
      title=""
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      disabled={isLoading}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={reservationModal.onClose}
      body={bodyContent}
    />
  );
};

export default ReservationModal;
