import { FaBuilding, FaLandmark } from "react-icons/fa";
import { MdStadium } from "react-icons/md";

export interface Location {
    id?: string;
    name: string;
    subLocations?: Location[];
}

// Define the data structure for the provinces, districts, and towns
export interface Town {
    name: string;
}

export interface District {
    name: string;
    compounds: Town[];
}

export interface Province {
    name: string;
    districts: District[];
};

export interface PropertyType {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export const AMENITIES_LIST = [
    'WiFi',
    'Air Conditioning',
    'Swimming Pool',
    'Gym',
    'Parking',
    'Pet Friendly',
    'Washer/Dryer',
];


export const propertyTypes: PropertyType[] = [
    {
        id: 'house',
        title: 'House',
        description: 'Beautiful houses in various locations.',
        imageUrl: '/images/est_3.jpg',
    },
    {
        id: 'farm',
        title: 'Farm',
        description: 'Spacious farms with modern facilities.',
        imageUrl: '/images/est_5.jpg',
    },
    {
        id: 'apartment',
        title: 'Apartment',
        description: 'Modern apartments in urban areas.',
        imageUrl: '/images/est_1.jpg',
    },
    // Add more property types as needed
];


export const networkTypes = [
    {
        label: 'MTN MoMo',
        icon: MdStadium,
        description: 'This property is listed for bookings!',
    },
    {
        label: 'Airtel ZM',
        icon: FaLandmark,
        description: 'This property is listed for renting!',
    },
    {
        label: 'Zamtel',
        icon: FaBuilding,
        description: 'This property is listed for sale!'
    },
]

export const categoryTypes = [
    /*{
        label: 'Booking',
        icon: MdStadium,
        description: 'This property is listed for bookings!',
    },*/
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

export const amenities = [
    'Swimming Pool',
    'Gym',
    'WiFi',
    'Parking',
    'Air Conditioning',
    'Pet Friendly',
    '24/7 Security',
    'Laundry Service',
    'Spa',
    'Tennis Court',
];

const estateAmenities = [
    {
        category: "Indoor",
        amenities: [
            {
                name: "Gourmet Kitchen",
                features: [
                    "High-end appliances",
                    "Granite or marble countertops",
                    "Custom cabinetry",
                    "Butler’s pantry",
                    "Wine cooler"
                ]
            },
            {
                name: "Bathrooms",
                features: [
                    "Spa-like master bathroom",
                    "Steam shower",
                    "Jacuzzi tub",
                    "Heated floors",
                    "Dual vanities"
                ]
            },
            {
                name: "Living Spaces",
                features: [
                    "Open floor plan",
                    "High ceilings",
                    "Custom lighting fixtures",
                    "Home automation systems",
                    "Smart home technology"
                ]
            },
            {
                name: "Entertainment",
                features: [
                    "Home theater or media room",
                    "Game room",
                    "Wine cellar",
                    "Bar and lounge area"
                ]
            },
            {
                name: "Fitness and Wellness",
                features: [
                    "Home gym",
                    "Sauna",
                    "Indoor swimming pool",
                    "Massage room"
                ]
            },
            {
                name: "Office and Study",
                features: [
                    "Library",
                    "Home office with high-speed internet"
                ]
            },
            {
                name: "Laundry",
                features: [
                    "Laundry room with high-end washers and dryers",
                    "Laundry chute"
                ]
            },
            {
                name: "Bedrooms",
                features: [
                    "Walk-in closets",
                    "En-suite bathrooms",
                    "Balconies"
                ]
            },
            {
                name: "Other Indoor Features",
                features: [
                    "Elevator",
                    "Fireplace",
                    "Hardwood floors",
                    "Crown molding"
                ]
            }
        ]
    },
    {
        category: "Outdoor",
        amenities: [
            {
                name: "Swimming Pool",
                features: [
                    "Infinity pool",
                    "Heated pool",
                    "Pool house"
                ]
            },
            {
                name: "Outdoor Living Spaces",
                features: [
                    "Outdoor kitchen and barbecue area",
                    "Fire pit",
                    "Outdoor fireplace",
                    "Covered patios and pergolas"
                ]
            },
            {
                name: "Recreation",
                features: [
                    "Tennis court",
                    "Basketball court",
                    "Putting green",
                    "Playground"
                ]
            },
            {
                name: "Gardens and Landscaping",
                features: [
                    "Professionally landscaped gardens",
                    "Water features",
                    "Walking paths",
                    "Gazebo"
                ]
            },
            {
                name: "Parking",
                features: [
                    "Attached garage",
                    "Detached garage",
                    "Carport",
                    "Circular driveway",
                    "Motor court"
                ]
            },
            {
                name: "Security",
                features: [
                    "Gated entry",
                    "Security system with cameras",
                    "Guardhouse"
                ]
            },
            {
                name: "Other Outdoor Features",
                features: [
                    "Guest house or separate living quarters",
                    "Greenhouse",
                    "Boat dock",
                    "Horse facilities"
                ]
            }
        ]
    },
    {
        category: "Community",
        amenities: [
            {
                name: "Clubhouse",
                features: [
                    "Meeting rooms",
                    "Dining facilities",
                    "Banquet hall"
                ]
            },
            {
                name: "Sports and Fitness",
                features: [
                    "Fitness center",
                    "Golf course",
                    "Swimming pools",
                    "Sports courts"
                ]
            },
            {
                name: "Social and Recreation",
                features: [
                    "Community events and activities",
                    "Playground and parks",
                    "Walking and biking trails"
                ]
            },
            {
                name: "Services",
                features: [
                    "Concierge services",
                    "24-hour security",
                    "Maintenance services"
                ]
            }
        ]
    },
    {
        category: "Eco-Friendly",
        amenities: [
            {
                name: "Energy Efficiency",
                features: [
                    "Solar panels",
                    "Energy-efficient appliances",
                    "Geothermal heating and cooling"
                ]
            },
            {
                name: "Water Conservation",
                features: [
                    "Rainwater harvesting",
                    "Greywater recycling",
                    "Low-flow fixtures"
                ]
            },
            {
                name: "Sustainable Materials",
                features: [
                    "Reclaimed wood",
                    "Eco-friendly building materials"
                ]
            }
        ]
    }
];

export default estateAmenities;


export const provinces: Province[] = [
    {
        name: 'Lusaka',
        districts: [
            {
                name: 'Lusaka District',
                compounds: [
                    { name: 'Chazanga' },
                    { name: 'Kabanana' },
                    { name: 'Chaisa' },
                    { name: 'Chawama' },
                    { name: 'Chelstone' }, // Duplicate of Chelston, only one needed
                    { name: 'Chibolya' },
                    { name: 'Chilenje' },
                    { name: 'Chilulu' },
                    { name: 'Chingwere' },
                    { name: 'Chunga' },
                    { name: 'Garden' }, // Duplicate of Garden Compound, only one needed
                    { name: 'George' }, // Duplicate of George Compound, only one needed
                    { name: 'Helen Kaunda' },
                    { name: 'Jack' }, // Duplicate of Jack Compound, only one needed
                    { name: 'John Howard' },
                    { name: 'John Laing' },
                    { name: 'Kabwata' },
                    { name: 'Kalikiliki' },
                    { name: 'Kalingalinga' },
                    { name: 'Kalundu' },
                    { name: 'Kamanga' },
                    { name: 'Kamwala' },
                    { name: 'Kanyama' },
                    { name: 'Kaunda Square' },
                    { name: 'Lilanda' },
                    { name: 'Linda' }, // Duplicate of Linda Compound, only one needed
                    { name: 'Makeni' },
                    { name: 'Marapodi' },
                    { name: 'Matero' },
                    { name: 'Misisi' },
                    { name: 'Mandevu' },
                    { name: 'Mtendere' },
                    { name: 'Mutendere' },
                    { name: 'Ng’ombe' },
                    { name: 'Northmead' },
                    { name: 'Olympia' },
                    { name: 'PHI (Presidential Housing Initiative)' },
                    { name: 'Rhodes Park' },
                    { name: 'Ridgeway' },
                    { name: 'Roma' },
                    { name: 'Salama Park' },
                    { name: 'Shantumbu' },
                    { name: 'Sikanze' },
                    { name: 'Town Centre (Central Business District)' },
                    { name: 'Zingalume' },
                ],
            },
            {
                name: 'Chongwe District',
                compounds: [
                    { name: 'Chongwe' },
                    { name: 'Chirundu' },
                    { name: 'Kambwena' },
                    { name: 'Kaseba' },
                    { name: 'Kasenga' },
                    { name: 'Chinyunyu' },
                    { name: 'Kanakantapa' },
                    { name: 'Kanakatapa' },
                    { name: 'Mpanshya' },
                    { name: 'Bunda Bunda' },
                    { name: 'Njolwe' },
                    { name: 'Kampekete' },
                    { name: 'Katoba' },
                    { name: 'Chieftainess Nkomeshya' },
                    { name: 'Rufunsa' }
                ],
            },
            {
                name: 'Kafue District',
                compounds: [
                    { name: 'Shimabala' },
                    { name: 'Chilanga' }, // Partly in Kafue District
                    { name: 'Nangongwe' },
                    { name: 'Kafue Estates' },
                    { name: 'Kasupe' },
                    { name: 'Kafue Flats' },
                    { name: 'Ngwerere' },
                    { name: 'Mungu' },
                    { name: 'Makeni' }
                ],
            },
        ],
    },
    {
        name: 'Copperbelt',
        districts: [
            {
                name: 'Kitwe District',
                compounds: [
                    { name: 'Nkana East' },
                    { name: 'Nkana West' },
                    { name: 'Parklands' },
                    { name: 'Riverside' },
                    { name: 'Chimwemwe' },
                    { name: 'Wusakile' },
                    { name: 'Ndeke' },
                    { name: 'Mindolo' },
                    { name: 'Bulangililo' },
                    { name: 'Garneton' },
                    { name: 'Kwacha' },
                    { name: 'Kamitondo' },
                    { name: 'Chamboli' },
                    { name: 'Nkana Central' },
                    { name: 'Kamfinsa' },
                    { name: 'Racecourse' },
                    { name: 'Luangwa' },
                    { name: 'Chipata' },
                    { name: 'Kawama' },
                    { name: 'Chisokone' },
                    { name: 'Ipusukilo' },
                    { name: 'Mulenga' }
                ]
            },
            {
                name: 'Ndola District',
                compounds: [
                    { name: 'Chipulukusu' },
                    { name: 'Itawa' },
                    { name: 'Chifubu' },
                    { name: 'Twapia' },
                    { name: 'Ndeke' },
                    { name: 'Mushili' },
                    { name: 'Kabushi' },
                    { name: 'Pamodzi' },
                    { name: 'Kansenshi' },
                    { name: 'Hillcrest' },
                    { name: 'Masala' },
                    { name: 'Lubuto' },
                    { name: 'Kaloko' },
                    { name: 'Northrise' },
                    { name: 'Dola Hill' },
                    { name: 'Broadway' },
                    { name: 'Mitengo' },
                    { name: 'Mwenye' },
                    { name: 'Nkwazi' },
                    { name: 'Chimwemwe' },
                    { name: 'Mufulira' },
                    { name: 'Kawama' },
                    { name: 'Kansenshi Extension' }
                ],
            },
            {
                name: "Chingola District",
                compounds: [
                    { name: "Nchanga North" },
                    { name: "Nchanga South" },
                    { name: "Riverside" },
                    { name: "Chingola Central" },
                    { name: "Kabundi North" },
                    { name: "Kabundi South" },
                    { name: "Lulamba" },
                    { name: "Buyantanshi" },
                    { name: "Chiwempala" },
                    { name: "Mwaiseni" },
                    { name: "Kapisha" },
                    { name: "Mimbula" },
                    { name: "Luano" },
                    { name: "Buntungwa" }
                ]
            },
            {
                name: 'Mufulira District',
                compounds: [
                    { name: 'Kantanshi' },
                    { name: 'Butondo' },
                    { name: 'Mupena' },
                    { name: 'Kamuchanga' },
                    { name: 'Kankoyo' },
                    { name: 'Murundu' },
                    { name: 'Railway' },
                    { name: 'Chibolya' },
                    { name: 'Chibolya West' },
                    { name: 'Kasama' },
                    { name: 'Luansobe' },
                ],
            },
            {
                name: 'Chililabombwe District',
                compounds: [
                    { name: 'Kamenza' },
                    { name: 'Kansenshi' },
                    { name: 'Kasumbalesa' },
                    { name: 'Mine Area' },
                    { name: 'Railway Area' },
                    { name: 'Soweto' },
                    { name: 'Twashuka' },
                    { name: 'Lubengele' },
                    { name: 'Kasumbalesa Border Post' },
                    { name: 'Town Center' },
                    { name: 'Kakoso' },
                    { name: 'Konkola' },
                    { name: 'Mine Township' },
                    { name: 'Riverside' },
                    { name: 'SOS Village' },
                    { name: 'Spoon Drift' },
                ],
            },
            {
                name: 'Luanshya District',
                compounds: [
                    { name: 'Mikomfwa' },
                    { name: 'Mpatamatu' },
                    { name: 'Roan' },
                    { name: 'Luanshya Central' },
                    { name: 'Section 25' },
                    { name: 'Section 27' },
                    { name: 'Thompson' },
                    { name: 'Baluba' },
                    { name: 'Fisenge' },
                    { name: 'Town Center' },
                    { name: 'Muliashi' },
                ],
            },
            {
                name: 'Kalulushi District',
                compounds: [
                    { name: 'Chambishi' },
                    { name: 'Chati' },
                    { name: 'Kafubu' },
                    { name: 'Kakosa' },
                    { name: 'Kalulushi' },
                    { name: 'Kawama' },
                    { name: 'Kasala' },
                    { name: 'Kazimule' },
                    { name: 'Masaiti' },
                    { name: 'Mindolo' },
                    { name: 'Milyangu' },
                    { name: 'Mususu' }
                ]
            },
            {
                name: 'Lufwanyama District',
                compounds: [
                    { name: 'Mpatamato' },
                    { name: 'Kafubu' },
                    { name: 'Mukuba' },
                    { name: 'Kaloko' },
                    { name: 'Lukoshi' },
                    // Add more compounds if available
                ],
            },
            {
                name: 'Mpongwe District',
                compounds: [
                    { name: 'Mpongwe Compound' },
                    { name: 'Mokambo Compound' },
                    { name: 'Kafwambila Compound' },
                    { name: 'Muzoka Compound' },
                    { name: 'Kalaluka Compound' },
                    { name: 'Kanyika Compound' },
                    { name: 'Kafubu Compound' },
                    { name: 'Mukangila Compound' },
                    { name: 'Kasonde Compound' },
                    { name: 'Chibanda Compound' }
                ],
            },
            {
                name: 'Masaiti District',
                compounds: [
                    { name: 'Bwana Mkubwa' },
                    { name: 'Chimwemwe' },
                    { name: 'Mpongwe' },
                    { name: 'Masaiti' },
                    { name: 'Kanfinsa' }, // Assuming Masaiti is a compound within Masaiti District
                    // Add more compounds if available
                ],
            }

        ],
    },
    {
        name: 'Central',
        districts: [
            {
                name: 'Kabwe District',
                compounds: [
                    { name: 'Kabwe' },
                ],
            },
            {
                name: 'Mkushi District',
                compounds: [
                    { name: 'Mkushi' },
                ],
            },
            {
                name: 'Serenje District',
                compounds: [
                    { name: 'Serenje' },
                ],
            },
            {
                name: 'Kapiri Mposhi District',
                compounds: [
                    { name: 'Kapiri Mposhi' },
                ],
            },
            {
                name: 'Chibombo District',
                compounds: [
                    { name: 'Kampasa Compound' },
                    { name: 'Kasanka Compound' },
                    { name: 'Kasamanda Compound' },
                    { name: 'Kawalala Compound' },
                    { name: 'Kafue Estates Compound' },
                    { name: 'Nakabuta Compound' },
                    { name: 'Mushili Compound' },
                    { name: 'Munyama Compound' },
                    { name: 'Ngwenya Compound' },
                    { name: 'Chibombo Boma Compound' },
                ],
            }
        ],
    },
    {
        name: 'Luapula',
        districts: [
            {
                name: 'Mansa District',
                compounds: [
                    { name: 'Mansa' },
                ],
            },
            {
                name: 'Kawambwa District',
                compounds: [
                    { name: 'Kawambwa' },
                ],
            },
            {
                name: 'Nchelenge District',
                compounds: [
                    { name: 'Nchelenge' },
                ],
            },
            {
                name: 'Mwense District',
                compounds: [
                    { name: 'Mwense' },
                ],
            },
            {
                name: 'Samfya District',
                compounds: [
                    { name: 'Samfya' },
                ],
            },
        ],
    },
    {
        name: 'Southern',
        districts: [
            {
                name: 'Livingstone District',
                compounds: [
                    { name: 'Livingstone' },
                ],
            },
            {
                name: 'Choma District',
                compounds: [
                    { name: 'Choma' },
                ],
            },
            {
                name: 'Monze District',
                compounds: [
                    { name: 'Monze' },
                ],
            },
            {
                name: 'Mazabuka District',
                compounds: [
                    { name: 'Mazabuka' },
                ],
            },
            {
                name: 'Namwala District',
                compounds: [
                    { name: 'Namwala' },
                ],
            },
        ],
    },
    {
        name: 'Eastern',
        districts: [
            {
                name: 'Chipata District',
                compounds: [
                    { name: 'Chipata' },
                ],
            },
            {
                name: 'Lundazi District',
                compounds: [
                    { name: 'Lundazi' },
                ],
            },
            {
                name: 'Petauke District',
                compounds: [
                    { name: 'Petauke' },
                ],
            },
            {
                name: 'Katete District',
                compounds: [
                    { name: 'Katete' },
                ],
            },
            {
                name: 'Chadiza District',
                compounds: [
                    { name: 'Chadiza' },
                ],
            },
        ],
    },
    {
        name: 'Northern',
        districts: [
            {
                name: 'Kasama District',
                compounds: [
                    { name: 'Kasama' },
                ],
            },
            {
                name: 'Mbala District',
                compounds: [
                    { name: 'Mbala' },
                ],
            },
            {
                name: 'Mpulungu District',
                compounds: [
                    { name: 'Mpulungu' },
                ],
            },
            {
                name: 'Luwingu District',
                compounds: [
                    { name: 'Luwingu' },
                ],
            },
            {
                name: 'Mporokoso District',
                compounds: [
                    { name: 'Mporokoso' },
                ],
            },
        ],
    },
    {
        name: 'Muchinga',
        districts: [
            {
                name: 'Chinsali District',
                compounds: [
                    { name: 'Chinsali' },
                ],
            },
            {
                name: 'Mpika District',
                compounds: [
                    { name: 'Mpika' },
                ],
            },
            {
                name: 'Isoka District',
                compounds: [
                    { name: 'Isoka' },
                ],
            },
            {
                name: 'Nakonde District',
                compounds: [
                    { name: 'Nakonde' },
                ],
            },
            {
                name: 'Shiwangandu District',
                compounds: [
                    { name: 'Shiwangandu' },
                ],
            },
        ],
    },
    {
        name: 'Western',
        districts: [
            {
                name: 'Mongu District',
                compounds: [
                    { name: 'Mongu' },
                ],
            },
            {
                name: 'Senanga District',
                compounds: [
                    { name: 'Senanga' },
                ],
            },
            {
                name: 'Kalabo District',
                compounds: [
                    { name: 'Kalabo' },
                ],
            },
            {
                name: 'Lukulu District',
                compounds: [
                    { name: 'Lukulu' },
                ],
            },
            {
                name: 'Shangombo District',
                compounds: [
                    { name: 'Shangombo' },
                ],
            },
        ],
    },
    {
        name: 'N-Western',
        districts: [
            {
                name: 'Solwezi District',
                compounds: [
                    { name: 'Solwezi' },
                ],
            },
            {
                name: 'Mwinilunga District',
                compounds: [
                    { name: 'Mwinilunga' },
                ],
            },
            {
                name: 'Zambezi District',
                compounds: [
                    { name: 'Zambezi' },
                ],
            },
            {
                name: 'Chavuma District',
                compounds: [
                    { name: 'Chavuma' },
                ],
            },
        ]
    }
]

export const provincesNames: Location[] = [
    { id: '1', name: 'Central' },
    { id: '2', name: 'Copperbelt' },
    { id: '3', name: 'Eastern' },
    { id: '4', name: 'Luapula' },
    { id: '5', name: 'Lusaka' },
    { id: '6', name: 'Muchinga' },
    { id: '7', name: 'N-Western' },
    { id: '8', name: 'Northern' },
    { id: '9', name: 'Southern' },
    { id: '10', name: 'Western' },
];

export const districts: Location[] = [
    { name: 'Chingola', subLocations: [{ name: 'Chingola' }, { name: 'Nchanga' }] },
    { name: 'Kitwe', subLocations: [{ name: 'Kitwe' }, { name: 'Chambishi' }] },
    // Add more districts and their sub-locations
];

export const towns: Location[] = [
    { name: 'Lusaka' },
    { name: 'Ndola' },
    { name: 'Livingstone' },
    // Add more towns
];
