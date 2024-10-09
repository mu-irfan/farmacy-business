"use client";
import React, { useState } from "react";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import DashboardLayout from "../../dashboard-layout";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { filterProductsFormSchema } from "@/schemas/validation/validationSchema";
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
import { productData } from "@/constant/data";
import { Filter, Search, Trash } from "lucide-react";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import FilterProductModal from "@/components/forms-modals/products/FilterProduct";

const AllProducts = () => {
  const [isViewProductModalOpen, setViewProductModalOpen] = useState(false);
  const [selectedProductToView, setSelectedProductToView] = useState({});
  const [isProductFilterModalOpen, setProductFilterModalOpen] = useState(false);

  const form = useForm<z.infer<typeof filterProductsFormSchema>>({
    resolver: zodResolver(filterProductsFormSchema),
    defaultValues: {
      category: "",
      allSubCategories: "",
    },
  });

  const onSubmit = (data: z.infer<typeof filterProductsFormSchema>) => {
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
            onClick={() => handleDelete(row.original.id)}
            className="bg-red-400 hover:bg-red-500 text-black"
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
                              placeholder="Search product variety by name ..."
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
                    onClick={() => setProductFilterModalOpen((prev) => !prev)}
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
          paginate
          extendWidth
        />
      </DashboardLayout>
      <FilterProductModal
        open={isProductFilterModalOpen}
        onOpenChange={setProductFilterModalOpen}
      />
      <div className="overflow-y-auto">
        <AddProductModal
          open={isViewProductModalOpen}
          onOpenChange={setViewProductModalOpen}
          mode="view"
          productData={selectedProductToView}
        />
      </div>
    </>
  );
};

export default AllProducts;
