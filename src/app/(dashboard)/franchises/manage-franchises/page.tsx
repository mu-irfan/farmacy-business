"use client";
import React, { useState } from "react";
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
import { Ban, Check, Filter, Search, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FilterFranchiceModal from "@/components/forms-modals/franchice/FilterFranchice";
import ActivateFranchiseModal from "@/components/forms-modals/franchice/ActivateFranchise";
import DataTable from "@/components/Table/DataTable";
import { franchiseData } from "@/constant/data";
import Header from "@/components/Header";

const ManageFranchises = () => {
  const router = useRouter();
  const [isAddFranchiceModalOpen, setAddFranchiceModalOpen] = useState(false);
  const [isBulkActivateModalOpen, setBulkActivateModalOpen] = useState(false);

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

  const handleView = (franchise: Franchise) => {
    router.push(`/franchises/manage-franchises/franchise/${franchise.id}`);
  };

  const handleDelete = (franchiseId: number) => {
    // Logic to delete the product
    console.log("Delete franchise with ID:", franchiseId);
    // Add your delete logic here
  };

  const franchiseColumns: {
    Header: string;
    accessor: FranchiseColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Manager Name", accessor: "managerName" },
    // { Header: "Franchise Name", accessor: "franchiseName" },
    { Header: "Contact", accessor: "phoneNo" },
    { Header: "Address", accessor: "address" },
    { Header: "Tehsil", accessor: "tehsil" },
    {
      Header: "Active",
      accessor: "active",
      Cell: ({ row }: any) =>
        row.original.active ? (
          <Check className="text-primary" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5" />
        ),
    },
    { Header: "Remaining Days", accessor: "remainingDays" },
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
        <Header title=" Get Franchise List" />
        <p className="text-md lg:pl-2 font-normal text-left pb-3 dark:text-farmacieGrey">
          Find or update franchise in the franchise list
        </p>
        <Button
          className="font-medium bg-yellow-500 hover:bg-yellow-600 text-black w-40"
          onClick={() => setBulkActivateModalOpen((prev) => !prev)}
        >
          Bulk Activate
        </Button>
        <p className="text-md lg:pl-2 font-normal text-left pb-3 dark:text-farmacieGrey">
          Activate the franchises in bulk in a single click
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
                              placeholder="Search franchise by name..."
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
                    onClick={() => setAddFranchiceModalOpen((prev) => !prev)}
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
          columns={franchiseColumns}
          data={franchiseData as FranchiseTableRow[]}
        />
      </DashboardLayout>
      <FilterFranchiceModal
        open={isAddFranchiceModalOpen}
        onOpenChange={setAddFranchiceModalOpen}
      />
      <ActivateFranchiseModal
        open={isBulkActivateModalOpen}
        onOpenChange={setBulkActivateModalOpen}
      />
    </>
  );
};

export default ManageFranchises;
