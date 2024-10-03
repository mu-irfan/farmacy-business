import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FranchiseStats = ({ franchiseStats }: any) => {
  return (
    <div className="grid xl:grid-cols-4 grid-cols-1 xl:gap-4 gap-y-4 my-10">
      <Card className="w-full xl:col-span-3 space-y-4 pt-4 rounded-2xl text-left bg-primary/10 border-l-[18px] border-l-green-500">
        <CardContent>
          <ul className="text-sm pl-3 space-y-4 py-6">
            {franchiseStats.map((item: any, index: number) => (
              <li key={index} className="grid grid-cols-[150px_1fr] gap-8">
                <span>{item.label}:</span>
                <span
                  className={cn(
                    "text-gray-800 font-medium dark:text-white",
                    item.label === "Active" && item.value === "False"
                      ? "!text-red-400"
                      : item.label === "Active" && item.value === "True"
                      ? "!text-green-500"
                      : ""
                  )}
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
  );
};

export default FranchiseStats;
