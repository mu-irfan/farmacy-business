type Link = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

interface ReduxProviderProps {
  children: React.ReactNode;
}

interface ExampleState {
  value: number;
}

type ReportCardProps = {
  title: string;
  value: number;
};

//table
interface DataTableProps<T extends object> {
  columns: Array<{
    Header: string;
    accessor: keyof T;
  }>;
  data: T[];
  paginate?: boolean;
}
//
interface Product {
  productName: string;
  brandName: string;
  category: string;
  subCategory: string;
  activeIngredient: string;
  concentration: string;
  units: string;
  subscribed?: boolean;
  packageWeight: string;
  weightUnit: string;
  packagingType: string;
  areaCovered: string;
  disease: string;
  price: string;
  description: string;
  images: string[];
}

interface Seed {
  id: number;
  varietyName: string;
  brandName: string;
  category: string;
  crop: string;
  subscribed?: boolean;
  seedWeight: string;
  packageWeight: string;
  germinationPercentage: string;
  maturityPercentage: string;
  minHarvestingDays: number;
  maxHavestingDays: number;
  suitableRegion: string;
  packageType: string;
  price: string;
  description: string;
}

interface Manager {
  id: number;
  managerName: string;
  phoneNo: string;
}

interface Franchise {
  id: number;
  managerName: string;
  franchiseName: string;
  phoneNo: string;
  address: string;
  province: string;
  district: string;
  tehsil: string;
  active: boolean;
  remainingDays: number;
}

interface Suggestions {
  id: number;
  date: string;
  query: string;
  response: string;
}

interface ProductTableRow extends Product {
  actions?: never;
}

interface SeedTableRow extends Seed {
  actions?: never;
}

interface ManagersTableRow extends Manager {
  actions?: never;
}

interface FranchiseTableRow extends Franchise {
  actions?: never;
}

interface SuggestionsTableActionRow extends Suggestions {
  viewed?: never;
  actions?: never;
}

type ProductColumnAccessor = keyof Product | "actions";

type SeedColumnAccessor = keyof Seed | "actions";

type ManagersColumnAccessor = keyof Manager | "actions";

type FranchiseColumnAccessor = keyof Franchise | "actions" | "active";

type SuggestionsColumnAccessor = keyof Suggestions | "actions" | "viewed";

type AddProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "view" | "edit";
  productData?: any;
  subscribe?: boolean;
};

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

// Define types for context
interface ModeContextType {
  mode: "view" | "add" | "edit";
  setMode: (newMode: "view" | "add" | "edit") => void;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  id: string;
}
