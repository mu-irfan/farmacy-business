"use client";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bulkFranchiseAddressDetails } from "@/constant/data";
import { cn } from "@/lib/utils";
import { MoveLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FranchiseDetails = ({ params }: any) => {
  const router = useRouter();
  const uuid = params.id;
  return (
    <DashboardLayout>
      <h3
        className="text-md lg:pl-2 font-normal py-2 dark:text-gray-400 cursor-pointer"
        onClick={() => router.back()}
      >
        <MoveLeft className="inline mr-1 mb-1 w-6 h-6" />
        Back
      </h3>
      <h2 className="text-3xl font-bold text-primary">Franchise Details</h2>
      <p className="text-md lg:pl-2 font-normal text-left pb-3">
        Subscribe the products and seeds to make them available on farmacie in
        this franchise
      </p>
      <div className="md:flex justify-between">
        <div className="flex items-center gap-3">
          <Link href="/franchises/manage-franchises/subscribe-new-product">
            <Button className="font-medium bg-yellow-500 hover:bg-yellow-600 text-black w-60">
              Subscribe New Products
            </Button>
          </Link>
          <Link href="/franchises/manage-franchises/subscribe-new-seeds">
            <Button
              variant="outline"
              className="font-medium border-primary dark:border-yellow-400 mt-2 md:mt-0 w-60"
              type="button"
            >
              Subscribe New Seeds
            </Button>
          </Link>
        </div>
        <Button className="font-medium">
          Activate <ShieldCheck className="w-5 h-5 ml-1.5" />
        </Button>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-1 xl:gap-4 gap-y-4 my-10">
        <Card className="w-full xl:col-span-3 space-y-4 pt-4 rounded-2xl text-left bg-primary/10 border-l-[18px] border-l-green-500">
          <CardContent>
            <ul className="text-sm pl-3 space-y-4 py-6">
              {bulkFranchiseAddressDetails.map((item, index) => (
                <li key={index} className="grid grid-cols-[100px_1fr] gap-8">
                  <span>{item.label}:</span>
                  <span
                    className={
                      (cn("text-gray-800 font-medium dark:text-white"),
                      item.label === "Active" && item.value === "False"
                        ? "text-red-400"
                        : item.label === "Active" && item.value === "True"
                        ? "text-green-500"
                        : "")
                    }
                  >
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div className="xl:col-span-1 space-y-4">
          <Card className="relative w-full pt-4 rounded-xl text-center bg-primary/10 overflow-hidden">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
                12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm lg:pt-4">Total Products Subscribed</div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
          <Card className="relative w-full pt-4 rounded-xl text-center bg-primary/10 overflow-hidden">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
                12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm lg:pt-4">Total Seeds Subscribed</div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          className="font-medium border-primary dark:border-green-500 mt-2 md:mt-0 w-60"
          type="button"
        >
          View Subscribed Seeds
        </Button>
        <Button className="font-medium w-60">View Subscribed Products</Button>
      </div>
    </DashboardLayout>
  );
};

export default FranchiseDetails;
