import * as z from "zod";
import { validatePhoneNo } from "./validate";

const createAccountFormSchema = z.object({
  compnayName: z.string().nonempty({
    message: "Company Name is required.",
  }),
  email: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email({
      message: "Invalid email.",
    }),
  phoneNo: validatePhoneNo(
    z.string().nonempty({
      message: "Phone is required.",
    })
  ),
  ntn: z.string().nonempty({
    message: "NTN is required.",
  }),
  password: z.string().nonempty({
    message: "Password is required.",
  }),
  confirmPassword: z.string().nonempty({
    message: "Confirm Password is required.",
  }),
});

const loginAccountFormSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email({
      message: "Invalid email.",
    }),
  password: z.string().nonempty({
    message: "Password is required.",
  }),
});

const addProductFormSchema = z.object({
  productName: z.string().nonempty({
    message: "Product Name is required.",
  }),
  brandName: z.string().nonempty({
    message: "Brand Name is required.",
  }),
  category: z.string().nonempty({
    message: "Category is required.",
  }),
  subCategory: z.string().nonempty({
    message: "Subcategory is required.",
  }),
  activeIngredient: z.string().nonempty({
    message: "ActiveIngredient is required.",
  }),
  concentration: z.string().nonempty({
    message: "Concentration is required.",
  }),
  units: z.string().nonempty({
    message: "Unit is required.",
  }),
  packageWeight: z.string().nonempty({
    message: "Package weight is required.",
  }),
  weightUnit: z.string().nonempty({
    message: "Weight Unit is required.",
  }),
  packagingType: z.string().nonempty({
    message: "Packaging Type is required.",
  }),
  areaCovered: z.string().nonempty({
    message: "Covered area is required.",
  }),
  disease: z.string().nonempty({
    message: "Packaging Type is required.",
  }),
  description: z.string().nonempty({
    message: "Packaging Type is required.",
  }),
});

const searchProductsFormSchema = z.object({
  category: z.string().nonempty({
    message: "Category is required.",
  }),
  subCategory: z.string().nonempty({
    message: "Subcategory is required.",
  }),
});

//seed
const addSeedFormSchema = z.object({
  varietyName: z.string().nonempty({
    message: "Variety Name is required.",
  }),
  brandName: z.string().nonempty({
    message: "Brand Name is required.",
  }),
  category: z.string().nonempty({
    message: "Category is required.",
  }),
  crop: z.string().nonempty({
    message: "Crop is required.",
  }),
  seedWeight: z.string().nonempty({
    message: "Seed weight is required.",
  }),
  packageWeight: z.string().nonempty({
    message: "Package weight is required.",
  }),
  germinationPercentage: z.string().nonempty({
    message: "Germination Percentage is required.",
  }),
  maturityPercentage: z.string().nonempty({
    message: "Maturity Percentage is required.",
  }),
  minHarvestingDays: z.string().nonempty({
    message: "Min Harvesting Days is required.",
  }),
  maxHavestingDays: z.string().nonempty({
    message: "Max Harvesting Days is required.",
  }),
  suitableRegion: z.string().nonempty({
    message: "Suitable Region is required.",
  }),
  packageType: z.string().nonempty({
    message: "Packaging Type is required.",
  }),
  description: z.string().nonempty({
    message: "Description is required.",
  }),
});

// filter seed
const filterSeedFormSchema = z.object({
  category: z.string().nonempty({
    message: "Category is required.",
  }),
  crop: z.string().nonempty({
    message: "Crop is required.",
  }),
});

// add franchise
const addFranchiseFormSchema = z.object({
  managerName: z.string().nonempty({
    message: "Manager Name is required.",
  }),
  phoneNo: validatePhoneNo(
    z.string().nonempty({
      message: "Phone is required.",
    })
  ),
  address: z.string().nonempty({
    message: "Address is required.",
  }),
  province: z.string().nonempty({
    message: "Select Province",
  }),
  district: z.string().nonempty({
    message: "Select District",
  }),
  tehsil: z.string().nonempty({
    message: "Select Tehil",
  }),
});

// filter franchice
const filterFranchiceFormSchema = z.object({
  province: z.string().nonempty({
    message: "Select Province",
  }),
  district: z.string().nonempty({
    message: "Select District",
  }),
  tehsil: z.string().nonempty({
    message: "Select Tehil",
  }),
});

const addQueryFormSchema = z.object({
  contactEmail: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email({
      message: "Invalid email.",
    }),
  query: z.string().nonempty({
    message: "Please enter query",
  }),
});

const queryResponseSchema = z.object({
  query: z.string().nonempty({
    message: "Please enter query",
  }),
  response: z.string().nonempty({
    message: "Please enter query",
  }),
});

export {
  createAccountFormSchema,
  loginAccountFormSchema,
  addProductFormSchema,
  searchProductsFormSchema,
  addSeedFormSchema,
  filterSeedFormSchema,
  addFranchiseFormSchema,
  filterFranchiceFormSchema,
  addQueryFormSchema,
  queryResponseSchema,
};
