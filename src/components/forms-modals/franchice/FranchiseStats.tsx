import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useContextConsumer } from "@/context/Context";
import AddFranchiseModal from "./AddFranchise";

const FranchiseStats = ({ franchiseStats }: any) => {
  const { setMode } = useContextConsumer();
  const [isEditFranchiseModalOpen, setEditFranchiseModalOpen] = useState(false);
  const franchiseEntries = Object.entries(franchiseStats);

  return (
    <>
      <div className="grid xl:grid-cols-4 grid-cols-1 xl:gap-4 gap-y-4 my-10">
        <Card className="relative w-full xl:col-span-3 flex flex-col space-y-4 pt-4 rounded-2xl text-left bg-primary/10 border-l-[18px] border-l-green-500 min-h-[100px]">
          <CardContent className="flex-grow">
            <ul className="text-sm pl-3 space-y-4 py-6">
              {franchiseEntries.map(
                ([key, value]: [string, any], index: number) => (
                  <li key={index} className="grid grid-cols-[150px_1fr] gap-8">
                    <span className="dark:text-farmacieGrey capitalize">
                      {key}:
                    </span>
                    <span
                      className={cn(
                        "text-gray-800 font-light dark:text-white",
                        key === "active" && value === false
                          ? "!text-red-400"
                          : key === "active" && value === true
                          ? "!text-green-500"
                          : ""
                      )}
                    >
                      {value.toString()}
                    </span>
                  </li>
                )
              )}
            </ul>
          </CardContent>
          <div
            className="absolute top-2 right-6 cursor-pointer"
            onClick={() => {
              setMode("edit");
              setEditFranchiseModalOpen(true);
            }}
          >
            <Image
              alt="edit-btn"
              src="/assets/images/edit-btn.svg"
              width={800}
              height={800}
              className="w-8 h-8"
            />
          </div>
        </Card>
        <div className="xl:col-span-1 space-y-4 flex flex-col">
          <Card className="relative w-full pt-4 rounded-xl text-center bg-primary/10 overflow-hidden flex-grow min-h-[100px]">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
                12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm lg:pt-4 dark:text-farmacieGrayModalText">
                Total Products Subscribed
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
          <Card className="relative w-full pt-4 rounded-xl text-center bg-primary/10 overflow-hidden flex-grow min-h-[100px]">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
                12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm lg:pt-4 dark:text-farmacieGrayModalText">
                Total Seeds Subscribed
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </div>
      </div>
      <AddFranchiseModal
        open={isEditFranchiseModalOpen}
        onOpenChange={setEditFranchiseModalOpen}
        franchise={franchiseStats}
      />
    </>
  );
};

export default FranchiseStats;
