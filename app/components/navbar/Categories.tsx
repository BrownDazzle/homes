'use client';

import React, { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TbBeach, TbBrandBooking, TbBuildingCommunity, TbContainer, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiAppleMaggot,
  GiBarn,
  GiBaseDome,
  GiBoatFishing,
  GiBuoy,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiCow,
  GiCrackedAlienSkull,
  GiCultist,
  GiFactory,
  GiFamilyHouse,
  GiFarmTractor,
  GiFarmer,
  GiFlake,
  GiForest,
  GiForestCamp,
  GiGrapes,
  GiHorseHead,
  GiHorseshoe,
  GiHunterEyes,
  GiIgloo,
  GiIsland,
  GiMountainCave,
  GiPlantWatering,
  GiShipWheel,
  GiSmallFire,
  GiTombstone,
  GiTreehouse,
  GiUndergroundCave,
  GiWheat,
  GiWindmill,
  GiWoodCabin
} from 'react-icons/gi';
import { FaBabyCarriage, FaBed, FaBuilding, FaHotel, FaIndustry, FaSkiing, FaWarehouse } from 'react-icons/fa';
import { BsBuildingsFill, BsMenuDown, BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdBungalow, MdCottage, MdHouseboat, MdOutlineVilla, MdStadium } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import PropertyAreas from './PropertyAreas';
import { GiBeachBall } from 'react-icons/gi';
import {
  FaChurch,
  FaMosque,
  FaSynagogue,
  FaDumbbell,
  FaCar,
  FaLandmark,
  FaCity,
  FaShoppingBag,
  FaHandHoldingUsd,
  FaUniversity,
  FaHospitalAlt,
  FaHome,
  FaTree,
  FaMountain,
  FaWater,
  FaRoad,
  FaStore,
  FaHospital,
  FaSchool,
  FaPlaceOfWorship,
} from 'react-icons/fa';
import { FcDam } from 'react-icons/fc';
import { AiOutlineMenu } from 'react-icons/ai';
import { formUrlQuery, removeKeysFromQuery } from '@/app/lib/utils';
import LocationDropdown from "../ui/location-dropdown";

