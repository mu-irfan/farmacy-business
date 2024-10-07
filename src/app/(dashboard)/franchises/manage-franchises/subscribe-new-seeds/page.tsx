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
import { Ban, Check, Filter, Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import NewProductSubscribeModal from "@/components/forms-modals/products/SubscribeNewProductModal";
import Header from "@/components/Header";
import DataTable from "@/components/Table/DataTable";
import { seedsData } from "@/constant/data";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";

const SubscribeNewSeeds = () => {
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isViewSeedsModalOpen, setViewSeedsModalOpen] = useState(false);
  const [selectedSeedToView, setSelectedSeedToView] = useState({});

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

  const handleView = (seed: Product) => {
    setViewSeedsModalOpen(true);
    setSelectedSeedToView(seed);
  };

  const handleDelete = (seedId: number) => {
    // Logic to delete the product
    console.log("Delete seed with ID:", seedId);
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
        <Header title="Subscribe New Seed" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left">
          Search, find and subscribe seed from global list.
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
        <DataTable columns={seedColumns} data={seedsData as SeedTableRow[]} />
      </DashboardLayout>
      <NewProductSubscribeModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
      />
      <AddSeedModal
        open={isViewSeedsModalOpen}
        onOpenChange={setViewSeedsModalOpen}
        mode="view"
        seedData={selectedSeedToView}
      />
    </>
  );
};

export default SubscribeNewSeeds;
