export const productsReports = [
  { title: "Total fertilizers in product list", value: 40 },
  { title: "Total pesticides in product list", value: 12 },
  { title: "Total crop nutitions in product list", value: 18 },
];

export const franchiseReports = [
  { title: "Total Franchises", value: 40 },
  { title: "Activated Franchises", value: 12 },
  { title: "In-Active Franchises", value: 18 },
];

export const productCategory = [
  { value: "province", label: "Province" },
  { value: "district", label: "District" },
  { value: "tehsil", label: "Tehsil" },
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
    productName: "Super Plant Growth",
    brandName: "Sygenta",
    category: "Fertilizers",
    subCategory: "Organic",
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
    productName: "Plant Shield",
    brandName: "AgriTech",
    category: "Pesticides",
    subCategory: "Insecticides",
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
    productName: "Root Booster",
    brandName: "GrowWell",
    category: "Fertilizers",
    subCategory: "Liquid",
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
  {
    productName: "Weed Killer",
    brandName: "WeedAway",
    category: "Herbicides",
    subCategory: "Selective",
    activeIngredient: "Fertilizers",
    concentration: "John",
    units: "kg",
    subscribed: true,
    packageWeight: "250",
    weightUnit: "g",
    packagingType: "Spray",
    areaCovered: "4",
    disease: "Weed control",
    price: "2300",
    description:
      "Effective solution for controlling weeds without harming crops.",
    images: [],
  },
  {
    productName: "Disease Defense",
    brandName: "CropGuard",
    category: "Fungicides",
    subCategory: "Broad spectrum",
    activeIngredient: "Fertilizers",
    concentration: "John",
    units: "kg",
    subscribed: false,
    packageWeight: "500",
    weightUnit: "g",
    packagingType: "Packet",
    areaCovered: "1",
    disease: "Fungal diseases",
    price: "2300",
    description: "A powerful fungicide for protecting crops from diseases.",
    images: [],
  },
];

//seeds
export const seedsData: Seed[] = [
  {
    id: 1,
    varietyName: "Disease",
    brandName: "SoundPro",
    category: "Electronics",
    crop: "Audio Devices",
    subscribed: false,
    seedWeight: "250g",
    packageWeight: "1kg",
    germinationPercentage: "95%",
    maturityPercentage: "85%",
    minHarvestingDays: 30,
    maxHavestingDays: 60,
    suitableRegion: "Global",
    packageType: "Box",
    price: "750",
    description: "High-quality wireless headphones.",
  },
  {
    id: 2,
    varietyName: "Disease",
    brandName: "VisionTech",
    category: "Electronics",
    crop: "Televisions",
    subscribed: true,
    seedWeight: "10kg",
    packageWeight: "15kg",
    germinationPercentage: "90%",
    maturityPercentage: "80%",
    minHarvestingDays: 40,
    maxHavestingDays: 75,
    suitableRegion: "Global",
    packageType: "Box",
    price: "750",
    description: "Ultra HD 4K Smart TV with built-in apps.",
  },
  {
    id: 3,
    varietyName: "Disease",
    brandName: "FitTrack",
    category: "Footwear",
    crop: "Sports Shoes",
    subscribed: false,
    seedWeight: "500g",
    packageWeight: "1.5kg",
    germinationPercentage: "98%",
    maturityPercentage: "90%",
    minHarvestingDays: 20,
    maxHavestingDays: 40,
    suitableRegion: "Global",
    packageType: "Box",
    price: "750",
    description: "Lightweight running shoes designed for comfort.",
  },
  {
    id: 4,
    varietyName: "Disease",
    brandName: "PowerCore",
    category: "Computers",
    crop: "Laptops",
    subscribed: false,
    seedWeight: "3kg",
    packageWeight: "5kg",
    germinationPercentage: "92%",
    maturityPercentage: "85%",
    minHarvestingDays: 60,
    maxHavestingDays: 90,
    suitableRegion: "Global",
    packageType: "Box",
    price: "750",
    description: "High-performance gaming laptop with advanced graphics.",
  },
  {
    id: 5,
    varietyName: "Disease",
    brandName: "TimeMaster",
    category: "Wearables",
    crop: "Smart Devices",
    subscribed: true,
    seedWeight: "150g",
    packageWeight: "500g",
    germinationPercentage: "96%",
    maturityPercentage: "90%",
    minHarvestingDays: 10,
    maxHavestingDays: 30,
    suitableRegion: "Global",
    packageType: "Box",
    price: "750",
    description: "Advanced smartwatch with fitness tracking features.",
  },
];

export const ManagersData: Manager[] = [
  {
    id: 1,
    managerName: "Inam Ullah",
    phoneNo: "03334859485",
  },
  {
    id: 2,
    managerName: "Inam Ullah",
    phoneNo: "03334859485",
  },
  {
    id: 3,
    managerName: "Inam Ullah",
    phoneNo: "03334859485",
  },
  {
    id: 4,
    managerName: "Inam Ullah",
    phoneNo: "03334859485",
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
