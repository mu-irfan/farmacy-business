"use client";
import React, { useState } from "react";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import DashboardLayout from "../../dashboard-layout";
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
import { productCategory, productData } from "@/constant/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";

const AllProducts = () => {
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                  <LabelInputContainer className="lg:col-span-3">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectGroup>
                                  <SelectLabel>Category</SelectLabel>
                                  {productCategory.map((item) => (
                                    <SelectItem
                                      key={item.value}
                                      value={item.value}
                                    >
                                      {item.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="lg:col-span-3">
                    <FormField
                      control={form.control}
                      name="subCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="All Subcategory" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectGroup>
                                  <SelectLabel>Sub-Category</SelectLabel>
                                  {productCategory.map((item) => (
                                    <SelectItem
                                      key={item.value}
                                      value={item.value}
                                    >
                                      {item.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="lg:col-span-3">
                    <FormField
                      control={form.control}
                      name="subCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              disabled
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="Sygenta Fixed" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectGroup>
                                  <SelectLabel>Another Field</SelectLabel>
                                  {productCategory.map((item) => (
                                    <SelectItem
                                      key={item.value}
                                      value={item.value}
                                    >
                                      {item.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </LabelInputContainer>
                  <Button
                    className="lg:col-span-1 w-full text-farmacieWhite font-medium"
                    type="submit"
                  >
                    Get All
                  </Button>
                  <Button
                    variant="outline"
                    className="lg:col-span-1 w-full dark:text-farmacieWhite font-medium border border-primary"
                    type="submit"
                  >
                    Search
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
        />
      </DashboardLayout>
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
