import { LeaseType, PropertyType } from "@prisma/client";
import { db } from "~/server/db";

const EMAIL = "henry_test1@gmail.com";

const data = [
  {
    name: "Eisenhauer Business Park",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.INDUSTRIAL,
    rentPerSqft: 20.0,
    leaseType: LeaseType.GROSS,
    description:
      "Eisenhauer Business Park offers a premier opportunity to establish a presence in San Antonio's largest and most active industrial submarket. Strategically located at the gateway to an amenity-rich corridor, this four-building business park provides exceptional logistical connectivity and flexible leasing options tailored to meet the needs of modern industrial users. Each facility features a 200-foot shared truck court, ESFR sprinkler systems, and two 12-foot by 14-foot drive-in doors, making it ideal for distribution, warehousing, and light manufacturing operations. The park also qualifies for the Freeport Tax Abatement, offering significant cost-saving advantages for tenants.\nNortheast San Antonio has emerged as a dominant distribution hub, bolstered by the presence of major national companies such as Prologis, Coca-Cola Co., and H-E-B. The passage of the United States–Mexico–Canada Agreement (USMCA) has further reinforced the region's importance in cross-border logistics and trade.\nThe area's growth is supported by Census Bureau data, which ranked Austin and San Antonio as the first- and third-fastest growing major cities in the United States in 2021. This growth translates into access to a dense and highly qualified labor pool of approximately 784,000 people within a 10-mile radius, making Eisenhauer Business Park an ideal location for businesses seeking skilled employees.\nTenants and employees at Eisenhauer Business Park benefit from proximity to a wide range of amenities, including Walmart Supercenter, H-E-B, Harbor Freight, and numerous dining options, all located within five minutes of the property. The park is less than 2 miles from Interstate 410, providing direct access to Downtown San Antonio in just 15 minutes and to Austin's city center in approximately 1.5 hours. With superior logistical infrastructure, flexible space configurations, and unbeatable access to a thriving metro area, Eisenhauer Business Park stands out as a top-tier industrial leasing opportunity in the San Antonio market.",
    features: [
      "Situated in NE San Antonio, the city's largest industrial submarket, with direct access to Interstate 410 and proximity to Downtown San Antonio.",
      "Qualifies for the Freeport Tax Abatement, offering cost-saving advantages for tenants.",
      "Surrounded by major players like Prologis, Coca-Cola, and H-E-B, the area reinforces its reputation as a distribution and logistics hub.",
      "Excellent connectivity for distributors, with fast routes to major urban centers and cross-border trade routes supported by the USMCA.",
    ],
  },
  {
    name: "Cubework San Antonio",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.MIXED_USE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Located in the thriving industrial district of San Antonio, 1228 Cornerway Blvd. offers a versatile and well-positioned space ideal for businesses seeking to establish or expand their operations in Central Texas. This property enjoys excellent access to major transportation routes, including I-10, I-35, and Loop 410, providing efficient connectivity to San Antonio, Austin, and beyond. With its strategic location near key distribution and manufacturing hubs, 1228 Cornerway Blvd. is an ideal choice for companies looking to enhance their logistics, warehousing, or manufacturing capabilities in the San Antonio region.\nCubework is the nation's premier short-or-long term warehouse provider, we specialize in offering expansive commercial storage, Truck Parking, Private and Shared office space, Conference Rooms, Live Stream Studios, and outdoor storage space, without the need for long-term leases. Cubework Cornerway, features 25 ext. Loading docks and a clear height of 32'. Our spaces are divisible from 300-6687 square feet of office space and 300-173,313 square feet of warehouse space. This site is on 11.33 acres and is the perfect location to park your container, trailer, or Truck/Tractor. All of our spaces are fully furnished, turnkey ready, and include a host of amenities.",
    features: [
      "24/7 Building Access, Daily Janitorial Service, Daily Maintenance Service, Forklift Rentals, Forklift Rentals with Drivers.",
      "CCTV & Guards, Fully Furnished, Outdoor Storage, Truck and Container Parking.",
      "Conference Rooms, Event Space, Complimentary Beverages (Coffee, tea, hot & cold water), High Speed Internet.",
      "Tenants are able to expand, downsize, with flexible terms with short- and long-term lease options.",
    ],
  },
  {
    name: "Green Mountain Business Park",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.INDUSTRIAL,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Located within the prestigious Green Mountain Business Park in San Antonio, Texas, Buildings 7A and 7B present an exceptional leasing opportunity for businesses seeking modern, 100% air-conditioned industrial and office space. This prime location at Green Mountain Road and Loop 1604 intersection provides immediate access to Highway 1604 and swift connectivity to IH 35 for unmatched regional access. Tenants benefit from proximity to restaurants, hotels, and service businesses, as well as easy site ingress and ample parking for cars and trailers.\nThe two-building campus offers a combined 150,000 square feet of space for lease, with 100,000 square feet in Building 7A and 50,000 square feet in Building 7B. Building 7A is fully climate-controlled and ideal for flex and distribution use, featuring 6,000 square feet of office space, a 30-foot clear height, 24 dock-high doors, two oversized ramp doors, and a high-capacity ESFR fire suppression system. Building 7B is suited for office, flex, and distribution uses, and offers heavy power and plumbing, an R-30 insulated roof, ESFR protection, a generous 7:1000 parking ratio, and potential for up to 23 dock doors.\nBoth facilities are designed for versatility, supported by I-1 zoning, and are part of a larger 900,000-square-foot business park that hosts a robust mix of national and international tenants. A skilled labor force of approximately 36,370 warehouse employees lives within 10 miles of the property. With high-end landscaping, professional surroundings, and a location just 25 minutes north of Downtown San Antonio, Green Mountain Business Park is a strategic choice for businesses to grow in one of the region's most desirable industrial hubs.",
    features: [
      "Green Mountain Business Park offers 100% air-conditioned facilities in a prime San Antonio location near Loop 1604 and IH 35 with site accessibility.",
      "Property features include flexible I-1 zoning, ESFR fire suppression systems in both buildings, many windows, and a generous 7:1000 parking ratio.",
      "Building 7B features 50,000 square feet, an R-30 insulated roof deck, heavy power and plumbing, and expansion potential for up to 23 dock doors.",
      "Secure up to 150,000 expansive square feet immediately available across two versatile buildings designed for flex, office, and distribution uses.",
      "Building 7A offers 100,000 square feet of 100% climate-controlled space, 24 dock-high doors, ramp access, windows, and 30-foot clear heights.",
      "Situated within a well-established 900,000-square-foot business park with access to over 36,000 local warehouse employees living within 10 miles.",
    ],
  },
  {
    name: "The Spectrum Building",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "The Spectrum Building at 613 NW Loop 410 is a 10-story, highly visible, Class A office building with a premier location in the North Central San Antonio submarket.\nThe 175,390-square-foot building features recent renovations to the lobby and common area restrooms and a Needlepoint Bipolar Ionization system, which is ideal for medical service users. Additional safety features include an on-site courtesy officer, 24-hour live video surveillance, and after-hours controlled access. Tenants can select from a mix of turnkey offices, move-in-ready spec suites, or customizable white box spaces. \nBesides the on-site leasing and management team, The Spectrum Building offers several in-building amenities for tenants, including a conference room and a tenant lounge with a fresh pantry market. Opportunities for top-of-building signage are available, presenting exceptional exposure for tenants. \nThis desirable San Antonio address is less than 3 miles from the San Antonio International Airport. Within a 2-mile radius, there are over 80 restaurants and numerous popular residential areas, elevating worker lifestyles. The Spectrum Building is also close to hotels, bars, and shopping destinations, and it is easily accessible by car or on foot in minutes. \nCommuters enjoy 440 parking spaces in the attached parking garage, with reserved options available, and easy access to Loop 410, which quickly connects to Interstate 10 and the McAllister Freeway. With its recent renovations, numerous on-site amenities, and superior San Antonio address, The Spectrum Building is sure to meet all business needs.",
    features: [
      "The Spectrum Building at 613 NW Loop 410 is a striking office with a curved obsidian glass exterior standing 10 stories in North Central San Antonio.",
      "Expect a Class A experience upkept by an on-site team and desirable features like a conference facility, grab-and-go market, lounge, and more.",
      "Seamless access with an attached 440-space parking garage and a direct link to Loop 410, leading to I-10, I-35, McAllister Freeway, and Loop 1604.",
      "Find a mix of build-out levels and suite sizes to accommodate any user with fully furnished options, new spec suites, and clean whitebox spaces.",
      "Recently renovated lobby and common areas with safety features like controlled access, an air filtration system, and a security guard.",
      "Explore the amenity-rich surroundings, less than a mile to LA Fitness, Dick's, Petco, Starbucks, North Star Mall, Target, and 50+ restaurants.",
    ],
  },
  {
    name: "Oakmont 410",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.INDUSTRIAL,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Brooks Global Crossing 1 at 3667 Global Way offers an expansive build-to-suit opportunity on Cambridge Development's 42-acre site with room for future expansion or additional infrastructure. \nA fully permitted active site plan is in place, and grading can begin within as soon as two weeks with flexible I-1, General Industrial zoning for a broad range of uses. Builds can range from approximately 250,000 to 685,000 square feet with shovel-ready infrastructure installed. Off-site stormwater management is ready, and the site is already allocated 6,500 gallons per day by the San Antonio Water System. Brooks Global Crossing 1 is served by a 12-inch gas main and two new 35,000-volt circuits that are carefully monitored as they also serve a hospital and an emergency communications center. Cambridge Development has over 40 years of experience developing complex warehouse, manufacturing, medical, office, and laboratory environments. The firm is sufficiently sophisticated to navigate the strict compliance requirements for the US Government and major corporations. \nBrooks Development Authority is a private entity with close ties to the City of San Antonio and the State of Texas. These relationships allow maximum flexibility in expediting permitting and other land development processes, delivering compelling savings throughout the project's lifecycle. 3667 Global Way is located in an Opportunity Zone with a full lease term exemption from property taxes and no cap on tax abatement. If the tenant desires fee simple ownership, the proposed land lease outlines the right to convert at designated points in time.\nThe project is situated within the Brooks Global Industrial Park and the greater 1,308-acre Brooks mixed-use community. The industrial park features warehouses utilized by industry-leading tenants like Simwon (EV auto parts), Misson Solar (solar manufacturing), Nissei (injection molding equipment), and Cuisine Solutions (refrigerated/freezer plant). These high-profile corporations were attracted to the park due to its excellent connectivity and workforce advantages.\nLocated at the crossroads of Loop 410 and Interstate 37, Brooks Global Crossing 1 places tenants at a crucial regional gateway. Proximity to SE Military Drive and the VIA Brooks Transit Center streamlines access even further, and drivers can get to San Antonio International Airport, downtown, and Lackland Air Force Base in less than 20 minutes. San Antonio has a strong labor pool, with the industrial sector encompassing about 20% of total payroll jobs and significant gains expected, especially in the advanced manufacturing sector. Brooks also participates in several programs to boost employment, such as the Annual Brooks Job Fair, SA: Ready to Work, RX Fame, and internship partnerships with regional education institutions.",
    features: [
      "Brooks Global Crossing 1 is a build-to-suit project for a 250,000- to 685,000-square-foot Class A industrial facility located in an Opportunity Zone.",
      "Property tax exemption for the entire lease term, full property tax abatement incentives have been secured by the Brooks Development Authority.",
      "Southeast San Antonio has a dense pool of skilled labor, 25% of the workforce (±60,000 people) within a 10-mile radius is in the industrial sector.",
      "Fully permitted active site plan and grading can begin within two weeks; ownership is able to structure long-term leases or a direct sale.",
      "42-acre site zoned I-1, General Industrial, the developer has built with strict compliance requirements for the US Government and major corporations.",
      "Commanding location near SE Military Drive, Loop 410, and Interstate 37, within 20 minutes of San Antonio Int'l Airport, Lackland AFB, and more.",
    ],
  },
  {
    name: "711 Navarro St - Common Desk – Travis Park Plaza",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.MIXED_USE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Experience coworking in the heart of downtown, in San Antonio's bustling business center at Common Desk – Travis Park Plaza. \nNestled between two major highways, a short jaunt from the airport, and within walking distance to the River Walk, parks, and numerous eateries and shops, there's something for everyone at Common Desk's first San Antonio space. Common Desk – Travis Park Plaza is located on the third floor of the iconic Travis Park building on Navarro Street, where the modern office meets southern hospitality. Between all-star amenities, move-in-ready offices, and an on-site team ready to welcome members, workweeks take off at Common Desk.\nCommon Desk creates workspace communities where everyone feels a profound sense of belonging. Whether a solo entrepreneur, part of a growing team, or simply needing a productive place to land, Common Desk – Travis Park Plaza offers flexible membership plans to meet every need. Membership opportunities include drop-in access, shared or dedicated desks, and private offices for individuals or teams of all sizes, with the support of a welcoming, hospitality-driven staff. Offices can be bundled together to accommodate much larger teams.\nDesigned with intention, the space features open-air lounges, an in-house espresso bar, sunlit chat booths, downtown views, and a fully equipped conference room for large meetings. From bottomless drip coffee to fast, secure Wi-Fi, seamless room bookings, and podcast and Zoom rooms, every amenity is curated to elevate the workday experience. Members also enjoy weekly community events and access to a growing network of Common Desk locations across Texas and beyond.",
    features: [
      "Common Desk – Travis Park Plaza's membership options include drop-in access, shared and dedicated desks, and private offices for teams of all sizes.",
      "Enjoy scenic downtown views and curated amenities like café-style lounges, conference rooms, an espresso bar, drip coffee, and inviting on-site staff.",
      "Join a vibrant member community and receive access to the growing network of hospitality-driven Common Desk locations throughout Texas and beyond.",
      "Located in the heart of Downtown San Antonio, steps from the River Walk, Travis Park, and dozens of shops, eateries, and entertainment venues.",
      "Fast and secure Wi-Fi, weekly community events, and seamless room bookings create a workspace that blends comfort, productivity, and connection.",
      "10% Broker Commission Offered",
    ],
  },
  {
    name: "700 N Saint Marys St - Regus One Riverwalk Place",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Efficient space, enigmatic views. Impress clients with a location situated on the banks of the scenic and prestigious San Antonio River. One Riverwalk Place is guaranteed to turn heads, and being Energy Star certified, our space is efficient and enigmatic.\nConveniently located just a 13-minute drive from San Antonio International Airport and surrounded by several hotels, One Riverwalk Place is ideal for traveling clients. You can unwind in our beautifully landscaped riverfront courtyard before exploring nearby museums, theatres, and restaurants.\nFind a place to thrive at Regus One Riverwalk Place: \n- Professional Offices: Elegant office space equipped with modern furniture and amenities, easily scalable for individual professionals or entire teams. Move into a turnkey office, pay by day, or custom tailor a unique suite to accelerate organizational success. \n- Community: Work wherever you need to be and discover a dynamic mix of businesses and like-minded individuals. Regular networking and personal growth events and sociable workspaces foster collaboration and open new opportunities for your business. \n- Virtual Workspace: Build your presence anywhere in the world with a new virtual address. Whether simply to forward mail, hold a meeting, or even answer calls, Regus' virtual offices have the services you need. \n- Collaboration: Host a meeting in every major city in the world and impress local clients with industry-leading technologies in one of the fully serviced meeting spaces. There is a room for every need with day-of booking for anything from private conference rooms to inspiring training spaces.\n- Join the Club: Regus' thriving global network of beautifully designed offices provides the flexibility to work anywhere and everywhere. Reserve space on the move via the Regus app and get to work from any of the business lounges, dedicated desks, or your own private office. All images shown in this listing belong to Regus' locations but may not correspond to this specific center.",
    features: [
      "Be part of a vibrant coworking community with dedicated desk or hot desking options in thousands of idyllic locations across the globe.",
      "Access Regus' network of workspaces and business lounges as often as you need and take advantage of their exclusive benefits.",
      "Collaborate with like-minded professionals and enjoy regular networking and community events with a Regus membership.",
      "Grow in a modern workplace with the added advantage of a benefits program offering exclusive discounts and bespoke procurement support.",
      "Impress clients, hold memorable workshops, and deliver a winning pitch in Regus' meeting spaces, fully equipped for gatherings of any size.",
      "Claim a virtual address in any of the prestigious locations around the world with mail handling services and a virtual assistant to answer calls.",
    ],
  },
  {
    name: "Balcones Heights Business Park & Exec. Suites",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.MIXED_USE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Now Open & Now Leasing – Your Opportunity to Join Balcones Heights Business Park & Executive Suites.\nWe are excited to announce that Balcones Heights Business Park & Executive Suites is now open and ready for tenants! Located just off the NW Loop 410 Access Road, our pristine, brand-new facility offers unmatched flexibility, visibility, and accessibility. These never-before-occupied spaces present a rare opportunity for your business to establish itself in a vibrant, fast-growing community.\nThis modern addition to the thriving Balcones Heights area is designed for the dynamic needs of today's businesses. From traditional office users to e-commerce suppliers, our versatile spaces can be tailored to fit your operations. With cost-effective and flexible lease terms — including short-term options — now is the perfect time to secure your spot before the best spaces are gone.\nOur facility offers a variety of layouts, including flex office warehouse spaces, storage-only units, and private office suites. Whether you need private workspaces, vehicle storage, inventory stocking, supply shipping, or more, Balcones Heights Business Park & Executive Suites can accommodate you.\nPositioned among major employers like Methodist Hospital, New York Life Insurance, Credit Human, Humana, Texas Partners Bank, and Hulu, our location offers unparalleled exposure, professional networking opportunities, and seamless connectivity to Loop 410 and Interstate 10. Tenants also enjoy quick access to shopping, dining, fitness, and entertainment options — making this an ideal place to work and grow.\nSpaces are leasing quickly — secure yours today and be part of the future of Balcones Heights!",
    features: [
      "Balcones Business Park & Executive Suites invites tenants to explore its spectrum of space solutions with affordable, short-term options available.",
      "Hybrid office warehouse floorplans are offered to combine management and supply/storage functions at one location.",
      "At the crossing of Loop 410 and Interstate 10, placing tenants within 10 to 15 minutes of downtown, San Antonio Airport, Alamo Heights, and more.",
      "Dedicated storage spaces are available to safely keep business goods, equipment, and/or company vehicles, depending on their size.",
      "Private office layouts ranging from approximately 300 to 600 square feet featuring conference rooms and individual offices.",
      "Amenity-rich surroundings, within a mile of Target, Academy Sports, Dave & Buster's, Planet Fitness, Busted Sandal Brewing, and 30+ restaurants.",
    ],
  },
  {
    name: "RidgeWood Plaza II",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Ridgewood Plaza II is a premier Class A office building spanning four stories and totaling 121,000 square feet located at 19122 N US Highway 281 San Antonio, TX. With available office spaces ranging from 4,048 square feet to 7,713 square feet, this building is ideal for businesses seeking a modern, energy-efficient workspace with top-tier amenities. RidgeWood Plaza II offers a highly secure open path access system, energy-efficient mechanical systems, and impressive 10-foot ceilings throughout. Additional features include a tenant-exclusive fitness center, 1st-floor showers, dressing rooms, and a contemporary tenant lounge with courtyard views. With 547 parking spaces available, including both garage and surface options, tenants can enjoy ample parking and convenient access for employees and visitors alike. The surrounding greenbelt offers a serene natural environment with Mud Creek hike and bike trails, a landscaped courtyard plaza, and outdoor seating areas for relaxation and informal meetings.\nSituated with direct access to major roadways, RidgeWood Plaza II provides exceptional connectivity to Highway 281, Sonterra Boulevard, Redland Road, and Loop 1604. This location is just a short 8-minute drive from San Antonio International Airport and a 22-minute drive to Downtown San Antonio. The area is rich with amenities, including executive housing, highly rated schools, hotels, retail centers, and a wide range of dining and entertainment options. Nearby shopping centers, such as Vineyard Shopping Center, Village at Stone Oak, and Stone Ridge Market, host national retailers like Target, Whole Foods, HomeGoods, and popular eateries such as In-N-Out Burger.\nThe RidgeWood Plaza II lease opportunity combines modern building design with access to a thriving commercial hub, making it ideal for businesses looking to establish a presence in a well-connected, high-traffic area. The area's continuous growth, with over 220,000 living within a 5-mile radius and 49% of the population attaining a bachelor's degree or higher, offers a robust and highly educated workforce. Ridgewood Plaza II's strategic location makes this a unique opportunity to secure prime office space in a desirable live-work-play community. Don't miss out on positioning your business at this landmark San Antonio property.",
    features: [
      "RidgeWood Plaza II is a Class A office building offering spaces from 4,048 to 7,713 SF, featuring high-end amenities and energy-efficient systems.",
      "Conveniently located less than 9 miles from the San Antonio International Airport.",
      "Modern tenant lounge with natural light, courtyard views, and modern features.",
      "Never worry about finding a parking spot with 550 parking spaces in the garage and the surface lot.",
      "Close proximity to executive housing, excellent schools, hotels, plenty of retail, restaurants and entertainment amenities.",
      "Enjoy numerous on-site trees preserves , with a beautiful landscaped courtyard with outdoor meeting space and walking trail.",
    ],
  },
  {
    name: "The Atrium",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "The Atrium is a well-appointed office building located in the heart of the North Central submarket at 85 NE Loop 410 in San Antonio, Texas. Tenants and guests are welcomed into a six-story atrium lobby accented by lush greenery, marble, and natural stone. The amenity-rich office building features a relaxing tenant lounge, a state-of-the-art conference room ready for in-person or virtual meetings, and banking services. Tenants enjoy peace of mind with on-site security, property management, and maintenance teams, plus after-hours controlled access. Not only does The Atrium provide the amenities only rivaled by downtown high-rises, but the immediate location offers astounding benefits to complete an optimal live-work-play atmosphere. \nPerfectly positioned with direct access to NE Loop 410, The Atrium is easily accessible with less than a mile to the San Antonio International Airport and Highway 281 and abundant on-site garage parking. This ideal location also offers direct access to a wealth of amenities. Adjacent to The Atrium are Holiday Inn, DoubleTree, and Applebee's Grill + Bar. Across NE Loop 410 is North Star Mall with Apple, Macy's, and Saks Fifth Avenue. Within 2 miles of The Atrium are Target, T.J. Maxx, Alamo Drafthouse, Starbucks, and more. After finishing errands, employees can explore the hundreds of leisure activities San Antonio has to offer, like the famed River Walk, sporting events at the AT&T Center, or the city's vibrant collection of breweries and cocktail lounges. For those searching for luxury and convenience in a lively market, look no further than the exquisite spaces at The Atrium.",
    features: [
      "Discover elegant spaces with flexible lease terms at competitive rates, featuring a modernized tenant lounge and conference room.",
      "Walking distance to Chick-Fil-A, Best Buy, Petco, and the dozens of dining and boutique shopping options at North Star Mall.",
      "Employees can conveniently fit in a workout at LA Fitness or work on their game at The Quarry Golf Course five minutes away.",
      "Incredible accessibility to downtown via Interstate 410 and a strategic location adjacent to the San Antonio International Airport.",
      "Safe and easy commuting advanced by garage parking and controlled access or take public transport via the bus station just outside.",
    ],
  },
  {
    name: "Onyx at the Airport",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Onyx at the Airport consists of twin eight-story buildings, 8626 and 8700 Tesoro Drive, totaling approximately 260,000 rentable square feet. This is an excellent headquarters opportunity with a serene park-like setting and efficient floor plans available, including multi-floor blocks. Small- to mid-sized companies can also find spaces, with many ranging from about 600 to 3,000 square feet. The park has an on-site security officer, and full-height windows provide treetop views on the upper floors. Onyx at the Airport is ideally situated on Loop 410 between Broadway and Nacogdoches, with easy access to Highway 281. Additionally, the business park is just 10 minutes from downtown and five minutes from the San Antonio Airport. Onyx at the Airport has some of the few buildings in the area that are within walking distance of local restaurants, such as Arjon's International Club, La Marginal, and Taqueria Vallarta. In just a few minutes drive, tenants also enjoy access to even more restaurants as well as hospitality, fitness, and personal services options like FedEx, a post office, and multiple banks. Onyx at the Airport affords tenants simple commutes, abundant surrounding amenities, and proximity to prime residential areas in San Antonio, such as Alamo Heights, Oakwell Farms, Olmos Park, and Terrell Hills.",
    features: [
      "Onyx at the Airport invites office tenants across all sizes and industries to explore its selection of premium suites available for quick move-ins.",
      "Walk to Planet Fitness, Crowne Plaza Hotel, Smoothie King, Bill Miller BBQ, Sir Winston's Pub, FedEx, Taco Cabana, Petroleum Club, and more.",
      "Surrounding communities provide nearby well-educated talent, as over 87,000 people have a bachelor's degree or higher within a 5-mile radius.",
      "Unmatched access to arterial roadways with Loop 410, Interstate 35, Northwest Freeway, and Wurzbach Parkway reachable within five minutes.",
    ],
  },
  {
    name: "Oak Park",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Oak Park at 1020 NE Loop 410 offers a premier Class A office environment in San Antonio's highly desirable North Central submarket. The property has undergone a top-to-bottom transformation, introducing upscale finishes and modern amenities that foster an engaging and refreshing workday experience.\nRecent renovations have elevated the building's common areas, featuring a refined lobby with custom molding, granite surfaces, and designer lighting. Tenants can choose from move-in-ready spec suites or white-box spaces primed for customization. As an Energy Star building since 2007, Oak Park prioritizes sustainability and cost-saving efficiency. \nOak Park delivers a full suite of on-site conveniences, including a comprehensive fitness facility with locker and shower rooms, a fully stocked tenant lounge with fresh market vending and complimentary Starbucks coffee, and a shared conference room. Tenants also benefit from food truck pop-ups every Thursday, full banking services with a drive-thru and ATM, and a dedicated courtesy patrol and day porter. A covered walkway connects the parking garage to the building through a lushly landscaped courtyard, providing seamless access to this advantageous area.\nNorth Central San Antonio is one of the region's hottest submarkets due to its broad accessibility and amenity-rich environment. Some of the best office labor pools in communities like Alamo Heights and Terrell Hills are nearby and established professional destinations like San Antonio International and downtown are reachable in 15 minutes or less. Well-known shopping and dining hubs like North Star Mall and Alamo Quarry Market are close by too, adding another level of convenience to the workday. Discover the Class A workspaces that await in Oak Park's transformed atmosphere with a brimming location to match by leasing here today. Get in touch.",
    features: [
      "Oak Park, 1010 NE Loop 410, is a fully renovated office with Energy Star certification since 2007, offering turnkey spec suites and white-box spaces.",
      "Convenient commutes enhanced by a connected parking garage and direct access to Loop 410, minutes from well-educated enclaves and lifestyle amenities.",
      "Tenants can reach amenities such as Target, H-E-B, Trader Joe's, Petco, over a dozen hotels, several gyms, and 50+ restaurants in under 10 minutes.",
      "Enjoy on-site essentials and more, such as fitness and locker facilities, a common conference room, a tenant lounge, banking, and weekly food trucks.",
      "Within 15 minutes of Alamo Heights, The Pearl, San Antonio Int'l Airport, downtown, Balcones Heights, Terrel Hills, Hollywood Park, and more.",
    ],
  },
  {
    name: "Trinity Plaza II",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Trinity Plaza II, located at 745 E Mulberry Avenue, is a veritable Class A office asserting a distinguished presence with its signature burnt sienna façade and postmodern architecture. Convenience is expected with a well-equipped fitness facility, ample parking, a concierge, and on-site management. \nTrinity Plaza II is part of a professional campus of esteemed organizations, facilitating potential collaboration opportunities. The adjacent local government office also hosts The Eatery, providing healthy, authentic, chef-inspired food right next door, just one of the many advantages of this location.\nNestled between Breckenridge Park, Highway 281, and a cluster of restaurants, Trinity Plaza II's location epitomizes the desires of modern worker lifestyles with walkable convenience, connectivity, and an inspiring environment. After grabbing a bite to eat at Augie's Barbed Wire Smokehouse, employees can stroll through the Japanese Tea Garden, and seamlessly commute home. Proximity to an arterial roadway affords quick access to even more amenities and residential communities preferred by professionals.",
    features: [
      "Trinity Plaza II, 745 E Mulberry Avenue, is a Class A office in North San Antonio presenting a selection of premium, move-in-ready suites.",
      "Offers easy commuting with an on-site parking garage off Highway 281, within 10 minutes of the Arena District, Alamo Heights, and Castle Hills.",
      "On-site amenities include a fitness center, concierge, courtesy officer, and management team to ensure a premium experience for all tenants.",
      "Walkable to several restaurants, a driving range, and Breckenridge Park; drivers can reach Alamo Quarry, downtown, and the airport in minutes.",
    ],
  },
  {
    name: "Ashford Oaks",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.MIXED_USE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Ashford Oaks offers medical and office space with exceptional highway connectivity, flexible layouts, and an amenity-rich environment in Northwest San Antonio's most desirable professional zone. \n8122 Datapoint Drive is a 13-story tower overlooking the South Texas Medical Center District. It features move-in-ready suites, medical lab space, build-to-suit options, and large block availabilities. The building has new ownership, offering a generous tenant improvement allowance and free initial test fits. Private balconies are also available with many of the spaces. On-site management and building maintenance staff ensure a premier tenant experience, plus conveniences like nightly janitorial, day porter services, 24-hour access with after-hours control, an on-site courtesy attendant, and 24-hour monitored surveillance cameras. Ashford Oaks has excellent visibility and prominent signage, plus ample covered parking for employees, visitors, and patients at no additional cost.\nNorthwest San Antonio is home to some of the metro's top employers, with the densest concentration of offices clustered by the intersection of Interstates 410 and 10, five minutes from 8122 Datapoint Drive. Some of the high-profile organizations within a 3-mile radius include USAA, Accenture, Hulu, UT Health, Department of Veterans Affairs, Christus Health, and Humana. The immediate dual-interstate access places tenants within minutes of Downtown San Antonio, San Antonio International Airport, and desirable residential enclaves. Closer to the property, tenants have a plethora of conveniences at their doorstep. There are over a dozen dining options within a 10-minute walk, and professionals in the adjacent 900-acre South Texas Medical Center can support healthcare tenants. Major retail hubs like Grandview Shopping Center, Huebner Oaks Center, and Wonderland of the Americas are within a short drive.",
    features: [
      "Ashford Oaks and new ownership invite tenants to find office or medical lab space with above-standard finishes and 20+ private balconies available.",
      "Healthcare tenants can work directly adjacent to the South Texas Medical Center, University Hospital, Methodist Hospital, & UT Health Science Center.",
      "Get connected to the entire metro via I-410 and I-10 within 15 minutes of Downtown San Antonio, San Antonio International Airport, and UT San Antonio.",
      "Choose from move-in-ready spaces or flexible custom floor plans with a generous tenant improvement allowance and free initial test fits.",
      "Free employee & visitor parking, nightly janitorial, day porter services, 24-hour access, on-site management and attendant, and 24-hour surveillance.",
      "Amenities abound, within walking distance of several restaurants and a five-minute drive from Target, H-E-B, Planet Fitness, and upscale hotels.",
    ],
  },
  {
    name: "San Antonio Technology Center",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Harnessing the latest innovations in technology and modern amenities, the San Antonio Technology Center (SATC) presents the opportunity to place your business at the forefront of the 21st century and redefine the workplace. Within the first steps of the building, employees and visitors are met by a recently upgraded atrium lobby with relaxing lounge chairs and games. This helps foster a community atmosphere to network with the array of mainly lab, cybersecurity, and engineering tenants. The SATC also features 24/7 accessibility and security, reservable conference rooms fully equipped with the latest technology for reliable teleconferencing, and ownership will soon unveil a luxurious rooftop sky lounge with breathtaking views of San Antonio. The building's experienced team is committed to making sure each space is tailored to meet organizational needs, whether that be with a customized lab for biotech use or private data hosting, the SATC has it all. \nThe prime technological advantage of the San Antonio Technology Center is the full-service data center, providing tenants with the utmost network quality and security. The data center has transit peering through AT&T, Spectrum, and Level3 with high carrier diversity through multiple ISP partnerships and redundant infrastructure. Tenants can opt to go with a shared cabinet or claim their own for those with heavy bandwidth requirements. The building and data center is kept safe via biometric fingerprint scanners and robust on-site power generation with 24/7 incident response. \nStrategically positioned adjacent to the I-410 and I-10 interchange, the San Antonio Technology Center is highly connected to the city's largest commercial hubs. Commuting is a breeze with reserved parking spaces ad Downtown San Antonio and the airport only 15 minutes away. The area is ideal for medical tenants as San Antonio projects 10.2% job growth in the industry by the end of 2024, and the Methodist Hospital, UT Health Medical Arts & Research Center, and the Legacy Oaks Medical Complex, among others, are just five minutes away. Employees can walk to multiple eateries right outside the building and essential amenities like Walmart, Home Depot, Gold's Gym, and Starbucks are less than three miles away. \nThis idyllic location in one of the best-performing cities in the state, combined with state-of-the-art technology places the SATC at the cutting edge of the San Antonio office, cybersecurity, biotech, and engineering market. Inquire now.\nAvailable Internet includes Spectrum, AT&T, Lumen, Rock Solid, and Google Fiber.",
    features: [
      "San Antonio Technology Center features a full-service data center for high-speed internet, share a cabinet or provision a private one.",
      "Tenants enjoy peace of mind with 24/7 access via a biometric fingerprint security system and on-site power generation with incident response systems.",
      "SATC is hub zoned for government contracts and features an industrious array of cotenants in biotech lab, cybersecurity, and engineering fields.",
      "Take advantage of expert in-house build-out services for spaces and data hosting with the ability to expand footprints and data bandwidth.",
      "San Antonio Technology Center's superior amenities include recreational facilities, shared conference rooms, and an incoming rooftop lounge.",
      "Conveniently connected to the adjacent interchange for I-410 and I-10, providing a 15-minute drive to Downtown San Antonio.",
    ],
  },
  {
    name: "1568 Austin Hwy",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.RETAIL,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Seek an exceptional leasing opportunity at 1568 Austin Highway in San Antonio, Texas. This 7,800-square-foot retail building, formerly home to the Grocery Store Outlet, features modern LED lighting, a hydraulic dock lift, and roll-down security curtains. With prominent pylon signage and ample parking, this property is equipped to meet the needs of retailers seeking high visibility and accessibility.\n1568 Austin Highway is at a signalized intersection with three points of egress and ingress. This retail building benefits from high traffic counts on Austin Highway, traveled by 21,381 vehicles per day, and Eisenhauer Road, frequented by 12,048 cars daily. This site is primed to attract steady customer foot traffic in a bustling retail corridor amid major brands like H-E-B, Lowe's, Walmart Supercenter, and Target. Just 3 miles from the Interstates 410 and 35 interchange, the property's location provides seamless access to downtown and the San Antonio metropolitan area. \nNestled in the affluent Alamo Heights area, 1568 Austin Highway matches a vast array of lifestyles due to its proximity to the San Antonio airport, museums, business centers, and Fort Sam Houston. This destination within a 3-mile radius has strong demographics, with over 270,000 residents making an average household income of $80,011 and contributing the total consumer spending of $2.7 billion.",
    features: [
      "Set up retail business at a 7,800-square-foot highly visible, standalone storefront at 1568 Austin Highway.",
      "Inside, the well-maintained building sports LED lighting, a hydraulic dock lift, and roll-down security curtains.",
      "Outside, there are 42 parking spaces, a wraparound awning, a large pylon sign, and three points of egress/ingress.",
      "At the signalized intersection of Austin Highway and Eisenhauer Road, trafficked by a total of 33,429 vehicles per day.",
      "Build synergy with the neighboring dining, shopping, and entertainment amenities just a few blocks away.",
    ],
  },
  {
    name: "Inwood Village",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Inwood Village is a well-appointed office campus at 2722 and 2806 W Bitters Road in San Antonio. Recently completed, the project includes two Class A office buildings with flexible building plans to accommodate a wide range of business needs. Nestled into the trees, the two-story office buildings sit in a scenic park-like setting with lush landscaping and feature modern lobbies and high-end finishes. Inwood Village offers Class A move-in ready office suites ranging from 1,200 square feet to 11,000 square feet with the ability to combine and customize spaces to meet business needs. Tenants can unwind in the fully equipped tenant lounges and outdoor patio/deck, and host virtual or in-person meetings in state-of-the-art conference rooms with audio/visual equipment. Enjoy peace of mind with on-site property management, security cameras, and secure keycard access. Perfectly positioned in highly desirable Far North Central San Antonio, Inwood Village is in the master-planned business community of Inwood Heritage Oaks and minutes from the University of Texas at San Antonio. Located along Loop 1604, Inwood Village is surrounded by a wealth of shopping, dining, and entertainment options with Gold's Gym, Chick-fil-A, Panera Bread, Target, and Golf Galaxy within two miles. This strategic location also offers an easy commute with five miles to Highway 281 and Interstate 10 and ample surface and covered parking.",
    features: [
      "Newly constructed office building with high-end move-in ready suites that can be combined and customized to meet business needs.",
      "Amenities abound with a fully equipped tenant lounges, an outdoor patio and deck, and state-of-the-art conference rooms with A/V equipment.",
      "Perfectly positioned within a five-minute drive of Top Golf, multiple shopping centers, and The Rim with national brands, restaurants, and a cinema.",
      "Enjoy an effortless commute with direct access to Loop 1604 and ample parking, including covered spaces under solar-panel-covered carports.",
    ],
  },
  {
    name: "Bonham Building",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "The Bonham Building is exclusively offered by Brass, presenting a myriad of opportunities with competitive lease terms to work in one of the most desirable locations for office tenants in all of San Antonio. \nA 2024 capital improvements program has fully upgraded the Bonham Building, renovating the lobby, common areas, and all suites to move-in-ready condition. Suite layouts have been kept open to allow for full customization, and tenant improvement allowances are negotiable. On-site maintenance ensures a seamless experience, and after-hours controlled access provides peace of mind. The Bonham Building's common amenities increase business capabilities and allow them to save their square footage for core functions. Tenants can onboard new teams in the training center, run high-powered meetings in the conference room, or relax in the building lounge. \nLocated at 4400 S Piedras Drive, this is one of the most accessible addresses in San Antonio, boasting direct access to Loop 410, several bus routes serving the park, and ample parking for employees and visitors. This Northwest San Antonio area's litany of multifaceted destinations elevates the lifestyles of all types of businesses. Employees will enjoy a plethora of amenities minutes away, from shopping and dining to fitness and entertainment. This would be an ideal medical office location due to the significant concentration of healthcare tenants in and around the South Texas Medical Center, which is 1.5 miles from the Bonham Building. This is also an extremely commutable location near the crossing of Interstate 10 and 410. The vicinity has become a hotbed for young professionals in multifamily dwellings, and older, well-educated individuals live nearby, too. This mix provides an excellent talent pipeline and access to health-conscious communities for medical-related tenants. \nThe Bonham Building offers spaces at an annual rate of $20 per square foot. This presents a marked discount to typical office leases in San Antonio, which were reported at $30 per square foot in Q2 2025. Even more locally, the Northwest San Antonio submarket has an average annual rent of approximately $29 per square foot. Establish a presence at the heart of Northwest San Antonio and enjoy its premier locational factors from a well-appointed, cost-effective office space at the Bonham Building today. Get in touch.",
    features: [
      "Bonham Building offers move-in-ready suites on flexible lease terms and customization options with negotiable TI allowances available.",
      "Renovated in 2024, featuring an upgraded lobby and common areas, a conference room, training center, 24/7 access, ample parking, and a tenant lounge.",
      "Cost-effective opportunity without sacrificing quality or location: annual asking rates here are about $10/SF less than the San Antonio average.",
      "Superior connectivity off Loop 410, only 2 miles to I-10, 6.5 miles to the airport, 9 miles to Downtown San Antonio, and 10 miles to Alamo Heights.",
      "Amenities within a five-minute drive include Walmart Supercenter, Gold's Gym, Target, Wonderland of the Americas, and over 70 eclectic restaurants.",
      "Ideal location for medical-related tenants near South Texas Medical Center and $170M in annual spending on healthcare within a 5-mile radius.",
    ],
  },
  {
    name: "Centerview Crossing",
    city: "San Antonio",
    state: "TX",
    propertyType: PropertyType.OFFICE,
    rentPerSqft: 8.0,
    leaseType: LeaseType.GROSS,
    description:
      "Centerview Crossing invites businesses to explore its selection of efficient spaces, with move-in-ready and customizable layout options, to build an office presence in the advantageous Northwest San Antonio submarket. \nSince acquiring the office park in August 2022, Dogwood Commercial has implemented a significant capital improvement project to elevate the workplace experience. Employees can now easily squeeze in a workout at the new fitness center, and tenants can hold high-powered meetings in the 50-person conference room. Dogwood Commercial also upgraded all the common area lobbies, corridors, and restrooms. Additionally, the landscaping was overhauled to create a lush campus atmosphere. \nWith a location just off Interstate 410, convenient ingress/egress, and ample parking, Centerview Crossing's access is seamless, and its brimming surroundings complement professional and personal life. Hundreds of diverse businesses are nearby, and healthcare-related companies are only five minutes from the San Antonio Medical Center, which provides plenty of partnership opportunities. The area is replete with lifestyle destinations, such as Balcones Heights, The Village at the Summit, and Oak Hills Country Club, enhancing work-life balance for employees.",
    features: [
      "Centerview Crossing offers turnkey and white box office suites in a cohesive campus setting with superb on-site and area amenities.",
      "Strategic position off Interstate 410, five minutes to the medical center area, 10 minutes to SA International Airport, and 15 minutes to Downtown SA.",
      "Recent capital improvement project added a fitness center and a 50-person conference room and overhauled common areas and landscaping.",
      "Amenity-rich area with Balcones Heights, Oak Hill Country Club, H-E-B, Target, nearly 20 hotels, 75+ restaurants, and more within a 2-mile radius.",
    ],
  },
];

async function addProperty(): Promise<void> {
  await data.forEach(
    async (pdata) =>
      await db.property.create({
        data: {
          landlordEmail: EMAIL,
          isDummy: true,
          ...pdata,
        },
      }),
  );
}

addProperty();
