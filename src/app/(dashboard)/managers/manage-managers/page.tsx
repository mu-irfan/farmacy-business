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
import { Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/Table/DataTable";
import { ManagersData } from "@/constant/data";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";
import Header from "@/components/Header";
import AddManagerModal from "@/components/forms-modals/franchice/AddNewManager";

const ManageManagers = () => {
  const [isViewManagerModalOpen, setViewManagerModalOpen] = useState(false);
  const [selectedManagerToView, setSelectedManagerToView] = useState({});

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

  const handleView = (manager: any) => {
    setViewManagerModalOpen(true);
    setSelectedManagerToView(manager);
  };

  const handleDelete = (seedId: number) => {
    // Logic to delete the product
    console.log("Delete seed with ID:", seedId);
    // Add your delete logic here
  };

  const ManagerColumns: {
    Header: string;
    accessor: ManagersColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Manager Name", accessor: "managerName" },
    { Header: "Phone Number", accessor: "phoneNo" },
    {
      Header: "",
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
        <Header title="Managers" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Update the managers who are managing the franchises
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
                              placeholder="Search seed manger by name ..."
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
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <DataTable
          columns={ManagerColumns}
          data={ManagersData as ManagersTableRow[]}
        />
      </DashboardLayout>
      <AddManagerModal
        open={isViewManagerModalOpen}
        onOpenChange={setViewManagerModalOpen}
        mode="view"
        manager={selectedManagerToView}
      />
    </>
  );
};

export default ManageManagers;
