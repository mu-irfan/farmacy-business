"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import FilterProductSubscribeModal from "@/components/forms-modals/products/SubscribeNewProductModal";
import DataTable from "@/components/Table/DataTable";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import Header from "@/components/Header";
import { useGetProduct, useGetUnSubscribedProduct } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { debounce } from "lodash";

const SubscribeNewProduct = ({ params }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { token } = useContextConsumer();
  const [isNewSubscribedProductModalOpen, setNewSubscribedProductModalOpen] =
    useState(false);
  const [isViewProductModalOpen, setViewProductModalOpen] = useState(false);
  const [selectedProductToView, setSelectedProductToView] = useState({});
  const [currentProductUuid, setCurrentProductUuid] = useState<string | null>(
    null
  );

  //
  const { data: unSubProducts, isLoading: loading } = useGetUnSubscribedProduct(
    token,
    params.id
  );
  const { data: productDetails, isLoading: productLoading } = useGetProduct(
    currentProductUuid!,
    token
  );

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const filteredUnsubProducts = useMemo(() => {
    if (!unSubProducts || !unSubProducts.message) return [];
    return unSubProducts?.message?.filter((unsubProd: any) =>
      unsubProd?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [unSubProducts, searchQuery]);

  const handleView = (product: any) => {
    setViewProductModalOpen(true);
    setCurrentProductUuid(product.uuid);
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
      Header: "Subscribed",
      accessor: "subscribed",
      Cell: ({ row }: any) =>
        row.original.subscribed ? (
          <Check className="text-primary ml-4" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5 ml-4" />
        ),
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) =>
        !row.original.subscribed && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10 text-primary tracking-wider hover:text-primary/80"
          >
            View & Subscribe
          </Button>
        ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <Header title="Subscribe New Product" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Search, find and subscribe product from global list.
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search product by name ..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
              <Button
                className="text-farmacieWhite font-medium"
                type="button"
                onClick={() =>
                  setNewSubscribedProductModalOpen((prev) => !prev)
                }
              >
                <Filter className="w-5 h-5 mr-1" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
        <DataTable
          columns={productColumns}
          data={filteredUnsubProducts as ProductTableRow[]}
        />
      </DashboardLayout>
      <FilterProductSubscribeModal
        open={isNewSubscribedProductModalOpen}
        onOpenChange={setNewSubscribedProductModalOpen}
      />
      <AddProductModal
        open={isViewProductModalOpen}
        onOpenChange={setViewProductModalOpen}
        mode="view"
        subscribe
        productData={selectedProductToView}
        currentFranchiseUuid={params.id}
      />
    </>
  );
};

export default SubscribeNewProduct;