export const categories = [
  {
    label: 'Single-Family',
    icon: FaHome,
    description: 'This property is a single-family home.',
  },
  {
    label: 'Condominium (Condo)',
    icon: FaBuilding,
    description: 'This property is a condominium (condo).',
  },
  {
    label: 'Townhouse',
    icon: FaBuilding,
    description: 'This property is a townhouse.',
  },
  {
    label: 'Apartment',
    icon: FaBuilding,
    description: 'This property is an apartment.',
  },
  {
    label: 'Duplex',
    icon: FaBuilding,
    description: 'This property is a duplex.',
  },
  {
    label: 'Triplex',
    icon: FaBuilding,
    description: 'This property is a triplex.',
  },
  {
    label: 'Quadruplex',
    icon: FaBuilding,
    description: 'This property is a quadruplex.',
  },
  {
    label: 'Multi-Family',
    icon: FaBuilding,
    description: 'This property is a multi-family home.',
  },
  {
    label: 'Villa',
    icon: MdOutlineVilla,
    description: 'This property is a villa.',
  },
  {
    label: 'Bungalow',
    icon: MdBungalow,
    description: 'This property is a bungalow.',
  },
  {
    label: 'Mansion',
    icon: GiCastle,
    description: 'This property is a mansion.',
  },
  {
    label: 'Cottage',
    icon: MdCottage,
    description: 'This property is a cottage.',
  },
  {
    label: 'Penthouse',
    icon: FaBed,
    description: 'This property is a penthouse.',
  },
  {
    label: 'Studio Apartment',
    icon: FaBed,
    description: 'This property is a studio apartment.',
  },
  {
    label: 'Loft',
    icon: FaBed,
    description: 'This property is a loft.',
  },
  {
    label: 'Mobile',
    icon: FaWarehouse,
    description: 'This property is a mobile home.',
  },
  {
    label: 'Farmhouse',
    icon: GiFarmer,
    description: 'This property is a farmhouse.',
  },
  {
    label: 'Log Cabin',
    icon: GiWoodCabin,
    description: 'This property is a log cabin.',
  },
  {
    label: 'Castle',
    icon: GiCastle,
    description: 'This property is a castle.',
  },
  {
    label: 'Chalet',
    icon: FaMountain,
    description: 'This property is a chalet.',
  },
  {
    label: 'Estate',
    icon: GiTombstone,
    description: 'This property is an estate.',
  },
  {
    label: 'Beach',
    icon: GiBeachBall,
    description: 'This property is a beach house.',
  },
  {
    label: 'Lake',
    icon: FcDam,
    description: 'This property is a lake house.',
  },
  {
    label: 'Mountain Cabin',
    icon: GiMountainCave,
    description: 'This property is a mountain cabin.',
  },
  {
    label: 'Semi-Detached',
    icon: FaBuilding,
    description: 'This property is a semi-detached house.',
  },
  {
    label: 'Detached',
    icon: FaBuilding,
    description: 'This property is a detached house.',
  },
  {
    label: 'Tiny',
    icon: GiSmallFire,
    description: 'This property is a tiny house.',
  },
  {
    label: 'Earthship',
    icon: GiShipWheel,
    description: 'This property is an earthship.',
  },
  {
    label: 'Floating',
    icon: MdHouseboat,
    description: 'This property is a floating home.',
  },
  {
    label: 'Igloo',
    icon: GiIgloo,
    description: 'This property is an igloo.',
  },
  {
    label: 'Treehouse',
    icon: GiTreehouse,
    description: 'This property is a treehouse.',
  },
  {
    label: 'Houseboat',
    icon: MdHouseboat,
    description: 'This property is a houseboat.',
  },
  {
    label: 'Carriage',
    icon: FaBabyCarriage,
    description: 'This property is a carriage house.',
  },
  {
    label: 'Dome',
    icon: GiBaseDome,
    description: 'This property is a dome home.',
  },
  {
    label: 'Geodesic Dome',
    icon: GiBaseDome,
    description: 'This property is a geodesic dome.',
  },
  {
    label: 'Prefabricated',
    icon: GiFactory,
    description: 'This property is a prefabricated home.',
  },
  {
    label: 'Container',
    icon: TbContainer,
    description: 'This property is a container home.',
  },
  {
    label: 'Underground',
    icon: GiUndergroundCave,
    description: 'This property is an underground home.',
  },
  {
    label: 'A-Frame',
    icon: GiWoodCabin,
    description: 'This property is an A-frame house.',
  },
  {
    label: 'Farm',
    icon: GiFarmTractor,
    description: 'This property is a farm.',
  },
  {
    label: 'Ranchette',
    icon: GiCow,
    description: 'This property is a ranchette.',
  },
  {
    label: 'Plantation',
    icon: GiPlantWatering,
    description: 'This property is a plantation.',
  },
  {
    label: 'Vineyard',
    icon: GiGrapes,
    description: 'This property is a vineyard.',
  },
  {
    label: 'Orchard',
    icon: GiAppleMaggot,
    description: 'This property is an orchard.',
  },
  {
    label: 'Ranch',
    icon: GiCow,
    description: 'This property is a ranch.',
  },
  {
    label: 'Horse Property',
    icon: GiHorseHead,
    description: 'This property is a horse property.',
  },
  {
    label: 'Equestrian Estate',
    icon: GiHorseshoe,
    description: 'This property is an equestrian estate.',
  },
  {
    label: 'Agricultural Land',
    icon: GiCultist,
    description: 'This property is agricultural land.',
  },
  {
    label: 'Timberland',
    icon: GiForest,
    description: 'This property is timberland.',
  },
  {
    label: 'Hunting Land',
    icon: GiHunterEyes,
    description: 'This property is hunting land.',
  },
  {
    label: 'Waterfront Property',
    icon: GiBuoy,
    description: 'This property is waterfront property.',
  },
  {
    label: 'Beachfront Property',
    icon: GiBeachBall,
    description: 'This property is beachfront property.',
  },
  {
    label: 'Lakefront Property',
    icon: GiFlake,
    description: 'This property is lakefront property.',
  },
  {
    label: 'Riverfront Property',
    icon: GiCrackedAlienSkull,
    description: 'This property is riverfront property.',
  },
  {
    label: 'Island Property',
    icon: GiIsland,
    description: 'This property is island property.',
  },
  {
    label: 'Urban Property',
    icon: FaCity,
    description: 'This property is urban property.',
  },
  {
    label: 'Suburban Property',
    icon: FaCity,
    description: 'This property is suburban property.',
  },
  {
    label: 'Rural Property',
    icon: GiWheat,
    description: 'This property is rural property.',
  },
  {
    label: 'Commercial Property',
    icon: FaWarehouse,
    description: 'This property is commercial property.',
  },
  {
    label: 'Office Building',
    icon: FaBuilding,
    description: 'This property is an office building.',
  },
  {
    label: 'Retail Space',
    icon: FaShoppingBag,
    description: 'This property is retail space.',
  },
  {
    label: 'Warehouse',
    icon: FaWarehouse,
    description: 'This property is a warehouse.',
  },
  {
    label: 'Industrial Property',
    icon: FaIndustry,
    description: 'This property is industrial property.',
  },
  {
    label: 'Mixed-Use Property',
    icon: FaHandHoldingUsd,
    description: 'This property is mixed-use property.',
  },
  {
    label: 'Hotel',
    icon: FaHotel,
    description: 'This property is a hotel.',
  },
  {
    label: 'Resort',
    icon: FaHotel,
    description: 'This property is a resort.',
  },
  {
    label: 'Motel',
    icon: FaHotel,
    description: 'This property is a motel.',
  },
  {
    label: 'Bed and Breakfast (B&B)',
    icon: FaBed,
    description: 'This property is a bed and breakfast (B&B).',
  },
  {
    label: 'Vacation Rental',
    icon: FaBed,
    description: 'This property is a vacation rental.',
  },
  {
    label: 'Student Housing',
    icon: FaUniversity,
    description: 'This property is student housing.',
  },
  {
    label: 'Senior Housing',
    icon: FaBuilding,
    description: 'This property is senior housing.',
  },
  {
    label: 'Nursing',
    icon: FaHospitalAlt,
    description: 'This property is a nursing home.',
  },
  {
    label: 'Hospital',
    icon: FaHospital,
    description: 'This property is a hospital.',
  },
  {
    label: 'School',
    icon: FaSchool,
    description: 'This property is a school building.',
  },
  {
    label: 'Church',
    icon: FaChurch,
    description: 'This property is a church.',
  },
  {
    label: 'Temple',
    icon: FaPlaceOfWorship,
    description: 'This property is a temple.',
  },
  {
    label: 'Mosque',
    icon: FaMosque,
    description: 'This property is a mosque.',
  },
  {
    label: 'Synagogue',
    icon: FaSynagogue,
    description: 'This property is a synagogue.',
  },
  {
    label: 'Community',
    icon: TbBuildingCommunity,
    description: 'This property is a community center.',
  },
  {
    label: 'Gym',
    icon: FaDumbbell,
    description: 'This property is a gym.',
  },
  {
    label: 'Stadium',
    icon: MdStadium,
    description: 'This property is a stadium.',
  },
  {
    label: 'Arena',
    icon: MdStadium,
    description: 'This property is an arena.',
  },
  {
    label: 'Parking/Garage',
    icon: FaCar,
    description: 'This property is a parking lot/garage.',
  },
  {
    label: 'Land (Vacant)',
    icon: FaLandmark,
    description: 'This property is vacant land.',
  },
  {
    label: 'Residential',
    icon: FaLandmark,
    description: 'This property is a residential lot.',
  },
  {
    label: 'Commercial',
    icon: FaLandmark,
    description: 'This property is a commercial lot.',
  },
  {
    label: 'Industrial',
    icon: FaLandmark,
    description: 'This property is an industrial lot.',
  },
  {
    label: 'Farmland',
    icon: GiFarmTractor,
    description: 'This property is farmland.',
  },
  {
    label: 'Wooded',
    icon: FaTree,
    description: 'This property is a wooded lot.',
  },
  {
    label: 'Coastal',
    icon: FaWater,
    description: 'This property is coastal land.',
  },
];

