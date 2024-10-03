"use client";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import FranchiseStats from "@/components/forms-modals/franchice/FranchiseStats";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { franchiseData, productData, seedsData } from "@/constant/data";
import { MoveLeft, ShieldCheck, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FranchiseDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isViewSeedsModalOpen, setViewSeedsModalOpen] = useState(false);
  const [selectedSeedToView, setSelectedSeedToView] = useState({});
  const [isViewProductModalOpen, setViewProductModalOpen] = useState(false);
  const [selectedProductToView, setSelectedProductToView] = useState({});
  const [visibleTable, setVisibleTable] = useState<"seeds" | "products" | null>(
    null
  );

  const franchiseId = parseInt(params.id, 10);
  const selectedFranchise = franchiseData.find(
    (franchise) => franchise.id === franchiseId
  );

  if (!selectedFranchise) {
    return <p>Franchise not found.</p>;
  }

  const franchiseAddressDetails = [
    { label: "Manager Name", value: selectedFranchise.name },
    { label: "Contact", value: selectedFranchise.contact },
    { label: "Address", value: selectedFranchise.address },
    { label: "Province", value: selectedFranchise.province },
    { label: "District", value: selectedFranchise.district },
    { label: "Tehsil", value: selectedFranchise.tehsil },
    { label: "Active", value: selectedFranchise.active ? "True" : "False" },
  ];

  const handleView = (seed: Product) => {
    setViewSeedsModalOpen(true);
    setSelectedSeedToView(seed);
  };

  const handleDelete = (seedId: number) => {
    // Logic to delete the product
    console.log("Delete seed with ID:", seedId);
    // Add your delete logic here
  };

  const handleProductView = (product: Product) => {
    setViewProductModalOpen(true);
    setSelectedProductToView(product);
  };

  const handleProductDelete = (productId: number) => {
    // Logic to delete the product
    console.log("Delete product with ID:", productId);
    // Add your delete logic here
  };

  const seedColumns: {
    Header: string;
    accessor: SeedColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Seed Variety Name", accessor: "varietyName" },
    { Header: "Brand Name", accessor: "brandName" },
    { Header: "Crop Category", accessor: "category" },
    { Header: "Crop", accessor: "crop" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
          <Button
            size="icon"
            onClick={() => handleDelete(row.original.id)}
            className="bg-red-400 hover:bg-red-500 text-black"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const productColumns: {
    Header: string;
    accessor: ProductColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Product Name", accessor: "productName" },
    { Header: "Brand Name", accessor: "brandName" },
    { Header: "Category", accessor: "category" },
    { Header: "Sub Category", accessor: "subCategory" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleProductView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
          <Button
            size="icon"
            onClick={() => handleProductDelete(row.original.id)}
            className="bg-red-400 hover:bg-red-500 text-black"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="md:flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary">Franchise Details</h2>
        <h3
          className="text-md lg:pl-2 font-normal py-2 dark:text-gray-400 cursor-pointer"
          onClick={() => router.back()}
        >
          <MoveLeft className="inline mr-1 mb-1 w-6 h-6" />
          Back
        </h3>
      </div>
      <p className="text-md lg:pl-2 font-normal text-left pb-3">
        Subscribe the products and seeds to make them available on farmacie in
        this franchise
      </p>
      <div className="md:flex justify-between">
        <div className="flex items-center gap-3">
          <Button
            disabled={!selectedFranchise.active}
            className="font-medium bg-yellow-500 hover:bg-yellow-600 text-black w-60 !disabled:cursor-not-allowed"
            onClick={() =>
              router.push("/franchises/manage-franchises/subscribe-new-product")
            }
            type="button"
          >
            Subscribe New Products
          </Button>
          <Button
            variant="outline"
            className="font-medium border-primary dark:border-yellow-400 mt-2 md:mt-0 w-60 !disabled:cursor-not-allowed"
            type="button"
            onClick={() =>
              router.push("/franchises/manage-franchises/subscribe-new-seeds")
            }
            disabled={!selectedFranchise.active}
          >
            Subscribe New Seeds
          </Button>
        </div>
        {!selectedFranchise.active && (
          <Button className="font-medium">
            Activate <ShieldCheck className="w-5 h-5 ml-1.5" />
          </Button>
        )}
      </div>
      <FranchiseStats franchiseStats={franchiseAddressDetails} />
      <div className="flex items-center justify-end gap-3 mb-8">
        <Button
          variant="outline"
          className="font-medium border-primary dark:border-green-500 mt-2 md:mt-0 w-60"
          type="button"
          disabled={!selectedFranchise.active}
          onClick={() => setVisibleTable("seeds")}
        >
          View Subscribed Seeds
        </Button>
        <Button
          className="font-medium w-60"
          disabled={!selectedFranchise.active}
          onClick={() => setVisibleTable("products")}
        >
          View Subscribed Products
        </Button>
      </div>
      {visibleTable === "seeds" && (
        <DataTable columns={seedColumns} data={seedsData as SeedTableRow[]} />
      )}
      {visibleTable === "products" && (
        <DataTable
          columns={productColumns}
          data={productData as ProductTableRow[]}
          paginate
        />
      )}
      <AddSeedModal
        open={isViewSeedsModalOpen}
        onOpenChange={setViewSeedsModalOpen}
        mode="view"
        seedData={selectedSeedToView}
      />
      <AddProductModal
        open={isViewProductModalOpen}
        onOpenChange={setViewProductModalOpen}
        mode="view"
        productData={selectedProductToView}
      />
    </DashboardLayout>
  );
};

export default FranchiseDetails;
