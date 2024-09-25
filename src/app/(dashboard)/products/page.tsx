"use client";

import React, { useState } from "react";
import { CirclePlus, Search } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { productsReports } from "@/constant/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProductModal from "@/components/forms-modals/AddProduct";
import DashboardLayout from "../dashboard-layout";
import Link from "next/link";

export default function Dashboard() {
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  return (
    <>
      <DashboardLayout contentAtCenter>
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsReports.map((report, index) => (
            <ReportCard key={index} title={report.title} value={report.value} />
          ))}
          {/* <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/15 rounded blur-3xl z-0" /> */}
        </div>
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
              Add New Product
            </div>
          </CardContent>
        </Card>
        <p className="max-w-lg text-sm lg:pl-2 font-medium pb-4">
          Add fertilizer, pesticide or nutrients to company’s global list so
          that franchise can subscribe
        </p>
        <Link href="/products/all-products" className="w-full mx-auto max-w-lg">
          <Card className="w-full py-6 lg:py-8 rounded-xl text-center bg-primary/10 hover:bg-background border-2 border-primary">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto text-farmacieWhite" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
                Get Products
              </div>
            </CardContent>
          </Card>
        </Link>
        <p className="max-w-lg text-sm lg:pl-2 font-medium pb-4">
          Search, filter and update product from the compnay’s global list to
          view and update
        </p>
      </DashboardLayout>
      <AddProductModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
      />
    </>
  );
}
