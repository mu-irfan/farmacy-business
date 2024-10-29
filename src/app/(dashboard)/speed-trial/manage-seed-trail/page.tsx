"use client";
import React, { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Button } from "@/components/ui/button";
import FilterFranchiceModal from "@/components/forms-modals/franchice/FilterFranchice";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import {
  useGetAllSeedTrails,
  useGetAllSeedTrailsStages,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";

const ManageSeedTrailData = () => {
  const { token } = useContextConsumer();
  const [isAddFranchiceModalOpen, setAddFranchiceModalOpen] =
    useState<boolean>(false);
  const [viewStageAgainstSeed, setViewStageAgainstSeed] =
    useState<boolean>(false);
  const [trailUuid, setTrailUuid] = useState<string>("");

  // seed trails
  const { data: seedTrails, isLoading: loading } = useGetAllSeedTrails(token);
  const { data: trailStages } = useGetAllSeedTrailsStages(trailUuid, token);

  const handleView = (uuid: any) => {
    setViewStageAgainstSeed(true);
    setTrailUuid(uuid);
  };

  const SeedTrailColoumn: {
    Header: string;
    accessor: keyof SeedTrails | "actions";
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Seed variety name",
      accessor: "variety_name",
      Cell: ({ row }: any) => row.original.seed || "N/A",
    },
    {
      Header: "Sowing date",
      accessor: "sowing_date",
      Cell: ({ row }: any) =>
        row.original.sowing_date.toString().split("T")[0] || "N/A",
    },
    { Header: "Tehsil", accessor: "tehsil" },
    { Header: "City", accessor: "city" },
    { Header: "Min irrigation mm", accessor: "min_irrigation" },
    { Header: "Max irrigation mm", accessor: "max_irrigation" },
    { Header: "Est yield", accessor: "estimated_yield" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleView(row.original.uuid)}
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
      Cell: ({ row }: any) => row.original?.stage || "N/A",
    },
    {
      Header: "Principle Stage",
      accessor: "sub_stage",
      Cell: ({ row }: any) => row.original?.sub_stage || "N/A",
    },
    { Header: "BBCH scale", accessor: "bbch_scale" },
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
          ) : seedTrails && seedTrails.data.length > 0 ? (
            <div className="mt-8">
              <DataTable
                columns={SeedTrailColoumn}
                data={seedTrails.data as SeedTrailTableRow[]}
              />
            </div>
          ) : (
            <NoData message="No Data Available" />
          ))}

        {viewStageAgainstSeed &&
          (loading ? (
            <SkeletonCard className="w-full h-80" />
          ) : trailStages && trailStages.data.length > 0 ? (
            <div className="mt-8">
              <DataTable
                columns={stageColumns}
                data={trailStages?.data as SeedTrailsStages[]}
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