export const listingTypes = [
  {
    label: 'Booking',
    icon: MdStadium,
    description: 'This property is listed for bookings!',
  },
  {
    label: 'Rental',
    icon: FaLandmark,
    description: 'This property is listed for renting!',
  },
  {
    label: 'Sale',
    icon: FaBuilding,
    description: 'This property is listed for sale!'
  },
]


export const provinceTypes = [
  {
    label: 'Lusaka',
    icon: AiOutlineMenu,
    description: 'This property is listed for bookings!',
  },
  {
    label: 'Copperbelt',
    icon: AiOutlineMenu,
    description: 'This property is listed for renting!',
  },
  {
    label: 'Western',
    icon: AiOutlineMenu,
    description: 'This property is listed for sale!'
  },
  {
    label: 'Eastern',
    icon: AiOutlineMenu,
    description: 'This property is listed for bookings!',
  },
  {
    label: 'Southern',
    icon: AiOutlineMenu,
    description: 'This property is listed for renting!',
  },
  {
    label: 'Northern',
    icon: AiOutlineMenu,
    description: 'This property is listed for sale!'
  },
  {
    label: 'Luapula',
    icon: AiOutlineMenu,
    description: 'This property is listed for sale!'
  },
  {
    label: 'Muchinga',
    icon: AiOutlineMenu,
    description: 'This property is listed for bookings!',
  },
  {
    label: 'North-Western',
    icon: AiOutlineMenu,
    description: 'This property is listed for renting!',
  },
  {
    label: 'Central',
    icon: AiOutlineMenu,
    description: 'This property is listed for sale!'
  },
]
import { Location, provinces, districts, towns } from '../../data';
import MenuItem from "./MenuItem";
import Dropdown from "../ui/dropdown";

