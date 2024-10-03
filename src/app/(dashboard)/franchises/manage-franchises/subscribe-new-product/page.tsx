"use client";
import React, { useState } from "react";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { searchProductsFormSchema } from "@/schemas/validation/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LabelInputContainer from "@/components/forms/LabelInputContainer";
import { Button } from "@/components/ui/button";
import { Ban, Check, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import NewProductSubscribeModal from "@/components/forms-modals/products/SubscribeNewProductModal";
import DataTable from "@/components/Table/DataTable";
import { productData } from "@/constant/data";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import Header from "@/components/Header";

const SubscribeNewProduct = () => {
  const [isNewSubscribedProductModalOpen, setNewSubscribedProductModalOpen] =
    useState(false);
  const [isViewProductModalOpen, setViewProductModalOpen] = useState(false);
  const [selectedProductToView, setSelectedProductToView] = useState({});

  const form = useForm<z.infer<typeof searchProductsFormSchema>>({
    resolver: zodResolver(searchProductsFormSchema),
    defaultValues: {
      category: "",
      subCategory: "",
    },
  });

  const onSubmit = (data: z.infer<typeof searchProductsFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  const handleView = (product: Product) => {
    setViewProductModalOpen(true);
    setSelectedProductToView(product);
  };

  const handleDelete = (productId: number) => {
    // Logic to delete the product
    console.log("Delete product with ID:", productId);
    // Add your delete logic here
  };

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
        row.original.subscribed && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10  text-primary tracking-wider hover:text-primary/80"
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
        <p className="text-md lg:pl-2 font-normal pb-4 text-left">
          Search, find and subscribe product from global list.
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center gap-2">
                  <LabelInputContainer className="max-w-md lg:max-w-lg">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Input
                              placeholder="Search product by name ..."
                              type="text"
                              id="varietyName"
                              className="outline-none border py-5 border-primary rounded-full pl-12"
                              {...field}
                            />
                          </FormControl>
                          <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </LabelInputContainer>
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
              </form>
            </Form>
          </CardContent>
        </Card>
        <DataTable
          columns={productColumns}
          data={productData as ProductTableRow[]}
        />
      </DashboardLayout>
      <NewProductSubscribeModal
        open={isNewSubscribedProductModalOpen}
        onOpenChange={setNewSubscribedProductModalOpen}
      />
      <AddProductModal
        open={isViewProductModalOpen}
        onOpenChange={setViewProductModalOpen}
        mode="view"
        productData={selectedProductToView}
      />
    </>
  );
};

export default SubscribeNewProduct;
