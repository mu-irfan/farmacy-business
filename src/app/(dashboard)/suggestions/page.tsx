"use client";
import React, { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, Search } from "lucide-react";
import AddProductModal from "@/components/forms-modals/products/AddProduct";

const Suggestions = () => {
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  return (
    <>
      <DashboardLayout contentAtCenter>
        <Card className="w-full py-6 lg:py-8 max-w-lg rounded-xl text-center bg-primary/10 hover:bg-background border-2 border-primary">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
              12
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md font-medium lg:pt-4">New Responses</div>
          </CardContent>
        </Card>
        <Card
          className="w-full py-6 lg:py-8 max-w-lg lg:mt-4 rounded-xl text-center bg-muted/50 hover:bg-background cards cursor-pointer"
          onClick={() => setAddProductModalOpen((prev) => !prev)}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
              Suggestion - Query
            </div>
          </CardContent>
        </Card>
        <p className="text-left text-sm lg:pl-2 font-medium pb-4">
          Write a suggestion or ask query if something confusing you.
        </p>
        <Card className="w-full py-6 lg:py-8 max-w-lg rounded-xl text-center bg-primary/10 hover:bg-background border-2 border-primary">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <Search className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
              Responses
            </div>
          </CardContent>
        </Card>
        <p className="text-sm lg:pl-2 font-medium pb-4">
          View and manage the responses of your suggestion.
        </p>
      </DashboardLayout>
      <AddProductModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
      />
    </>
  );
};

export default Suggestions;
