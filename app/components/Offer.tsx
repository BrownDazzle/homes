'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from "next/image";
import { useRef } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from './Heading';
import HeartButton from './HeartButton';
import Countdown from './ui/countdown';
import { IListing } from '../lib/database/models/listing.model';
import Badge from './ui/badge';
import { CiBadgeDollar } from 'react-icons/ci';

interface OfferListProps {
  data: IListing[]
}

const OfferList = ({ data }: OfferListProps) => {
  const params = useSearchParams();
  const router = useRouter();
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: data.length > 1,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 60000, // Adjust the duration as needed
    adaptiveHeight: true,
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  if (data.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    router.push(`/listings/${id}`)
  }

  return (
    <>
      <Heading
        title="Offers"
        subtitle="Promotions, deals, and special offers for you"
      />
      <Slider ref={sliderRef} {...settings}>
        {data.map((banner, index) => (
          <div
            className="
                w-full
                h-[60vh]
                overflow-hidden 
                rounded-xl
                relative
              "
            key={index}
          >
            <Image
              src={banner.imageSrc[0]}
              fill
              className="object-cover w-full cursor-pointer"
              alt="Image"
              onClick={() => handleClick(banner._id)}
            />
            <div
              className="
                  absolute
                  top-5
                  left-5
                "
            >
              <Countdown targetDate={banner.premiumTargetDate.toISOString()} />
            </div>
            {banner.isPremium && (
              <div className="absolute top-2 left-2">
                <Badge icon={CiBadgeDollar} />
              </div>
            )}
            <div
              className="
                  hidden
                  md:block
                  absolute
                  lg:top-5
                  bottom-5
                  right-5
                "
            >
              <Heading
                title={banner.compound as string}
                subtitle={`${banner.district}, ${banner.province}`}
              />
            </div>
            <div
              className="
                  absolute
                  bottom-5
                  left-5
                "
            >
              <Heading
                title={banner.title as string}
                subtitle={banner.description}
              />
            </div>
            <div
              className="
              bg-white
              rounded-full
              p-2
              absolute
              bottom-[50%]
              left-5
              cursor-pointer
              "
            >
              <HiChevronLeft onClick={handlePrevious} />
            </div>
            <div
              className="
              bg-white
              rounded-full
              p-2
              absolute
              bottom-[50%]
              right-5
              cursor-pointer
              "
            >
              <HiChevronRight onClick={handleNext} />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default OfferList;
