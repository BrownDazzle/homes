// components/Sliders.tsx
"use client"
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';

interface SlidersProps {
    banners: string[];// Array of image URLs
    speed?: number;
    slidesToShow?: number;
    rtl?: boolean;
    dots: boolean
}

const Sliders: React.FC<SlidersProps> = ({ banners, speed, slidesToShow, rtl, dots }) => {
    const settings = {
        dots: dots,
        infinite: true,
        speed: speed,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000, // Adjust the duration as needed
        rtl: rtl // Set RTL (right to left) mode to make the slides move to the right
    };

    return (
        <Slider {...settings}>
            {banners.map((banner, index) => (
                <div className="
                w-full
                h-[150px]
                max-h-[200px]
                overflow-hidden 
                rounded-xl
                relative
              "
                    key={index}
                >
                    <Image
                        src={banner}
                        fill
                        className="object-cover w-full h-full"
                        alt="Image"
                    />
                </div>
            ))}
        </Slider>
    );
};

export default Sliders;
