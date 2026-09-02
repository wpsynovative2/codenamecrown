/**
 * All page copy, mirrored 1:1 from the live WordPress site.
 * Kept in one place so content edits never require touching layout code.
 */

/* Root-relative so the header still works from other routes (e.g. /thank-you),
   where a bare "#overview" would resolve against that path instead of home. */
export const NAV_LINKS = [
  { label: "overview", href: "/#overview" },
  { label: "about-us", href: "/#about-us" },
  { label: "highlights", href: "/#highlights" },
  { label: "amenities", href: "/#amenities" },
  { label: "eoi benefits", href: "/#eoi-benefits" },
  { label: "configuration", href: "/#configuration" },
  { label: "connectivity", href: "/#connectivity" },
  { label: "contact us", href: "/#contact-us" },
];

export const CONTACT = {
  phonePrimary: "9833151512",
  phoneSecondary: "9833161614",
  email: "prabhavpride@gmail.com",
  whatsapp: "919833151512",
  address:
    "Codename Crown, 90ft Road, Next to ICICI Bank, Mulund (E), Mumbai - 400081",
  addressUpper:
    "Codename Crown, 90FT ROAD, NEXT TO ICICI BANK, MULUND (E), MUMBAI-400081",
  rera: "P51900008403",
  reraSite: "maharera.mahaonline.gov.in",
};

export const HERO_SLIDES_DESKTOP = [
  "/images/Slider-pg-1.jpg.jpeg",
  "/images/Slider-pg-2.jpg.jpeg",
];

export const HERO_SLIDES_MOBILE = [
  "/images/3.jpg-1mb.jpeg",
  "/images/2.jpg-1mb.jpeg",
];

export const OVERVIEW_STATS = [
  "G+39\nSTOREYS",
  "1 TOWER \n4 HOMES PER FLOOR",
  "1, 2 & 3 BHK\nCONFIGURATIONS",
  "CURATED LIFESTYLE\nAMENITIES",
];

export const ABOUT_PARAGRAPHS = [
  "Codename Crown is a new residential development in Mulund East, created for homebuyers who value space, privacy and everyday convenience. Located on 90ft Road, the project stands tall with thoughtfully planned 1, 2 & 3 BHK residences designed to make the most of every square foot. With only four residences on each floor, every home is planned to offer a more private living experience. Private balconies, open views and zero-wastage layouts add to the comfort of everyday life, while vastu-compliant planning brings greater harmony to your home.",
  "The development also features a curated selection of lifestyle amenities, including spaces for fitness, recreation, work and relaxation. From a double-height entrance lobby to rooftop experiences, Codename Crown is designed to offer more than just a home. Its strategic Mulund East location makes it an ideal choice for those looking for apartments in Mulund East or a well-connected new home in Mumbai.",
];

/** Icon keys map to the Font Awesome glyphs used by the original Elementor icon boxes. */
export const HIGHLIGHTS = [
  { title: "TALLEST ON THIS STRETCH", icon: "building" },
  { title: "GATED TOWER", icon: "toriiGate" },
  { title: "OPEN VIEWS", icon: "cloudSun" },
  { title: "SPACIOUS SUV PARKING", icon: "mapMarker" },
  { title: "VASTU-COMPLAINT HOMES", icon: "compass" },
  { title: "ZERO-WASTAGE LAYOUTS", icon: "rulerCombined" },
  { title: "DOUBLE- HEIGHT LOBBY", icon: "arrowsAltV" },
  { title: "EXCELLENT CONNECTIVITY", icon: "link" },
  { title: "PRIVATE BALCONIES", icon: "store" },
  { title: "15+ AMENITIES", icon: "swimmer" },
] as const;

