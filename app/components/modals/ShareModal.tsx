'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter } from "next-nprogress-bar";

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
import { CreateUserParams, SafeListing, SafeUser } from '@/app/types';
import axios from 'axios';
import socket from '../../lib/socket.io';
import getListingById from '@/app/actions/getListingById';
import { IParams } from '@/app/listings/[listingId]/page';
import { IListing } from '@/app/lib/database/models/listing.model';
import { IConversation } from '@/app/lib/database/models/conversation.model';
import { IUser } from '@/app/lib/database/models/user.model';
import ChatHome from '../chat/chat';
import ChatId from '../chat/chatId/chat-id';
import PaymentForm from '../ui/paymentForm';
import PaymentButton from '../ui/paymentBotton';
import { registerIPN } from '@/app/lib/payment.server';
import { createMtnApiUser } from '@/app/lib/mtn.apis';
import Image from 'next/image';
import PaymentPage from '../ui/paymentForm';
import PaymentSuccess from '../ui/paymentSuccess';
import Link from 'next/link';
import ModalShare from './ModalShare';
import useShareModal from '@/app/hooks/useShareModal';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import ShareLinks from '../ui/share';

enum STEPS {
    INFO = 0,
    SUCCESS = 1,
}

export interface listingType {
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

const ShareModal = () => {
    const { data: session } = useSession();
    const user = session?.user
    const currentPath = usePathname();
    const router = useRouter();
    const shareModal = useShareModal();
    const shareListing = shareModal.data;

    const [step, setStep] = useState(STEPS.INFO);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<CountrySelectValue>();

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            message: '',
        }
    });

    const url = 'https://yourpropertylisting.com/property/12345';
    const title = 'Check out this amazing property!';

    const [Share, setShare] = useState<string>('');

    const message = watch('message');

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


    const onSubmit = useCallback(async () => {

        try {

            if (step === STEPS.INFO) {
                setIsLoading(true);

                const response = await axios.post('/api/Share', {
                    message,
                    urlPath: currentPath,
                    userId: user?._id
                });
                console.log("SUG_EST", response.data)

                response && toast('Payment initiated successfully.');

                router.refresh();
                reset();
                response.data && setStep(STEPS.SUCCESS)
                setIsLoading(false);
            };

            if (step === STEPS.SUCCESS) {
                setIsLoading(true);

                router.push(`/`);
                setIsLoading(false);
                router.refresh();
                reset();
                setStep(STEPS.INFO)
                shareModal.onClose();
            };
            //router.push(`/payment-status?transactionId=${resMtn.transactionId}`);
        } catch (error) {
            console.error(error);
        }
    }, [
        message,
        router
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Submit';
        }
        return 'Thank you for your Share.!!';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className='py-10'>
            <p className='font-bold text-2xl text-slate-800 ml-3'>Share this property with friends</p>
            <div className='flex items-center gap-4 px-3 py-5'>
                <Image src="/images/est_4.jpg" alt='' width={100} height={100} className='rounded-md' />
                <h3>{shareListing?.property_type}Apartment</h3>
                <h5>{shareListing?.roomCount} Rooms</h5>
            </div>
            <hr />
            <ShareLinks url={url} title={title} listingId='' currentUser={user as SafeUser} data={shareListing as SafeListing} />
        </div>
    );

    let footerContent = (
        <div></div>
    )

    return (
        <ModalShare
            isOpen={shareModal.isOpen}
            title=""
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isLoading}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={undefined}
            onClose={shareModal.onClose}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default ShareModal;
