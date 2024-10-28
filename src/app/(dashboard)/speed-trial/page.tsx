"use client";

import React, { useMemo, useState } from "react";
import { CirclePlus, Search } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { seedsTrailReportsTitles } from "@/constant/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import { useGetProductStats } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";
import AddCropSelectionSeedTrailDataModal from "@/components/forms-modals/seed-trail-data/AddCropSelectionSeedTrailData";

export default function SpeedTrail() {
  const { token } = useContextConsumer();
  const [isAddSeedTrailModalOpen, setAddSeedTrailModalOpen] = useState(false);

  //stats data
  const { data: stats, isLoading: loading } = useGetProductStats(token);

  //   const reportsWithStats = useMemo(() => {
  //     return seedsTrailReportsTitles.map((report) => ({
  //       title: report.title,
  //       value:
  //         stats?.data?.[report.key] < 10
  //           ? `0${stats.data[report.key]}`
  //           : stats?.data?.[report.key] || "00",
  //     }));
  //   }, [stats]);

  return (
    <>
      <DashboardLayout contentAtCenter>
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {/* {loading ? (
            <SkeletonCard className="h-60 w-full col-span-3" />
          ) : (
            // reportsWithStats.map((report, index) => (
            //   <ReportCard
            //     key={index}
            //     title={report.title}
            //     value={report.value}
            //   />
            // ))
          )} */}
        </div>
        <Card
          className="w-full relative py-6 lg:py-8 max-w-xl lg:mt-4 rounded-xl text-center bg-muted/50 hover:bg-background cards cursor-pointer"
          onClick={() => setAddSeedTrailModalOpen((prev) => !prev)}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
              Add Seed Trial
            </div>
          </CardContent>
        </Card>
        <p className="text-sm !text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Add and manage possible crop stages
        </p>
        <Link
          href="/speed-trial/manage-seed-trail"
          className="w-full mx-auto max-w-xl"
        >
          <Card className="w-full py-6 lg:py-8 rounded-xl text-center bg-primary/10 border-2 border-primary">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto dark:text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-bold text-primary dark:text-green-500">
                Manage Seed Trials
              </div>
            </CardContent>
          </Card>
        </Link>
        <p className="text-sm !text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          View crop trial data
        </p>
      </DashboardLayout>
      <AddCropSelectionSeedTrailDataModal
        open={isAddSeedTrailModalOpen}
        onOpenChange={setAddSeedTrailModalOpen}
        mode="add"
      />
    </>
  );
}
