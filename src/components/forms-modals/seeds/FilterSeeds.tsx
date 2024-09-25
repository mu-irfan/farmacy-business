import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterSeedForm from "@/components/forms/seeds/FilterSeedForm";

const FilterSeedModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter Seed
          </DialogTitle>
        </DialogHeader>
        <FilterSeedForm />
      </DialogContent>
    </Dialog>
  );
};

export default FilterSeedModal;
