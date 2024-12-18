"use client";
import React, { useEffect, useMemo, useState } from "react";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import DashboardLayout from "../../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import { Filter, Search, Trash } from "lucide-react";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import FilterProductModal from "@/components/forms-modals/products/FilterProduct";
import {
  useDeleteProduct,
  useGetAllProducts,
  useGetProduct,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { SweetAlert } from "@/components/alerts/SweetAlert";

const AllProducts = () => {
  const { token } = useContextConsumer();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewProductModalOpen, setViewProductModalOpen] =
    useState<boolean>(false);
  const [selectedProductToView, setSelectedProductToView] = useState({});
  const [isProductFilterModalOpen, setProductFilterModalOpen] =
    useState<boolean>(false);
  const [currentProductUuid, setCurrentProductUuid] = useState<string | null>(
    null
  );
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    subCategory: "",
  });

  // data management
  const { data: products, isLoading: loading } = useGetAllProducts(token);
  const {
    data: productDetails,
    isLoading: productLoading,
    refetch,
  } = useGetProduct(currentProductUuid!, token);

  const { mutate: deleteProduct, isPending: deletingProduct } =
    useDeleteProduct(token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleFilterSubmit = (criteria: {
    category: string;
    subCategory: string;
  }) => {
    setFilterCriteria(criteria);
    setProductFilterModalOpen(false);
  };

  const filteredProducts = useMemo(() => {
    if (!products || !products.data) return [];
    return products.data
      .filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product: any) => {
        if (
          filterCriteria.category &&
          product.category !== filterCriteria.category
        )
          return false;
        if (
          filterCriteria.subCategory &&
          product.sub_category !== filterCriteria.subCategory
        )
          return false;
        return true;
      });
  }, [products, searchQuery, filterCriteria]);

  const handleView = async (product: any) => {
    setCurrentProductUuid(product.uuid);
    await refetch();
    setViewProductModalOpen(true);
  };

  const handleDelete = async (productId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Product?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteProduct(productId);
    }
  };

  useEffect(() => {
    if (productDetails?.success && productDetails.data) {
      setSelectedProductToView(productDetails.data);
    }
  }, [productDetails]);

  const productColumns: {
    Header: string;
    accessor: ProductColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Product Name", accessor: "name" },
    { Header: "Brand Name", accessor: "company_fk" },
    { Header: "Category", accessor: "category" },
    { Header: "Sub Category", accessor: "sub_category" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center justify-end gap-4">
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
            onClick={() => handleDelete(row.original.uuid)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deletingProduct}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <Header title="Get Products" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Filter and search the products from the product global list.
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search product variety by name ..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
              <Button
                className="text-farmacieWhite font-medium"
                type="button"
                onClick={() => setProductFilterModalOpen((prev) => !prev)}
              >
                <Filter className="w-5 h-5 mr-1" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
        {loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <DataTable
            columns={productColumns}
            data={filteredProducts as ProductTableRow[]}
            paginate={filteredProducts.length > 10}
            extendWidth
          />
        ) : (
          <NoData message="No Data Available" />
        )}
      </DashboardLayout>
      <FilterProductModal
        open={isProductFilterModalOpen}
        onOpenChange={setProductFilterModalOpen}
        onSubmit={handleFilterSubmit}
      />
      <div className="overflow-y-auto">
        <AddProductModal
          open={isViewProductModalOpen}
          onOpenChange={setViewProductModalOpen}
          mode="view"
          productData={selectedProductToView}
          loading={productLoading}
        />
      </div>
    </>
  );
};

export default AllProducts;
