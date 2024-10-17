export const productsReportsTitles = [
  { title: "Total fertilizers in product list", key: "fertilizerCount" },
  { title: "Total pesticides in product list", key: "pesticideCount" },
  { title: "Total crop nutrients in product list", key: "nutrientsCount" },
];

export const franchiseReports = [
  { title: "Total Franchises", value: 40 },
  { title: "Activated Franchises", value: 12 },
  { title: "In-Active Franchises", value: 18 },
];

export const productCategory = [
  { value: "fertilizer", label: "Fertilizer" },
  { value: "pesticide", label: "Pesticide" },
  { value: "crop_nuetiration", label: "Crop Nuetiration" },
];

export const activeIngredients = [
  { value: "fertilizer", label: "Fertilizer" },
  { value: "pesticides", label: "Pesticides" },
];

export const units = [
  { value: "kg", label: "Kg" },
  { value: "ml", label: "Ml" },
];

export const bulkFranchiseAddresses = [
  { label: "Manager", value: "Ahmad Raza" },
  { label: "Address", value: "Shop #1, BG-5, Mid city apartments" },
  { label: "District", value: "Rawalpindi" },
  { label: "Tehsil", value: "Rawalpindi" },
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

//franchise
export const franchiseData: Franchise[] = [
  {
    id: 1,
    managerName: "Wireless Headphones",
    franchiseName: "Wireless Headphones",
    phoneNo: "0310-000 0000",
    address: "Shop #1, BG-5, Mid city apartments",
    province: "Punjab",
    district: "Kohat",
    tehsil: "Audio Devices",
    remainingDays: 23,
    active: false,
  },
  {
    id: 2,
    managerName: "4K Smart TV",
    franchiseName: "Wireless Headphones",
    phoneNo: "0310-000 0000",
    address: "Shop #1, BG-5, Mid city apartments",
    province: "Punjab",
    district: "Kohat",
    tehsil: "Televisions",
    remainingDays: 55,
    active: true,
  },
  {
    id: 3,
    managerName: "Running Shoes",
    franchiseName: "Wireless Headphones",
    phoneNo: "0310-000 0000",
    address: "Shop #1, BG-5, Mid city apartments",
    province: "Punjab",
    district: "Kohat",
    tehsil: "Sports Shoes",
    remainingDays: 11,
    active: false,
  },
  {
    id: 4,
    managerName: "Gaming Laptop",
    franchiseName: "Wireless Headphones",
    phoneNo: "0310-000 0000",
    address: "Shop #1, BG-5, Mid city apartments",
    province: "Punjab",
    district: "Kohat",
    tehsil: "Laptops",
    remainingDays: 76,
    active: true,
  },
  {
    id: 5,
    managerName: "Smartwatch",
    franchiseName: "Wireless Headphones",
    phoneNo: "0310-000 0000",
    address: "Shop #1, BG-5, Mid city apartments",
    province: "Punjab",
    district: "Kohat",
    tehsil: "Smart Devices",
    remainingDays: 23,
    active: true,
  },
];

//suggestions
export const suggestionsData: Suggestions[] = [
  {
    id: 1,
    date: "2024-09-01",
    query:
      "There is an active ingredient name Nitrogen that is missingin the select active ingredient list.",
    response:
      " Your active ingredient is successfully added in the global list.",
  },
  {
    id: 2,
    date: "2024-09-01",
    query:
      " There is an active ingredient name Nitrogen that is missingin the select active ingredient list.",
    response:
      " Your active ingredient is successfully added in the global list.",
  },
  {
    id: 3,
    date: "2024-09-01",
    query:
      " There is an active ingredient name Nitrogen that is missingin the select active ingredient list.",
    response:
      " Your active ingredient is successfully added in the global list.",
  },
  {
    id: 4,
    date: "2024-09-01",
    query:
      " There is an active ingredient name Nitrogen that is missingin the select active ingredient list.",
    response:
      " Your active ingredient is successfully added in the global list.",
  },
  {
    id: 5,
    date: "2024-09-01",
    query:
      " There is an active ingredient name Nitrogen that is missingin the select active ingredient list.",
    response:
      " Your active ingredient is successfully added in the global list.",
  },
];
