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
  packageWeight: string;
  weightUnit: string;
  packagingType: string;
  areaCovered: string;
  disease: string;
  description: string;
  images: string[];
}

interface Seed {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  crop: string;
}

interface Franchise {
  id: number;
  name: string;
  contact: string;
  address: string;
  tehsil: string;
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

interface FranchiseTableRow extends Franchise {
  actions?: never;
}

interface FranchiseTableActiveRow extends Franchise {
  active?: never;
}

interface SuggestionsTableActionRow extends Suggestions {
  actions?: never;
}

interface SuggestionsTableActiveRow extends Suggestions {
  viewed?: never;
}

type ProductColumnAccessor = keyof Product | "actions";

type SeedColumnAccessor = keyof Seed | "actions";

type FranchiseColumnAccessor = keyof Franchise | "actions" | "active";

type SuggestionsColumnAccessor = keyof Suggestions | "actions" | "viewed";

type AddProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "view" | "edit";
  productData?: any;
};
