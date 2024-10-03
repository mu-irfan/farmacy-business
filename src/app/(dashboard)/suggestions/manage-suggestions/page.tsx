"use client";
import React from "react";
import DashboardLayout from "../../dashboard-layout";
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";
import DataTable from "@/components/Table/DataTable";
import { suggestionsData } from "@/constant/data";
import Header from "@/components/Header";

const ManageSuggestions = () => {
  const handleView = (suggestion: Suggestions) => {
    // Logic to view the product details
    console.log("View suggestion:", suggestion);
  };

  const handleDelete = (suggestionId: number) => {
    // Logic to delete the product
    console.log("Delete suggestion with ID:", suggestionId);
    // Add your delete logic here
  };

  const suggestionsColumns: {
    Header: string;
    accessor: SuggestionsColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Date", accessor: "date" },
    { Header: "Query", accessor: "query" },
    { Header: "Response", accessor: "response" },
    {
      Header: "Viewed",
      accessor: "viewed",
      Cell: () => <Check className="text-primary" />,
    },
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
        <Header title="Responses" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left">
          Responses of your suggestion and quries
        </p>
        <DataTable
          columns={suggestionsColumns}
          data={suggestionsData as SuggestionsTableActionRow[]}
        />
      </DashboardLayout>
    </>
  );
};

export default ManageSuggestions;
