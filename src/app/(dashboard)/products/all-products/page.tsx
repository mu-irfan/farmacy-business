"use client";
import React, { useState } from "react";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import DashboardLayout from "../../dashboard-layout";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  addProductFormSchema,
  searchProductsFormSchema,
} from "@/schemas/validation/validationSchema";
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
import { productCategory } from "@/constant/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AllProducts = () => {
  const router = useRouter();
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

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

  return (
    <>
      <DashboardLayout>
        <h3
          className="text-md lg:pl-2 font-normal py-2 dark:text-gray-400 cursor-pointer"
          onClick={() => router.back()}
        >
          <MoveLeft className="inline mr-1 mb-1 w-6 h-6" />
          Back
        </h3>
        <h2 className="text-3xl font-bold text-primary">Get Products</h2>
        <p className="text-md lg:pl-2 font-normal pb-4 text-left">
          Filter and search the products from the product global list.
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10">
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
      </DashboardLayout>
      <AddProductModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
      />
    </>
  );
};

export default AllProducts;
