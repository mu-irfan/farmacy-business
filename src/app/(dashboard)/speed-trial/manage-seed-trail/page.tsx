"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Filter, Search, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FilterFranchiceModal from "@/components/forms-modals/franchice/FilterFranchice";
import ActivateFranchiseModal from "@/components/forms-modals/franchice/ActivateFranchise";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import { useDeleteFranchise, useGetAllFranchises } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { debounce } from "lodash";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { SeedTrails } from "@/constant/data";

const ManageSeedTrailData = () => {
  const router = useRouter();
  const { token } = useContextConsumer();
  const [isAddFranchiceModalOpen, setAddFranchiceModalOpen] =
    useState<boolean>(false);
  const [viewStageAgainstSeed, setViewStageAgainstSeed] =
    useState<boolean>(false);

  // franchises
  const { data: franchises, isLoading: loading } = useGetAllFranchises(token);
  const { mutate: deleteManager, isPending: deletingManager } =
    useDeleteFranchise(token);

  const handleView = (franchise: any) => {
    setViewStageAgainstSeed(true);
    // router.push(`/franchises/manage-franchises/franchise/${franchise.uuid}`);
  };

  const franchiseColumns: {
    Header: string;
    accessor: keyof SeedTrails | "actions";
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Seed variety name",
      accessor: "variety_name",
      Cell: ({ row }: any) =>
        row.original.franchise_manager?.full_name || "N/A",
    },
    {
      Header: "Sowing date",
      accessor: "sowing_date",
      Cell: ({ row }: any) => row.original.franchise_manager?.contact || "N/A",
    },
    { Header: "Tehsil", accessor: "tehsil" },
    { Header: "City", accessor: "city" },
    { Header: "Min irrigation mm", accessor: "min_irrigation_mm" },
    { Header: "Max irrigation mm", accessor: "max_irrigation_mm" },
    { Header: "Est yield", accessor: "est_yield" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleView(row.original)}
          className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
        >
          Trial
        </Button>
      ),
    },
  ];

  const stageColumns: {
    Header: string;
    accessor: keyof SeedTrailsStages;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Stage",
      accessor: "stage",
      Cell: ({ row }: any) =>
        row.original.franchise_manager?.full_name || "N/A",
    },
    {
      Header: "Principle Stage",
      accessor: "principle_stage",
      Cell: ({ row }: any) => row.original.franchise_manager?.contact || "N/A",
    },
    { Header: "BBCH scale", accessor: "BBCH_scale" },
    { Header: "Start day", accessor: "start_day" },
    { Header: "End day", accessor: "end_day" },
    { Header: "Kc", accessor: "kc" },
  ];

  return (
    <>
      <DashboardLayout>
        <Header title="Seed Trials" />
        {viewStageAgainstSeed && (
          <div className="flex justify-end my-4">
            <Button
              size="sm"
              variant="outline"
              // onClick={() => handleView(row.original)}
              className="border-primary bg-primary/10 w-40 text-primary tracking-wider hover:text-primary/80"
            >
              Update Trial Data
            </Button>
          </div>
        )}
        {!viewStageAgainstSeed &&
          (loading ? (
            <SkeletonCard className="w-full h-80" />
          ) : SeedTrails && SeedTrails.length > 0 ? (
            <div className="mt-8">
              <DataTable
                columns={franchiseColumns}
                data={SeedTrails as SeedTrailTableRow[]}
              />
            </div>
          ) : (
            <NoData message="No Data Available" />
          ))}

        {viewStageAgainstSeed &&
          (loading ? (
            <SkeletonCard className="w-full h-80" />
          ) : SeedTrails && SeedTrails.length > 0 ? (
            <div className="mt-8">
              <DataTable
                columns={stageColumns}
                data={SeedTrails as SeedTrailTableRow[]}
              />
            </div>
          ) : (
            <NoData message="No Data Available" />
          ))}
      </DashboardLayout>
      <FilterFranchiceModal
        open={isAddFranchiceModalOpen}
        onOpenChange={setAddFranchiceModalOpen}
      />
    </>
  );
};

export default ManageSeedTrailData;
