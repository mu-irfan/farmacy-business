"use client";
import React, { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";
import DataTable from "@/components/Table/DataTable";
import { suggestionsData } from "@/constant/data";
import Header from "@/components/Header";
import QueryResponsesModal from "@/components/forms-modals/suggestions/QueryResponses";

const ManageSuggestions = () => {
  const [isQueryResponsesModalOpen, setQueryResponsesModalOpen] =
    useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState({});

  const handleView = (suggestion: Suggestions) => {
    console.log("View suggestion:", suggestion);
    setQueryResponsesModalOpen(true);
    setSelectedSuggestion(suggestion);
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
    {
      Header: "Query",
      accessor: "query",
      Cell: ({ row }: any) => (
        <div
          className="w-40 overflow-hidden text-ellipsis whitespace-nowrap"
          title={row.original.query}
        >
          {row.original.query}
        </div>
      ),
    },
    {
      Header: "Response",
      accessor: "response",
      Cell: ({ row }: any) => (
        <div
          className="w-40 overflow-hidden text-ellipsis whitespace-nowrap"
          title={row.original.response}
        >
          {row.original.response}
        </div>
      ),
    },
    {
      Header: "Viewed",
      accessor: "viewed",
      Cell: () => <Check className="text-primary" />,
    },
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
        <Header title="Responses" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Responses of your suggestion and quries
        </p>
        <DataTable
          columns={suggestionsColumns}
          data={suggestionsData as SuggestionsTableActionRow[]}
        />
      </DashboardLayout>
      <QueryResponsesModal
        open={isQueryResponsesModalOpen}
        onOpenChange={setQueryResponsesModalOpen}
        suggestion={selectedSuggestion}
      />
    </>
  );
};

export default ManageSuggestions;
