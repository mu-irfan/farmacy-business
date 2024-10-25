export const productsReportsTitles = [
  { title: "Total fertilizers in product list", key: "fertilizerCount" },
  { title: "Total pesticides in product list", key: "pesticideCount" },
  { title: "Total crop nutrients in product list", key: "nutrientsCount" },
];

export const franchiseReports = [
  { title: "Total Franchises", key: "totalFranchises" },
  { title: "Activated Franchises", key: "activeFranchises" },
  { title: "In-Active Franchises", key: "inactiveFranchises" },
];

export const productCategory = [
  { value: "fertilizer", label: "Fertilizer" },
  { value: "pesticide", label: "Pesticide" },
  { value: "crop_nutrition", label: "Crop Nutrition" },
];

export const suitahleRegion = [
  { value: "irrigated", label: "Irrigated" },
  { value: "rainfed", label: "Rainfed" },
  { value: "drought", label: "Drought" },
];

export const productsList = {
  fertilizer: [
    "Anti Stress Fertilizers",
    "Basic Fertilizers",
    "Bio Fertilizers (Organic Fertilizers)",
    "Growth Stimulaters",
    "Imported Fertilizers",
    "Liquid Fertilizers",
    "Organic Fertilizers",
    "Soil Conditioners",
  ],
  pesticide: [
    "Adjuvants",
    "Fumigants",
    "Fungicides",
    "Fungicides And Bactericides",
    "Granules Insecticides (Poisions)",
    "Herbicides / Weedicides",
    "Insecticides",
    "Seed Treatments",
  ],
  crop_nutrition: [
    "Amino Acids",
    "Gibberellic Acids",
    "Micronutrients",
    "PGPR's (Plant Growth-Promoting Rhizobacteria)",
    "Plant Growth Regulaters",
  ],
};

export const productType = [
  { value: "bio", label: "Bio" },
  { value: "chemical", label: "Chemical" },
];

export const activeIngredients = [
  { value: "fertilizer", label: "Fertilizer" },
  { value: "pesticides", label: "Pesticides" },
];

export const units = [
  { value: "kg", label: "Kg" },
  { value: "ml", label: "Ml" },
];

export const bulkFranchiseAddressDetails = [
  { label: "Manager", value: "Ahmad Raza" },
  { label: "Contact", value: "0310-000 0000" },
  { label: "Address", value: "Shop #1, BG-5, Mid city apartments" },
  { label: "Province", value: "Punjab" },
  { label: "District", value: "Rawalpindi" },
  { label: "Tehsil", value: "Rawalpindi" },
  { label: "Active", value: "False" },
];

// product
export const productData: Product[] = [
  {
    name: "Super Plant Growth",
    company_fk: "Sygenta",
    category: "Fertilizers",
    sub_category: "Organic",
    activeIngredient: "Fertilizers",
    concentration: "John",
    units: "kg",
    subscribed: false,
    packageWeight: "1",
    weightUnit: "kg",
    packagingType: "Bag",
    areaCovered: "5",
    disease: "Pest control, Nutrient deficiency",
    price: "2300",
    description: "A highly effective organic fertilizer for various plants.",
    images: [], // add image files here when selected
  },
  {
    name: "Plant Shield",
    company_fk: "AgriTech",
    category: "Pesticides",
    sub_category: "Insecticides",
    activeIngredient: "Fertilizers",
    concentration: "John",
    units: "kg",
    subscribed: true,
    packageWeight: "500",
    weightUnit: "g",
    packagingType: "Bottle",
    areaCovered: "2",
    disease: "Insect infestation",
    price: "2300",
    description: "Protect your crops from harmful insects with Plant Shield.",
    images: [],
  },
  {
    name: "Root Booster",
    company_fk: "GrowWell",
    category: "Fertilizers",
    sub_category: "Liquid",
    activeIngredient: "Fertilizers",
    concentration: "John",
    units: "kg",
    subscribed: false,
    packageWeight: "1",
    weightUnit: "l",
    packagingType: "Bottle",
    areaCovered: "3",
    disease: "Nutrient deficiency",
    price: "2300",
    description: "Enhances root development and overall plant health.",
    images: [],
  },
];

//seeds
export const seedsData: Seed[] = [
  {
    id: 1,
    seed_variety_name: "Disease",
    company_fk: "SoundPro",
    crop_category: "Electronics",
    crop: "Audio Devices",
    subscribed: false,
    seedWeight: "250g",
    packageWeight: "1kg",
    germination_percentage: "95%",
    maturity_percentage: "85%",
    minHarvestingDays: 30,
    maxHavestingDays: 60,
    suitable_region: "Global",
    package_type: "Box",
    price: "750",
    description: "High-quality wireless headphones.",
  },
  {
    id: 2,
    seed_variety_name: "Disease",
    company_fk: "VisionTech",
    crop_category: "Electronics",
    crop: "Televisions",
    subscribed: true,
    seedWeight: "10kg",
    packageWeight: "15kg",
    germination_percentage: "90%",
    maturity_percentage: "80%",
    minHarvestingDays: 40,
    maxHavestingDays: 75,
    suitable_region: "Global",
    package_type: "Box",
    price: "750",
    description: "Ultra HD 4K Smart TV with built-in apps.",
  },
  {
    id: 3,
    seed_variety_name: "Disease",
    company_fk: "FitTrack",
    crop_category: "Footwear",
    crop: "Sports Shoes",
    subscribed: false,
    seedWeight: "500g",
    packageWeight: "1.5kg",
    germination_percentage: "98%",
    maturity_percentage: "90%",
    minHarvestingDays: 20,
    maxHavestingDays: 40,
    suitable_region: "Global",
    package_type: "Box",
    price: "750",
    description: "Lightweight running shoes designed for comfort.",
  },
  {
    id: 4,
    seed_variety_name: "Disease",
    company_fk: "PowerCore",
    crop_category: "Computers",
    crop: "Laptops",
    subscribed: false,
    seedWeight: "3kg",
    packageWeight: "5kg",
    germination_percentage: "92%",
    maturity_percentage: "85%",
    minHarvestingDays: 60,
    maxHavestingDays: 90,
    suitable_region: "Global",
    package_type: "Box",
    price: "750",
    description: "High-performance gaming laptop with advanced graphics.",
  },
  {
    id: 5,
    seed_variety_name: "Disease",
    company_fk: "TimeMaster",
    crop_category: "Wearables",
    crop: "Smart Devices",
    subscribed: true,
    seedWeight: "150g",
    packageWeight: "500g",
    germination_percentage: "96%",
    maturity_percentage: "90%",
    minHarvestingDays: 10,
    maxHavestingDays: 30,
    suitable_region: "Global",
    package_type: "Box",
    price: "750",
    description: "Advanced smartwatch with fitness tracking features.",
  },
];

export const ManagersData: Manager[] = [
  {
    id: 1,
    full_name: "Inam Ullah",
    contact: "03334859488",
  },
  {
    id: 2,
    full_name: "Irfan",
    contact: "03334859485",
  },
  {
    id: 3,
    full_name: "Noman",
    contact: "03334859485",
  },
  {
    id: 4,
    full_name: "Khan",
    contact: "03334859485",
  },
  {
    id: 4,
    full_name: "Khans",
    contact: "03334859489",
  },
];
