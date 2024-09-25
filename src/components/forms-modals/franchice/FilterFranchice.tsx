import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterFranchiceForm from "@/components/forms/franchice/FilterFranchiceForm";

const FilterFranchiceModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter Franchice
          </DialogTitle>
        </DialogHeader>
        <FilterFranchiceForm />
      </DialogContent>
    </Dialog>
  );
};

export default FilterFranchiceModal;
