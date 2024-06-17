'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, {
  CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';
import AddressSelect, { AddressSelectValue } from '../inputs/AddressSelect';
import { District, Province, Town, provinces, provincesNames } from '@/app/data';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<string>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const [filteredProvince, setFilteredProvince] = useState<Province[]>([]);
  const [filteredDistrict, setFilteredDistrict] = useState<District[]>([]);
  const [filteredTown, setFilteredTown] = useState<Town[]>([]);
  const [selectedProvinceValue, setSelectedProvinceValue] = useState<AddressSelectValue | undefined>(undefined);
  const [selectedDistrictValue, setSelectedDistrictValue] = useState<AddressSelectValue | undefined>(undefined);
  const [selectedValue, setSelectedValue] = useState<AddressSelectValue | undefined>(undefined);

  const filterProvince = (filtertext: string) => {
    const province = provinces?.filter(
      (item: any) => {
        return filtertext === item.name
      }
    );
    province && setFilteredProvince(province);
    province && setFilteredDistrict(province[0]?.districts)
  };

  const filterDistrict = (filtertext: string) => {
    const district = filteredDistrict?.filter(
      (item: any) => {
        return filtertext === item.name
      }
    );
    district && setFilteredTown(district[0].compounds);
  };

  const handleProvinceChange = (value: AddressSelectValue) => {
    setSelectedProvinceValue(value);
    filterProvince(value.label)
  };

  const handleDistrictChange = (value: AddressSelectValue) => {
    setSelectedDistrictValue(value);
    filterDistrict(value.label)
  };

  const handleChange = (value: AddressSelectValue) => {
    setSelectedValue(value);
    setLocation(value.label)
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
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  },
    [
      step,
      searchModal,
      location,
      router,
      guestCount,
      roomCount,
      dateRange,
      onNext,
      bathroomCount,
      params
    ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <AddressSelect
        value={selectedProvinceValue}
        placeholder="Province"
        data={provincesNames}
        onChange={handleProvinceChange}
      />
      {selectedProvinceValue && selectedProvinceValue.label === filteredProvince[0]?.name && (
        <AddressSelect
          value={selectedDistrictValue}
          placeholder="District"
          data={filteredProvince[0].districts}
          onChange={handleDistrictChange}
        />
      )}
      {selectedDistrictValue && selectedDistrictValue.label === filteredDistrict[0]?.name && (
        <AddressSelect
          value={selectedValue}
          placeholder="Township"
          data={filteredTown}
          onChange={handleChange}
        />
      )}
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;
