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
    contact: z.string({
      required_error: "Phone number is required.",
    }),
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
  name: z.string().nonempty({ message: "Product Name is required." }),
  company_fk: z.string().nonempty({ message: "Brand Name is required." }),
  category: z.string().nonempty({ message: "Category is required." }),
  sub_category: z.string().nonempty({ message: "Subcategory is required." }),
  active_ingredients: z
    .string()
    .nonempty({ message: "ActiveIngredient is required." }),
  type: z.string().nonempty({ message: "ActiveIngredient is required." }),
  concentration: z.string().nonempty({ message: "Concentration is required." }),
  units: z.string().nonempty({ message: "Unit is required." }),
  package_weight: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Package weight is required.",
    }),
  weight_unit: z.string().nonempty({ message: "Weight Unit is required." }),
  package_type: z.string().nonempty({ message: "Packaging Type is required." }),
  area_covered: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Area covered is required.",
    }),
  disease_purpose: z.string().nonempty({ message: "Disease is required." }),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Price is required.",
    }),
  description: z.string().nonempty({ message: "Packaging Type is required." }),
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
  seed_variety_name: z
    .string()
    .nonempty({ message: "Variety Name is required." }),
  company_fk: z.string().nonempty({ message: "Brand Name is required." }),
  crop_category: z.string().nonempty({ message: "Category is required." }),
  crop: z.string().nonempty({ message: "Crop is required." }),
  seed_weight: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Seed weight is required.",
    }),
  package_weight: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Package weight is required.",
    }),
  germination_percentage: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Germination Percentage is required.",
    }),
  maturity_percentage: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Maturity Percentage is required.",
    }),
  min_harvesting_days: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Min Harvesting Days is required.",
    }),
  max_harvesting_days: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Max Harvesting Days is required.",
    }),
  suitable_region: z
    .string()
    .nonempty({ message: "Suitable Region is required." }),
  package_type: z.string().nonempty({ message: "Packaging Type is required." }),
  height_class: z.string().nonempty({ message: "Height Class is required." }),
  nutrient_content: z.string().optional(),
  Common_disease_tolerance: z.string().optional(),
  environmental_resilience_factors: z.string().optional(),
  Unique_features: z.string().optional(),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", { message: "Price is required." }),
  description: z.string().nonempty({ message: "Description is required." }),
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
  full_name: z.string().nonempty({
    message: "Manager Name is required.",
  }),
  franchise_name: z.string().nonempty({
    message: "Franchise Name is required.",
  }),
  contact: z.string().optional(),
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
  managerUuid: z.string().optional(),
});

// add manager
const addManagerFormSchema = z.object({
  full_name: z.string().nonempty({
    message: "Manager Name is required.",
  }),
  contact: z.string({
    required_error: "Phone number is required.",
  }),
});

// add seed trail data
const addTrailDataFormSchema = z.object({
  variety: z.string().nonempty({
    message: "Variety is required.",
  }),
  sowingDate: z.string().nonempty({
    message: "sowing Date is required.",
  }),
  city: z.string().nonempty({
    message: "City is required.",
  }),
  tehsil: z.string().nonempty({
    message: "Tehsil is required.",
  }),
  min_irrigation: z.string().nonempty({
    message: "Min irrigation is required.",
  }),
  max_irrigation: z.string().nonempty({
    message: "Max irrigation is required.",
  }),
  yield_percentage: z.string().nonempty({
    message: "yield percentage is required.",
  }),
  start_day: z.string().nonempty({
    message: "start day is required.",
  }),
  end_day: z.string().nonempty({
    message: "end day is required.",
  }),
  kc: z.string().nonempty({
    message: "kc is required.",
  }),
});

const addCropSelectionFormSchema = z.object({
  crop: z.string().nonempty({
    message: "Crop is required.",
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
  query: z.string().nonempty({
    message: "Please enter query",
  }),
});

const queryResponseSchema = z.object({
  query: z.string().optional(),
});

//user
const profileFormSchema = z.object({
  companyName: z.string(),
  contact: z.string({
    required_error: "Phone number is required.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  ntn: z.string(),
});

// payment
const addPaymentFormSchema = z.object({
  phone: z.string({
    required_error: "Phone number is required.",
  }),
  cnic_last6: z.string().nonempty({
    message: "Enter CNIC last 6 digits",
  }),
});

export {
  createAccountFormSchema,
  loginAccountFormSchema,
  emailSchema,
  otpSchema,
  resetPasswordSchema,
  addCropSelectionFormSchema,
  addTrailDataFormSchema,
  addProductFormSchema,
  filterProductsFormSchema,
  addSeedFormSchema,
  addPaymentFormSchema,
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
