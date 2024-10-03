"use client";
import React, { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, Search } from "lucide-react";
import Link from "next/link";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";

const Seeds = () => {
  const [isAddSeedModalOpen, setAddSeedModalOpen] = useState(false);

  return (
    <>
      <DashboardLayout contentAtCenter>
        <Card className="w-full py-6 lg:py-8 max-w-lg rounded-xl text-center bg-primary/10 hover:bg-background border-2 border-primary">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
              40
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md font-medium lg:pt-4">
              Total Seeds in Global List
            </div>
          </CardContent>
        </Card>
        <Card
          className="w-full py-6 lg:py-8 max-w-lg lg:mt-4 rounded-xl text-center bg-muted/50 hover:bg-background cards cursor-pointer"
          onClick={() => setAddSeedModalOpen((prev) => !prev)}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
              Add New Seed
            </div>
          </CardContent>
        </Card>
        <p className="text-left text-sm lg:pl-2 font-medium pb-4">
          Add seed to seed global list
        </p>
        <Link href="/seeds/manage-seeds" className="w-full mx-auto max-w-lg">
          <Card className="w-full py-6 lg:py-8 rounded-xl text-center bg-primary/10 hover:bg-background border-2 border-primary">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto text-farmacieWhite" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
                Manage Seeds
              </div>
            </CardContent>
          </Card>
        </Link>
        <p className="text-sm lg:pl-2 font-medium pb-4">
          Search, filter and update seeds from the global list
        </p>
      </DashboardLayout>
      <AddSeedModal
        open={isAddSeedModalOpen}
        onOpenChange={setAddSeedModalOpen}
        mode="add"
      />
    </>
  );
};

export default Seeds;
