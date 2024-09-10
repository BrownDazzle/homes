'use client';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import dynamic from 'next/dynamic';

interface ListingHeadProps {
  title: string | undefined;
  district: string | undefined;
  compound: string | undefined;
  imageSrc: string[] | undefined;
  id: string;
  currentUser?: SafeUser | null,
  locationValue: string;
}

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  district,
  compound,
  imageSrc,
  id,
  currentUser,
  locationValue
}) => {
  const settings = {
    dots: true,
    infinite: imageSrc && imageSrc?.length > 1,
    speed: 5000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 36000, // Adjust the duration as needed
  };
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <>
      <Heading
        title={title as string}
        subtitle={`${district}, ${compound}`}
      />
      <Map center={coordinates} />
      <Heading
        title="Photos"
        subtitle=''
      />
      <Slider {...settings}>
        {imageSrc?.map((banner, index) => (
          <div className="
          w-full
          h-[200px]
          overflow-hidden 
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
          </div>
        ))}
      </Slider>
    </>
  );
}

export default ListingHead;