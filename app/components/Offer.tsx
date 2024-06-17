'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from "next/image";
import { useRef } from "react";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from './Heading';
import HeartButton from './HeartButton';

const est_1 = "/images/est_1.jpg";
const est_2 = "/images/est_2.jpg";
const est_3 = "/images/est_3.jpg";
const est_4 = "/images/est_4.jpg";
const est_5 = "/images/est_5.jpg";

export const images = [
  est_1, est_2, est_3, est_4, est_5
];

interface OfferListProps {
  title: string | undefined;
  district: string | undefined;
  compound: string | undefined;
  imageSrc: string[] | undefined;
  id: string;
  currentUser?: SafeUser | null;
}

const OfferList = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000, // Adjust the duration as needed
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <>
      <Heading
        title="Offers"
        subtitle="Promotions, deals, and special offers for you"
      />
      <Slider ref={sliderRef} {...settings}>
        {images.map((banner, index) => (
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
              src={banner}
              fill
              className="object-cover w-full"
              alt="Image"
            />
            <div
              className="
                  absolute
                  top-5
                  right-5
                "
            >
              <Heading
                title="Cozy Flats"
                subtitle="Beautiful place to spend a weekend"
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
                title="Cozy Flats"
                subtitle="Beautiful place to spend a weekend"
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
          "
            >
              <button onClick={handlePrevious}>Previous</button>
            </div>
            <div
              className="
              bg-white
              rounded-full
              p-2
            absolute
            bottom-[50%]
            right-5
          "
            >
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        ))}
      </Slider>


    </>
  );
}

export default OfferList;