const Categories = () => {
  const params = useSearchParams();
  const router = useRouter();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const [selectedProvince, setSelectedProvince] = useState<Location | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<Location | null>(null);
  const [selectedTown, setSelectedTown] = useState<Location | null>(null);

  const handleProvinceSelect = (province: Location) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedTown(null);
  };

  const handleDistrictSelect = (district: Location) => {
    setSelectedDistrict(district);
    setSelectedTown(null);
  };

  const handleTownSelect = (town: Location) => {
    setSelectedTown(town);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if (category) {
      newUrl = formUrlQuery({
        params: params?.toString(),
        key: 'category',
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: params?.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
  }

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div

        className="
lg:border-[1px] 
w-full 
h-full
md:w-auto 
rounded-full 
shadow-sm 
hover:shadow-md 
transition 
cursor-pointer
"
      >
        <div
          className="
flex 
flex-row 
items-center 
justify-between
overflow-x-auto
showed-scroll-bar
"
        >
          <Dropdown />
          {/*{provinceTypes.map((item) => (
            <div
              onClick={toggleOpen}
              className="
   
   px-6 
   pt-2
   border-x-[1px]
   items-center
   w-auto
   flex-1 
   flex
   flex-row
   gap-2
   text-center
   hover:bg-neutral-100 
transition
 "
            >
              <p className='flex flex-row w-full text-sm font-semibold'>{item.label}</p>
              <item.icon size={12} />
            </div>
          ))}
        </div>
        {/*<div>
          <h1>Zambia Location Dropdown</h1>
          <LocationDropdown label="Province" options={provinces} onSelect={handleProvinceSelect} />
          {selectedProvince && (
            <LocationDropdown label="District" options={districts} onSelect={handleDistrictSelect} />
          )}
          {selectedDistrict && (
            <LocationDropdown label="Town" options={towns} onSelect={handleTownSelect} />
          )}
          <div>
            <h2>Selected Locations:</h2>
            <p>Province: {selectedProvince?.name || '-'}</p>
            <p>District: {selectedDistrict?.name || '-'}</p>
            <p>Town: {selectedTown?.name || '-'}</p>
          </div>
        </div>*/}
          {isOpen && (
            <div
              className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
          w-auto
            bg-white 
            overflow-hidden 
            top-12 
            text-sm
          "
            >
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Categories;