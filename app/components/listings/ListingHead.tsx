'use client';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

const est_1 = "/images/est_1.jpg"
const est_2 = "/images/est_2.jpg"
const est_3 = "/images/est_3.jpg"
const est_4 = "/images/est_4.jpg"
const est_5 = "/images/est_5.jpg"

export const images = [
  est_1, est_2, est_3, est_4, est_5
]

interface ListingHeadProps {
  title: string | undefined;
  district: string | undefined;
  compound: string | undefined;
  imageSrc: string[] | undefined;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  district,
  compound,
  imageSrc,
  id,
  currentUser
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the duration as needed
  };

  return (
    <>
      <Heading
        title={title as string}
        subtitle={`${district}, ${compound}`}
      />
      <Slider {...settings}>
        {imageSrc?.map((banner, index) => (
          <div className="
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
              <HeartButton
                listingId={id}
                currentUser={currentUser}
              />
            </div>

          </div>
        ))}
      </Slider>
    </>
  );
}

export default ListingHead;