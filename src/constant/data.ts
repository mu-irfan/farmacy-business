export const productsReports = [
  { title: "Total fertilizers in product list", value: 40 },
  { title: "Total pesticides in product list", value: 12 },
  { title: "Total crop nutitions in product list", value: 18 },
];

export const productCategory = [
  { value: "province", label: "Province" },
  { value: "district", label: "District" },
  { value: "tehsil", label: "Tehsil" },
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
    packageWeight: "1",
    weightUnit: "kg",
    packagingType: "Bag",
    areaCovered: "5",
    disease: "Pest control, Nutrient deficiency",
    description: "A highly effective organic fertilizer for various plants.",
    images: [], // add image files here when selected
  },
  {
    productName: "Plant Shield",
    brandName: "AgriTech",
    category: "Pesticides",
    subCategory: "Insecticides",
    packageWeight: "500",
    weightUnit: "g",
    packagingType: "Bottle",
    areaCovered: "2",
    disease: "Insect infestation",
    description: "Protect your crops from harmful insects with Plant Shield.",
    images: [],
  },
  {
    productName: "Root Booster",
    brandName: "GrowWell",
    category: "Fertilizers",
    subCategory: "Liquid",
    packageWeight: "1",
    weightUnit: "l",
    packagingType: "Bottle",
    areaCovered: "3",
    disease: "Nutrient deficiency",
    description: "Enhances root development and overall plant health.",
    images: [],
  },
  {
    productName: "Weed Killer",
    brandName: "WeedAway",
    category: "Herbicides",
    subCategory: "Selective",
    packageWeight: "250",
    weightUnit: "g",
    packagingType: "Spray",
    areaCovered: "4",
    disease: "Weed control",
    description:
      "Effective solution for controlling weeds without harming crops.",
    images: [],
  },
  {
    productName: "Disease Defense",
    brandName: "CropGuard",
    category: "Fungicides",
    subCategory: "Broad spectrum",
    packageWeight: "500",
    weightUnit: "g",
    packagingType: "Packet",
    areaCovered: "1",
    disease: "Fungal diseases",
    description: "A powerful fungicide for protecting crops from diseases.",
    images: [],
  },
];

//seeds
export const seedsData: Seed[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    category: "Electronics",
    brand: "SoundPro",
    crop: "Audio Devices",
  },
  {
    id: 2,
    name: "4K Smart TV",
    price: 600,
    category: "Electronics",
    brand: "VisionTech",
    crop: "Televisions",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 80,
    category: "Footwear",
    brand: "FitTrack",
    crop: "Sports Shoes",
  },
  {
    id: 4,
    name: "Gaming Laptop",
    price: 1200,
    category: "Computers",
    brand: "PowerCore",
    crop: "Laptops",
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 200,
    category: "Wearables",
    brand: "TimeMaster",
    crop: "Smart Devices",
  },
];

//franchise
export const franchiseData: Franchise[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    contact: "Electronics",
    address: "SoundPro",
    tehsil: "Audio Devices",
  },
  {
    id: 2,
    name: "4K Smart TV",
    contact: "Electronics",
    address: "VisionTech",
    tehsil: "Televisions",
  },
  {
    id: 3,
    name: "Running Shoes",
    contact: "Footwear",
    address: "FitTrack",
    tehsil: "Sports Shoes",
  },
  {
    id: 4,
    name: "Gaming Laptop",
    contact: "Computers",
    address: "PowerCore",
    tehsil: "Laptops",
  },
  {
    id: 5,
    name: "Smartwatch",
    contact: "Wearables",
    address: "TimeMaster",
    tehsil: "Smart Devices",
  },
];

//suggestions
export const suggestionsData: Suggestions[] = [
  {
    id: 1,
    date: "2024-09-01",
    query: "Electronics",
    response: "SoundPro",
  },
  {
    id: 2,
    date: "2024-09-02",
    query: "Electronics",
    response: "SoundPro",
  },
  {
    id: 3,
    date: "2024-09-03",
    query: "Electronics",
    response: "SoundPro",
  },
  {
    id: 4,
    date: "2024-09-04",
    query: "Electronics",
    response: "SoundPro",
  },
  {
    id: 5,
    date: "2024-09-05",
    query: "Electronics",
    response: "SoundPro",
  },
  {
    id: 6,
    date: "2024-09-06",
    query: "Electronics",
    response: "SoundPro",
  },
];
