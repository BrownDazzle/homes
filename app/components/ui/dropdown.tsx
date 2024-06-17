"use client"

import React, { useState } from 'react';
import Container from '../Container';
import { ChevronDown } from 'lucide-react';
import { cn, formUrlQuery, removeKeysFromQuery } from '@/app/lib/utils';
import { District, Province, Town, provinces } from '@/app/data';
import { useRouter, useSearchParams } from 'next/navigation';

const Dropdown: React.FC = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);
    const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
    const [hoveredTown, setHoveredTown] = useState<Town | null>(null);

    const handleMouseEnter = (province: Province) => {
        setHoveredProvince(province);
    };

    const handleMouseLeave = () => {
        setHoveredProvince(null);
    };

    const handleMouseDistrictEnter = (district: District) => {
        setHoveredDistrict(district);
    };

    const handleMouseDistrictLeave = () => {
        setHoveredDistrict(null);
    };

    const handleMouseTownEnter = (town: Town) => {
        setHoveredTown(town);
    };

    const handleMouseTownLeave = () => {
        setHoveredTown(null);
    };

    const onSelectCompound = (compound: string) => {
        let newUrl = '';

        if (compound) {
            newUrl = formUrlQuery({
                params: params?.toString(),
                key: 'compound',
                value: compound
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: params?.toString(),
                keysToRemove: ['compound']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <Container>
            <div
                className="
                    lg:border-[1px] 
                    w-full 
                    h-full
                    rounded-full 
                    shadow-sm 
                    hover:shadow-md 
                    transition 
                    cursor-pointer
                    overflow-hidden
                "
            >
                <div
                    className="
                        w-full
                        h-full
                        flex 
                        flex-row 
                        items-center 
                        justify-between
                        overflow-x-auto
                        showed-scroll-bar
                    "
                >
                    {provinces.map((province) => (
                        <div
                            key={province.name}
                            className="w-full py-2 hover:bg-gray-200 cursor-pointer border-r-[1px]"
                            onMouseEnter={() => handleMouseEnter(province)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className="
                                    relative 
                                    cursor-pointer
                                    items-center
                                    flex
                                    flex-row
                                    justify-center
                                    gap-2
                                    px-5
                                    transition
                                    z-5
                                "
                            >
                                <span className='flex flex-row w-full text-sm font-semibold'>{province.name}</span>
                                <ChevronDown size={12} />
                            </div>
                            {hoveredProvince === province && (
                                <div className="absolute z-10 bg-white shadow-lg top-35 rounded-md mt-2">
                                    {province.districts.map((district) => (
                                        <div
                                            key={district.name}
                                            className="relative px-4 py-2 hover:bg-gray-200 cursor-pointer "
                                            onMouseEnter={() => handleMouseDistrictEnter(district)}
                                            onMouseLeave={handleMouseDistrictLeave}
                                        >
                                            <span>{district.name}</span>
                                            {hoveredDistrict === district && (
                                                <div className={cn(`overflow-y-scroll absolute ${hoveredProvince && province.name === "N-Western" ? 'right-full' : 'left-full'} top-0 bg-white shadow-lg max-h-[300px] rounded-md showed-scroll-bar`)}>
                                                    {district.compounds.map((town) => (
                                                        <div
                                                            onClick={() => onSelectCompound(town.name)}
                                                            key={town.name}
                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full"
                                                            onMouseEnter={() => handleMouseTownEnter(town)}
                                                            onMouseLeave={handleMouseTownLeave}
                                                        >
                                                            <span>{town.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Dropdown;