export const AMENITIES = [
  { name: "EV Parking Stations", image: "/images/amenities/EV_Parking_Stations.jpeg" },
  { name: "Roof-Top Amphitheatre", image: "/images/amenities/Roof_Top_Amphitheatre.jpeg" },
  { name: "Indoor Games", image: "/images/amenities/Indoor_Games.jpeg" },
  { name: "Play Area", image: "/images/amenities/Play_Area.jpeg" },
  { name: "Open Gym", image: "/images/amenities/Outdoor_gym.jpeg" },
  { name: "Multi-Purpose Hall", image: "/images/amenities/Mult_Purpose_Hall.jpeg" },
  { name: "Sky Meditation Deck", image: "/images/amenities/Sky_Meditation_Deck.png" },
  { name: "Gymnasium", image: "/images/amenities/Gymnasium.png" },
  { name: "Co-Working Space", image: "/images/amenities/Co-Working Space.png" },
  { name: "Multi Purpose Court", image: "/images/amenities/Multi_Purpose_Court.jpeg" },
];

export const UTILITIES = [
  { title: "BRANDED MODULAR SWITCHES", icon: "table" },
  { title: "VIDEO DOOR PHONE", icon: "chalkboardTeacher" },
  { title: "LAMINATED FLUSH DOORS", icon: "doorOpen" },
  { title: "PREMIUM FITTINGS", icon: "toggleOn" },
  { title: "PREMIUM VITRIFIED TILE FLOORINGS", icon: "layerGroup" },
] as const;

export const CONFIGURATION_ROWS = [
  { category: "1BHK", carpet: "391 - 475", price: "₹0.95++ - ₹1.16++" },
  { category: "2BHK", carpet: "601 - 644", price: "₹1.45++ - ₹1.75++" },
  { category: "3BHK", carpet: "960", price: "₹2.25++ - ₹2.50++" },
];

export const UNIT_PLANS = {
  "1BHK": [
    { title: "1BHK — 391 sq.ft.", image: "/images/Unit_plans/1 BHK — 391 sq ft.png" },
    { title: "1BHK — 435.4 sq.ft.", image: "/images/Unit_plans/1 BHK — 435.4 sq ft.png" },
    { title: "1BHK — 475 sq.ft.", image: "/images/Unit_plans/1 BHK — 475 sq ft.png" },
  ],
  "2BHK": [
    { title: "2BHK — 601 sq.ft.", image: "/images/Unit_plans/2 BHK — 601 sq ft.png" },
    { title: "2BHK — 621 sq.ft.", image: "/images/Unit_plans/2 BHK — 621.5 sq ft.png" },
    { title: "2BHK — 641 sq.ft.", image: "/images/Unit_plans/2 BHK — 641 sq ft.png" },
    { title: "2BHK — 644 sq.ft.", image: "/images/Unit_plans/2 BHK — 644 sq ft.png" },
  ],
  "3BHK": [
    { title: "3BHK — 960 sq.ft.", image: "/images/Unit_plans/3 BHK — 960 sq ft.png" },
  ],
};

export const CONNECTIVITY = [
  {
    title: "Transit & Highway",
    items: [
      ["Eastern Express Highway (EEH)", "— 3 mins"],
      ["Upcoming Eastern Freeway Extension", "— 3 mins"],
      ["Mulund Toll Naka", "— 3 mins"],
      ["Mulund Railway Station (East Entry)", "— 3 to 4 mins"],
      ["Goregaon–Mulund Link Road", "— 6 to 7 min"],
      ["Nahur Railway Station", "— 7 to 8 mins"],
      ["Upcoming Metro line 4", "— 15 to 20 mins"],
    ],
  },
  {
    title: "Schools & Colleges",
    items: [
      ["Bombay Presidency International School", "— 2 mins"],
      ["Sou. Laxmibai English School &Jr. College", "— 4 mins"],
      ["V.G.Vaze College of Arts, Science & Commerce", "— 4 mins"],
      ["Nalanda School", "— 5 mins"],
      ["ITI Mulund School", "— 7 mins"],
      ["Daffodils Play School", "— 7 mins"],
      ["IES School", "— 8 mins"],
    ],
  },
  {
    title: "Healthcare Facilities",
    items: [
      ["Galaxy Super Speciality Hospital", "— 2 mins"],
      ["Saidham Hospital", "— 2 mins"],
      ["Orthomax Speciality Hospital", "— 3 mins"],
      ["Fortis Hospital, Mulund", "— 8 to 10 mins"],
      ["Upasani Super Speciality Hospital", "— 9 mins"],
    ],
  },
  {
    title: "Shopping & Entertainment",
    items: [
      ["Campus Hotel", "— 1 min"],
      ["Hanuman Chowk Market", "— 1 to 2 mins"],
      ["Maratha Mandal Hall", "— 1 to 2 mins"],
      ["Sambhaji Park / Deshmukh Garden", "— 2 to 3 mins"],
      ["NY Cinemas, Mulund", "— 3 mins"],
      ["R Galleria Mall", "— 5 mins"],
      ["Dmart", "— 6 mins"],
    ],
  },
];

