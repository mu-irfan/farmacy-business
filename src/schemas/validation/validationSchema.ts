import * as z from "zod";
import { validatePhoneNo } from "./validate";

const createAccountFormSchema = z
  .object({
    companyName: z.string().nonempty({
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
    contact: validatePhoneNo(
      z.string().nonempty({
        message: "Phone is required.",
      })
    ),
    ntn: z.string().nonempty({
      message: "NTN is required.",
    }),
    password: z
      .string()
      .nonempty({
        message: "Password is required.",
      })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one numeric digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .nonempty({
        message: "Confirm Password is required.",
      })
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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
  password: z
    .string()
    .nonempty({
      message: "Password is required.",
    })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one numeric digit")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Invalid email." }),
});

const otpSchema = z.object({
  email: z.string(),
  otp: z
    .string()
    .nonempty({ message: "OTP is required." })
    .length(6, "OTP must be exactly 6 digits"),
});

const resetPasswordSchema = z
  .object({
    email: z.string(),
    newPassword: z
      .string()
      .nonempty({ message: "Please enter your new password" })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one numeric digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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
    message: "Disease is required.",
  }),
  price: z.string().nonempty({
    message: "Disease is required.",
  }),
  description: z.string().nonempty({
    message: "Packaging Type is required.",
  }),
});

const filterProductsFormSchema = z.object({
  category: z.string().nonempty({
    message: "Category is required.",
  }),
  allSubCategories: z.string().nonempty({
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
  price: z.string().nonempty({
    message: "Price is required.",
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

// add seed trial data

//seed
const addSeedTrailDataFormSchema = z.object({
  sowingDate: z.string().nonempty({
    message: "Sowing Date is required.",
  }),
  city: z.string().nonempty({
    message: "City is required.",
  }),
  category: z.string().nonempty({
    message: "Category is required.",
  }),
  crop: z.string().nonempty({
    message: "Crop is required.",
  }),
});

// filter subscribed product
const filterSubscribedProduct = z.object({
  category: z.string().nonempty({
    message: "Category is required.",
  }),
  subCategory: z.string().nonempty({
    message: "Sub category is required.",
  }),
  subscribed: z.string().nonempty({
    message: "Subscribe is required.",
  }),
});

// add franchise
const addFranchiseFormSchema = z.object({
  managerName: z.string().nonempty({
    message: "Manager Name is required.",
  }),
  franchiseName: z.string().nonempty({
    message: "Franchise Name is required.",
  }),
  phoneNo: z.string().optional(),
  address: z.string().nonempty({
    message: "Address is required.",
  }),
  remainingDays: z.string().nonempty({
    message: "Remaining Days is required.",
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

// add manager
const addManagerFormSchema = z.object({
  full_name: z.string().nonempty({
    message: "Manager Name is required.",
  }),
  contact: validatePhoneNo(
    z.string().nonempty({
      message: "Phone is required.",
    })
  ),
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
  query: z.string().nonempty({
    message: "Please enter query",
  }),
});

const queryResponseSchema = z.object({
  query: z.string().optional(),
  response: z.string().optional(),
});

//user
const profileFormSchema = z.object({
  companyName: z.string(),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

export {
  createAccountFormSchema,
  loginAccountFormSchema,
  emailSchema,
  otpSchema,
  resetPasswordSchema,
  addProductFormSchema,
  filterProductsFormSchema,
  addSeedFormSchema,
  filterSeedFormSchema,
  filterSubscribedProduct,
  addFranchiseFormSchema,
  filterFranchiceFormSchema,
  addSeedTrailDataFormSchema,
  addQueryFormSchema,
  queryResponseSchema,
  addManagerFormSchema,
  profileFormSchema,
};
