'use client';

import { useState } from 'react';
import { FaHouseUser, FaTree, FaCity, FaLeaf } from "react-icons/fa"; // Example icons
import AmenitiesSelect from './inputs/AmenitiesSelect';
import estateAmenities from '../data';
import { IconType } from "react-icons";

const iconMap: { [key: string]: IconType } = {
    "Indoor Amenities": FaHouseUser,
    "Outdoor Amenities": FaTree,
    "Community Amenities": FaCity,
    "Eco-Friendly Amenities": FaLeaf
};

const AmenitiesList: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Estate Amenities</h1>
            <div className="grid grid-cols-4 gap-4">
                {estateAmenities.map((category: any) => (
                    <AmenitiesSelect
                        key={category.category}
                        icon={iconMap[category.category]}
                        label={category.category}
                        selected={selectedCategory === category.category}
                        onClick={handleCategoryClick}
                    />
                ))}
            </div>
            {selectedCategory && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">{selectedCategory}</h2>
                    <ul className="list-disc list-inside">
                        {estateAmenities
                            .find((category: any) => category.category === selectedCategory)
                            ?.amenities.map((amenity: any) => (
                                <li key={amenity.name} className="mt-2">
                                    <strong>{amenity.name}:</strong> {amenity.features.join(', ')}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AmenitiesList;