export const DISCLAIMER =
  "Disclaimer: The information, images, visuals, specifications, plans, amenities, and facilities mentioned in this brochure are purely indicative and for illustrative purposes only. They do not constitute a legal offer, agreement, or contract of any nature. All layouts, dimensions, elevations, and specifications are subject to change, modification, or revision as may be required by the developer, architects, or relevant authorities. The developer reserves the right to make such changes without prior notice. The furniture, fixtures, landscaping, and surrounding environment shown in the visuals are artistic impressions and may not represent the exact final product. Prospective buyers are advised to verify all details, specifications, approvals, and documentation independently before making any purchase decision. This brochure is not a legally binding document.";

export const TERMS = {
  title: "Terms & Conditions",
  intro:
    "By accessing this website and submitting any form, you agree to the following terms:",
  points: [
    "This website is intended to provide information about our residential project(s) and to facilitate user inquiries.",
    "Submission of any form does not constitute a booking, allotment, or legal agreement for any property.",
    "All project details, including layouts, pricing, availability, and specifications, are subject to change without prior notice.",
    "Images, visuals, and content displayed are for representational purposes only and may differ from actual deliverables.",
    "By submitting your details, you authorize us and our representatives to contact you via call, SMS, email, or WhatsApp.",
    "We are not liable for any errors, omissions, or inaccuracies in the website content.",
    "Use of this website is governed by the applicable laws of India, and any disputes shall fall under the jurisdiction of the project location courts.",
  ],
  outro: "",
};

export const PRIVACY = {
  title: "PRIVACY POLICY",
  intro:
    "We are committed to safeguarding your privacy and ensuring the security of your personal information.",
  points: [
    "Information We Collect: We may collect your name, phone number, email address, and any details you submit through our website forms.",
    "Purpose of Use: The information is used to contact you regarding the residential project, provide updates, respond to queries, and share relevant marketing information.",
    "Consent: By submitting your details, you consent to being contacted via phone call, SMS, email, or messaging services such as WhatsApp.",
    "Data Sharing: Your personal information is not sold or rented. It may be shared with authorized representatives or marketing partners solely for project-related communication.",
    "Data Protection: We implement reasonable security measures to protect your data from unauthorized access, misuse, or disclosure.",
    "Your Choice: You may request access, correction, or deletion of your data by contacting us through the provided contact details.",
  ],
  outro: "By using this website, you agree to the terms outlined in this Privacy Policy.",
};

export const SOCIAL = {
  facebook:
    "https://m.facebook.com/profile.php?id=1292797677243200&ref=pl_edit_xav_ig_profile_page",
  instagram: "https://www.instagram.com/codename_crown",
  youtube: "https://www.youtube.com/@CodenameCrown2026",
};

/** Prefilled WhatsApp message, matching the original's deep link. */
export const WHATSAPP_TEXT = encodeURIComponent(
  "Hi, I'm interested in your project. I'd like to know more about the pricing and availability."
);
