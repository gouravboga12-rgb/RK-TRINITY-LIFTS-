import passengerLiftImg from '../assets/passenger_lift.png';
import homeLiftImg from '../assets/home_lift.png';
import hospitalLiftImg from '../assets/hospital_lift.png';
import goodsLiftImg from '../assets/goods_lift.png';
import capsuleLiftImg from '../assets/capsule_lift.png';
import escalatorImg from '../assets/escalator.png';

export const productsList = [
  {
    id: "passenger-lifts",
    name: "Passenger Lifts",
    slug: "passenger-lifts",
    category: "commercial",
    categoryLabel: "Commercial & Residential",
    image: passengerLiftImg,
    shortDesc: "High-speed passenger lifts equipped with gearless permanent magnet motors and smart control logics.",
    description: "Our passenger elevators combine intelligence, energy efficiency, and luxury aesthetics. Engineered with Permanent Magnet Synchronous Motor (PMSM) traction machines and Variable Voltage Variable Frequency (VVVF) door operators, they offer quiet, smooth rides for apartments, commercial towers, and hotels.",
    specifications: {
      capacity: "4 to 24 Persons (272kg to 1632kg)",
      speed: "Up to 3.00 m/s",
      drive: "PMSM Gearless Traction Drive",
      operation: "Selective Collective Control",
      power: "3-Phase 415V 50Hz"
    },
    features: [
      "Automatic Rescue Device (ARD) for power failures",
      "Overload indicator with audio alert",
      "VVVF door controller for smooth door opening/closing",
      "LED ceiling lighting and premium stainless steel hairline finish",
      "Infrared multi-beam door safety sensors"
    ],
    applications: [
      "High-rise Residential Apartments",
      "Commercial Offices & Corporate Parks",
      "Star Hotels & Premium Resorts",
      "Public Administrative Buildings"
    ],
    technicalDetails: {
      pitDepth: "1600 mm",
      overhead: "4800 mm",
      cabinWalls: "Stainless Steel Hairline / Mirror Finish",
      flooring: "PVC / Premium Granite tiles",
      controlPanel: "Microprocessor-based full collective system"
    },
    reviews: [
      {
        id: 1,
        name: "Srinivas Rao",
        rating: 5,
        date: "2026-05-12",
        comment: "Excellent installation at our high-rise apartment complex in Tirupati. The gearless motor is incredibly quiet, and floor alignment is perfect."
      },
      {
        id: 2,
        name: "Meenakshi Sundaram",
        rating: 4,
        date: "2026-06-02",
        comment: "Very professional team. The cabin SS hairline finish looks extremely premium. Mild delay in site handover due to civil works, but lift performance is outstanding."
      },
      {
        id: 3,
        name: "David D'Souza",
        rating: 5,
        date: "2026-06-18",
        comment: "The ARD safety rescue device worked perfectly during a sudden grid failure last week. It automatically parked on the nearest floor and released the passengers safely."
      }
    ]
  },
  {
    id: "home-lifts",
    name: "Home Lifts",
    slug: "home-lifts",
    category: "residential",
    categoryLabel: "Residential Lifts",
    image: homeLiftImg,
    shortDesc: "Bespoke, compact residential elevators requiring minimal pit depth and running on single-phase domestic power.",
    description: "Designed for premium villas and duplex homes, our residential lifts provide vertical mobility without compromising architectural aesthetics. They are engineered to operate on standard single-phase domestic power supplies, requiring a minimal pit (as shallow as 150mm) and no machine room.",
    specifications: {
      capacity: "3 to 5 Persons (250kg to 400kg)",
      speed: "0.3 m/s to 0.4 m/s",
      drive: "Hydraulic or Gearless Belt Drive",
      operation: "Single Automatic Push Button",
      power: "Single-Phase 230V / 3-Phase 415V"
    },
    features: [
      "Extremely compact shaft requirements",
      "Minimal pit depth (150 mm to 300 mm)",
      "Single-phase operation (fits residential grid)",
      "Bespoke glass cabin paneling options",
      "Manual lowering emergency valve in case of power failure"
    ],
    applications: [
      "Private Duplex and Triplex Villas",
      "Penthouses and Row Houses",
      "Senior Citizen Friendly Homes",
      "Modern Architectural Bungalows"
    ],
    technicalDetails: {
      pitDepth: "150 mm to 300 mm",
      overhead: "3000 mm minimum",
      cabinWalls: "Glass Panoramic / Wooden Laminate / Premium Stainless Steel",
      flooring: "Custom Wood / Marble",
      controlPanel: "Silent hydraulic controller or compact VVVF controller"
    },
    reviews: [
      {
        id: 1,
        name: "K. Raghunath",
        rating: 5,
        date: "2026-04-18",
        comment: "Installed a 3-passenger glass lift in my duplex villa. Since my parents are senior citizens, this has changed their lives. Fits perfectly in the stairwell void and runs on normal single-phase power."
      },
      {
        id: 2,
        name: "Pritha Reddy",
        rating: 5,
        date: "2026-05-29",
        comment: "Excellent aesthetics! The panoramic glass allows natural light to flow through the lobby. Highly recommend the automatic glass door upgrade."
      },
      {
        id: 3,
        name: "Vikram Malhotra",
        rating: 4,
        date: "2026-06-11",
        comment: "Great engineering. It requires absolutely no separate machine room, which saved a lot of roof construction space. The hydraulic pump makes a slight hum during upward travel but is otherwise silent."
      }
    ]
  },
  {
    id: "hospital-lifts",
    name: "Hospital Lifts",
    slug: "hospital-lifts",
    category: "industrial",
    categoryLabel: "Medical & Industrial Lifts",
    image: hospitalLiftImg,
    shortDesc: "Bed and stretcher elevators featuring leveling accuracy, jerk-free travel, and spacious interiors.",
    description: "Medical emergencies require speed and total safety. Our Hospital Lifts are designed to accommodate large stretchers, hospital beds, and medical staff. Advanced collective control systems prioritize emergency calls, while high-accuracy level landing prevents trolley bumps during entry.",
    specifications: {
      capacity: "15 to 26 Persons (1020kg to 1768kg)",
      speed: "Up to 1.50 m/s",
      drive: "PMSM Gearless Traction Drive",
      operation: "Attendant/Non-attendant Automatic Collective",
      power: "3-Phase 415V 50Hz"
    },
    features: [
      "Extended cabin depth to fit medical stretchers and ICU beds",
      "Jerk-free travel and micro-leveling landing accuracy (+/- 2mm)",
      "Emergency medical key override (EMR)",
      "Stainless steel crash guards inside cabin walls",
      "Two-way intercom connected directly to control room"
    ],
    applications: [
      "Multi-specialty Hospitals & Surgical Centers",
      "Medical Colleges & Diagnostic Laboratories",
      "Nursing Homes & Rehabilitation Centers"
    ],
    technicalDetails: {
      pitDepth: "1600 mm",
      overhead: "4800 mm",
      cabinWalls: "Anti-bacterial Stainless Steel 304 Finish",
      flooring: "Anti-skid Heavy Duty Vinyl",
      controlPanel: "Dual operating car panel option for stretchers"
    },
    reviews: [
      {
        id: 1,
        name: "Dr. Sandeep Nair",
        rating: 5,
        date: "2026-03-24",
        comment: "We installed two stretcher lifts in our surgical block. The micro-leveling is spot on, which prevents any jolts to patients on stretchers. The priority override key works instantly."
      },
      {
        id: 2,
        name: "Sister Mary D'Souza",
        rating: 5,
        date: "2026-05-15",
        comment: "Spacious enough for a full ICU bed, IV poles, and three staff members. The anti-skid vinyl flooring is easy to disinfect and clean."
      },
      {
        id: 3,
        name: "A. K. Subramaniam",
        rating: 4,
        date: "2026-06-05",
        comment: "Highly robust structure. The stainless steel bumper strips prevent direct trolley crashes against the side walls. Very stable performance during continuous shifts."
      }
    ]
  },
  {
    id: "goods-lifts",
    name: "Goods Lifts",
    slug: "goods-lifts",
    category: "industrial",
    categoryLabel: "Industrial Lifts",
    image: goodsLiftImg,
    shortDesc: "Heavy load elevators designed for material transport across manufacturing levels.",
    description: "Built to withstand harsh industrial environments, our Goods Lifts transport heavy items, pallets, and factory machinery. The structural design features reinforced steel profiles, heavy-duty floor plates, and collision-resistant doors.",
    specifications: {
      capacity: "800kg to 5000kg (Custom capacities available)",
      speed: "Up to 0.5 m/s",
      drive: "Heavy Duty Hydraulic / Geared Traction",
      operation: "Push-button Collective",
      power: "3-Phase 415V 50Hz"
    },
    features: [
      "Robust sheet metal doors or collapsible steel gates",
      "Anti-skid chequered plate steel flooring",
      "Structural steel bumper guides inside cabin",
      "Mechanically locked safety doors that open only at floor levels",
      "Solenoid valve hydraulic control for heavy load leveling"
    ],
    applications: [
      "Manufacturing Units & Heavy Industry Factories",
      "Logistics Warehouses & Distribution Hubs",
      "Automobile Showrooms & Assembly Lines",
      "Wholesale Retail Storage Facilities"
    ],
    technicalDetails: {
      pitDepth: "1600 mm",
      overhead: "4800 mm",
      cabinWalls: "Epoxy Painted Mild Steel / Galvanized Iron Sheets",
      flooring: "Reinforced MS Chequered Plates",
      controlPanel: "Industrial PLC controller or relay-logic control box"
    },
    reviews: [
      {
        id: 1,
        name: "G. Venkatesh",
        rating: 5,
        date: "2026-04-03",
        comment: "Extremely rugged goods lift installed in our packaging warehouse. Operates 18 hours a day transporting heavy pallets up to 2 tons. The chequered floor plate is solid and hasn't warped."
      },
      {
        id: 2,
        name: "Mohammad Ali",
        rating: 4,
        date: "2026-05-19",
        comment: "Excellent heavy load stability. The doors align well with our forklifts. The service technicians are very prompt with their monthly inspections."
      },
      {
        id: 3,
        name: "Rajesh Chandran",
        rating: 5,
        date: "2026-06-22",
        comment: "Heavy duty performance at its best. The mechanical interlocks are solid, preventing any gate opening when the cabin isn't aligned. Essential for warehouse safety."
      }
    ]
  },
  {
    id: "hydraulic-lifts",
    name: "Hydraulic Lifts",
    slug: "hydraulic-lifts",
    category: "residential",
    categoryLabel: "Residential & Commercial Lifts",
    image: homeLiftImg,
    shortDesc: "Smooth hydraulic elevators ideal for low-rise developments, requiring no overhead space or massive shafts.",
    description: "Hydraulic Lifts are the ideal solution for low-rise buildings (up to 4-5 floors) where structural space is restricted. Since the load of the elevator is borne by the ground cylinder, they require minimal head room and side shafts, running with extreme operating smoothness.",
    specifications: {
      capacity: "3 to 10 Persons (250kg to 680kg)",
      speed: "0.3 m/s to 0.6 m/s",
      drive: "Hydraulic Ram & Cylinder System",
      operation: "Microprocessor Collective Control",
      power: "3-Phase 415V or Single-Phase 230V"
    },
    features: [
      "Zero overhead requirement (fits roof constraints)",
      "Load transferred directly to ground slab, reducing column stress",
      "Silent hydraulic pump unit with proportional control valves",
      "ARD functions integrated through backup battery pressure releases",
      "Lower energy cost on downward travels (gravity assist)"
    ],
    applications: [
      "Low-Rise Offices & Private Homes",
      "Showrooms & Boutique Retail Outlets",
      "Modernization of existing old structures"
    ],
    technicalDetails: {
      pitDepth: "500 mm minimum",
      overhead: "3200 mm minimum",
      cabinWalls: "Stainless Steel or Painted MS Panels",
      flooring: "PVC Tile or Custom Granite",
      controlPanel: "Hydraulic valve drive panel with oil cooler support"
    },
    reviews: [
      {
        id: 1,
        name: "Nikhil Joshi",
        rating: 5,
        date: "2026-02-14",
        comment: "Great solution for low-rise apartment blocks. Since we have height restrictions in our zone, the zero-overhead layout was a lifesaver. The ride down is completely silent."
      },
      {
        id: 2,
        name: "Siddharth Sen",
        rating: 4,
        date: "2026-04-30",
        comment: "Very smooth acceleration and deceleration curves. Installation took only a week once the shaft was ready. Professional support staff."
      },
      {
        id: 3,
        name: "Vandana Sharma",
        rating: 5,
        date: "2026-06-08",
        comment: "Excellent value for low-rise commercial structures. Energy consumption is very low because it doesn't draw power when moving downwards."
      }
    ]
  },
  {
    id: "capsule-lifts",
    name: "Capsule Lifts",
    slug: "capsule-lifts",
    category: "commercial",
    categoryLabel: "Commercial Lifts",
    image: capsuleLiftImg,
    shortDesc: "Panoramic glass capsule lifts adding premium aesthetic value to commercial malls and luxury hotels.",
    description: "Our Capsule Elevators act as architectural highlights. Manufactured with impact-resistant laminated safety glass walls, they offer panoramic views for passengers. Fitted with LED strip lights, under-floor indicators, and gold or titanium SS finishes, they transform building lobbies into luxury spaces.",
    specifications: {
      capacity: "6 to 15 Persons (408kg to 1020kg)",
      speed: "1.0 m/s to 1.75 m/s",
      drive: "PMSM Gearless Traction Drive",
      operation: "Selective Collective Control",
      power: "3-Phase 415V 50Hz"
    },
    features: [
      "High-clarity safety glass paneling on multiple car walls",
      "Custom capsule shapes (Semi-circular, square, diamond)",
      "Premium interior finishes (Titanium Gold, Rose Gold mirror SS)",
      "Micro-movement start and stop patterns for panoramic comfort",
      "Under-car structural decorative spot lighting"
    ],
    applications: [
      "Shopping Malls & Retail Atriums",
      "Luxury 5-Star Hotel Lobbies",
      "Corporate Headquarters & Exhibition Centers",
      "High-end Residential Mansions"
    ],
    technicalDetails: {
      pitDepth: "1600 mm",
      overhead: "4500 mm",
      cabinWalls: "Laminated Safety Glass (10mm thickness) + Stainless Steel Mirror",
      flooring: "Premium Translucent Marble / Terrazzo",
      controlPanel: "Intelligent microprocessor board with voice synthesizers"
    },
    reviews: [
      {
        id: 1,
        name: "Amitabh Chaturvedi",
        rating: 5,
        date: "2026-03-10",
        comment: "We installed two circular capsule lifts in our new hotel lobby. It has become the focal point of the hotel. Absolute masterpiece in glass and gold titanium finish."
      },
      {
        id: 2,
        name: "Rishi Kapoor",
        rating: 5,
        date: "2026-05-18",
        comment: "The panoramic glass panel clarity is beautiful. Passengers love the view of the mall atrium while riding. Zero glitches since commissioning."
      },
      {
        id: 3,
        name: "Nandini Rao",
        rating: 4,
        date: "2026-06-25",
        comment: "Excellent speed control and smooth starting curve. A premium product that adds immense value to high-end commercial spaces."
      }
    ]
  },
  {
    id: "mrl-lifts",
    name: "MRL Lifts (Machine Room Less)",
    slug: "mrl-lifts",
    category: "commercial",
    categoryLabel: "Commercial & Residential",
    image: passengerLiftImg,
    shortDesc: "Space-saving elevators with the motor installed inside the shaft, eliminating the need for a separate rooftop machine room.",
    description: "Machine Room Less (MRL) Elevators optimize building space. By using a compact PMSM traction machine installed directly inside the elevator shaft (on guide rails), we eliminate the traditional concrete machine room on the rooftop. This reduces construction costs and frees up roof terrace space.",
    specifications: {
      capacity: "6 to 16 Persons (408kg to 1088kg)",
      speed: "1.0 m/s to 2.0 m/s",
      drive: "Gearless PMSM Mounted on Shaft Top",
      operation: "Duplex / Simplex Collective Control",
      power: "3-Phase 415V 50Hz"
    },
    features: [
      "Eliminates rooftop machine rooms, complying with height codes",
      "High-torque gearless motor with sealed lifetime bearings",
      "Highly responsive brake feedback system",
      "Up to 35% space savings in building design",
      "Low heat generation and quiet operation"
    ],
    applications: [
      "Height-restricted Buildings & Roof Terraces",
      "Modern Commercial Complexes",
      "Medium-rise Residential Developments"
    ],
    technicalDetails: {
      pitDepth: "1500 mm",
      overhead: "4200 mm to 4500 mm",
      cabinWalls: "Stainless Steel Hairline / Wooden Laminate",
      flooring: "PVC or Marble Tiles",
      controlPanel: "Slim control cabinet located in the top floor landing wall"
    },
    reviews: [
      {
        id: 1,
        name: "Abhishek Bannerjee",
        rating: 5,
        date: "2026-04-12",
        comment: "Great space-saving design. Eliminating the concrete machine room on the terrace allowed us to build a penthouse garden. The gearless motor is very quiet."
      },
      {
        id: 2,
        name: "Shruti Sen",
        rating: 5,
        date: "2026-05-22",
        comment: "Very sleek and modern. The control cabinet is integrated into the wall on the top landing, saving a lot of square footage. Highly recommended for height-restricted complexes."
      },
      {
        id: 3,
        name: "Arun Shourie",
        rating: 4,
        date: "2026-06-15",
        comment: "Smooth performance. The permanent magnet traction system is very efficient, reducing monthly apartment energy costs by a noticeable margin."
      }
    ]
  },
  {
    id: "freight-lifts",
    name: "Freight Lifts",
    slug: "freight-lifts",
    category: "industrial",
    categoryLabel: "Industrial Lifts",
    image: goodsLiftImg,
    shortDesc: "Ultra-heavy capacity cargo lifts designed to withstand forklift loads and continuous operating shifts.",
    description: "Freight Lifts are the workhorses of logistics hubs. They are built for extreme durability, with vertical sliding gates, explosion-proof components (optional), and thick structural steel skeletons designed to withstand forklift loading impacts without shaft distortion.",
    specifications: {
      capacity: "2000kg to 10000kg",
      speed: "0.2 m/s to 0.5 m/s",
      drive: "Tandem Geared Traction / Heavy Hydraulic",
      operation: "Independent Attendant Control / Auto Collective",
      power: "3-Phase 415V 50Hz"
    },
    features: [
      "Wide opening vertical sliding gates or collapsible mesh gates",
      "Thick structural MS chequered flooring (up to 8mm)",
      "High overload tolerance safety brake blocks",
      "IP-rated industrial controls for dust and moisture resistance",
      "Level accuracy sensors to align flat with loading docks"
    ],
    applications: [
      "Industrial Refineries & Chemical Plants",
      "Heavy Engineering Factories & Shipyards",
      "Logistics Warehouses & Air Cargo Terminals"
    ],
    technicalDetails: {
      pitDepth: "1600 mm to 2200 mm",
      overhead: "4500 mm to 5000 mm",
      cabinWalls: "Reinforced Corrugated Steel Plate Walls",
      flooring: "Heavy-Gauge Steel Plate with structural sub-beams",
      controlPanel: "Heavy-duty dust-proof PLC cabinet"
    },
    reviews: [
      {
        id: 1,
        name: "B. Balakrishnan",
        rating: 5,
        date: "2026-02-28",
        comment: "Heavy cargo monster. We transport loaded pallet trucks up to 4 tons daily. The vertical door configuration is robust and stands up to forklift bumps."
      },
      {
        id: 2,
        name: "Gurpreet Singh",
        rating: 5,
        date: "2026-04-14",
        comment: "Excellent structural reinforcement. The steel guide beams are highly rigid. Very stable leveling system matching our high cargo docks."
      },
      {
        id: 3,
        name: "Satish Kaushik",
        rating: 4,
        date: "2026-06-03",
        comment: "Very durable. Heavy duty operation without any speed drop under full load. The monthly maintenance check ensures total runtime safety."
      }
    ]
  },
  {
    id: "escalators",
    name: "Escalators & Moving Walks",
    slug: "escalators",
    category: "commercial",
    categoryLabel: "Commercial Lifts",
    image: escalatorImg,
    shortDesc: "Continuous vertical transportation systems for public transit and commercial department stores.",
    description: "Our escalators and moving walks facilitate continuous, high-volume passenger traffic. Designed with micro-machined step components, safety brush inserts, and automated smart-sensor speed control (which slows down when empty), they reduce power costs and extend mechanical durability.",
    specifications: {
      capacity: "6000 to 9000 Passengers per hour",
      speed: "0.5 m/s",
      inclination: "30 or 35 Degrees",
      stepWidth: "600 mm / 800 mm / 1000 mm",
      power: "3-Phase 415V 50Hz"
    },
    features: [
      "Intelligent start/stop sensors to conserve energy when empty",
      "Yellow high-contrast safety step borders",
      "Skirt panel safety brushes to prevent shoe trapping",
      "Emergency stop push buttons at both landing platforms",
      "Automated internal lubrication system for drive chains"
    ],
    applications: [
      "Airports & Metro Rail Terminals",
      "Supermarkets & Commercial Atriums",
      "Convention Centers & Exhibition Arenas"
    ],
    technicalDetails: {
      trussMaterial: "High-strength welded structural steel",
      balustrade: "Tempered Glass (10mm) / Stainless Steel Panel",
      handrail: "Vulcanized Neoprene rubber with steel core",
      combPlates: "Anti-slip grooved aluminum plates"
    },
    reviews: [
      {
        id: 1,
        name: "V. K. Krishnan",
        rating: 5,
        date: "2026-05-01",
        comment: "Excellent continuous passenger transit. Fits high peak volume in our retail mall. The smart standby sensor slows down steps when unoccupied, reducing energy bills."
      },
      {
        id: 2,
        name: "Sanjay Singhal",
        rating: 5,
        date: "2026-05-28",
        comment: "Highly safe and durable. Safety yellow step borders are crisp and clear. The emergency shutoff responds instantly."
      },
      {
        id: 3,
        name: "Nisha Patel",
        rating: 4,
        date: "2026-06-20",
        comment: "Robust mechanical assembly. Internal chain lubrication works automatically. Very low noise operation compared to other mall escalators."
      }
    ]
  },
  {
    id: "customized-lifts",
    name: "Customized Lift Solutions",
    slug: "customized-lifts",
    category: "residential",
    categoryLabel: "Custom Engineering",
    image: capsuleLiftImg,
    shortDesc: "Specialized lifts designed for circular shafts, outdoor glass structures, and low-pit architectures.",
    description: "When standard catalogs fail to match your architectural requirements, our engineering cell step in. We design custom solutions, including outdoor panoramic glass elevator structures (weatherproofed), round/circular cabins, pit-less elevators, and ultra-high-speed configurations.",
    specifications: {
      capacity: "Custom structured (200kg to 5000kg)",
      speed: "Custom speed curves",
      drive: "PMSM traction / Hydraulic / Pneumatic vacuum",
      operation: "Custom program logic controllers",
      power: "Optimized based on motor layout"
    },
    features: [
      "Custom footprint designs to fit narrow structural voids",
      "Outdoor structure integration (galvanized weatherproof rails)",
      "Pneumatic vacuum lift options for private apartments",
      "Tailor-made aesthetic finishes (brass, marble, custom lighting)",
      "Specific controller logic codes for automated logistics integration"
    ],
    applications: [
      "Architectural Heritage Site Modernizations",
      "Compact Duplex Apartments with space voids",
      "Outdoor scenic elevator columns on building facades",
      "Automated warehouse material conveyor lifts"
    ],
    technicalDetails: {
      pitDepth: "Tailored to shaft constraints (as low as 100mm)",
      overhead: "Custom engineered",
      cabinWalls: "Panoramic curved glass, designer brass, wood moldings",
      flooring: "Custom selected materials",
      controlPanel: "Programmable Siemens / Custom lift controllers"
    },
    reviews: [
      {
        id: 1,
        name: "Ar. Harshvardhan Shah",
        rating: 5,
        date: "2026-04-10",
        comment: "Exceptional design execution. We requested a circular glass pneumatic lift for a heritage bungalow restoration. They customized the frame flawlessly, fitting a very narrow structural stairwell."
      },
      {
        id: 2,
        name: "Vikramaditya Rao",
        rating: 5,
        date: "2026-05-24",
        comment: "We built an outdoor panoramic glass lift structure on our villa facade. It is fully weatherproofed with galvanized rails, and runs smoothly under heavy sun and rain."
      },
      {
        id: 3,
        name: "Lata Mangeshkar",
        rating: 5,
        date: "2026-06-19",
        comment: "Excellent custom controller work. Tailor-made automation logic connects directly with our cleanroom dispatch corridors. High engineering standards."
      }
    ]
  }
];
