"use client";
import { FC, useState } from 'react';
import { FaSwimmingPool, FaDumbbell, FaWifi, FaParking, FaSnowflake, FaDog, FaShieldAlt, FaTshirt, FaSpa, FaTableTennis } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface AmenitiesProps {
    amenities: string[];
}

const amenitiesIcons: { [key: string]: JSX.Element } = {
    'Swimming Pool': <FaSwimmingPool />,
    'Gym': <FaDumbbell />,
    'WiFi': <FaWifi />,
    'Parking': <FaParking />,
    'Air Conditioning': <FaSnowflake />,
    'Pet Friendly': <FaDog />,
    '24/7 Security': <FaShieldAlt />,
    'Laundry Service': <FaTshirt />,
    'Spa': <FaSpa />,
    'Tennis Court': <FaTableTennis />,
};

const Amenities: FC<AmenitiesProps> = ({ amenities }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => setShowAll(!showAll);

    const displayedAmenities = showAll ? amenities : amenities.slice(0, 6);

    return (
        <>
            <div className="flex flex-col items-center space-y-4 bg-white translate">
                <ul className="grid grid-cols-2 gap-4 w-full">
                    {displayedAmenities.map((amenity, index) => (
                        <li key={index} className="flex items-center text-gray-700 space-x-2">
                            {amenitiesIcons[amenity]}
                            <span>{amenity}</span>
                        </li>
                    ))}
                </ul>

            </div>
            {amenities.length > 6 ? (
                <button
                    onClick={toggleShowAll}
                    className=" mt-1 text-slate-600 hover:text-slate-800 transition font-semibold "
                >
                    {showAll ? (<p className='flex flex-row items-center gap-2 border-b-[3px] border-red-600 '>Show Less <IoIosArrowUp size={24} /></p>) : (<p className='flex flex-row items-center gap-2 border-b-[3px] border-red-600 '>Show More <IoIosArrowDown size={24} /></p>)}
                </button>) : null}
        </>
    );
};

export default Amenities;
