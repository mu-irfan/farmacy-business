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
import { Filter, MoveLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import NewProductSubscribeModal from "@/components/forms-modals/products/SubscribeNewProductModal";

const SubscribeNewProduct = () => {
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
        <h2 className="text-3xl font-bold text-primary">
          Subscribe New Product
        </h2>
        <p className="text-md lg:pl-2 font-normal pb-4 text-left">
          Search, find and subscribe product from global list.
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10">
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
                    onClick={() => setAddProductModalOpen((prev) => !prev)}
                  >
                    <Filter className="w-5 h-5 mr-1" />
                    Filter
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DashboardLayout>
      <NewProductSubscribeModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
      />
    </>
  );
};

export default SubscribeNewProduct;
