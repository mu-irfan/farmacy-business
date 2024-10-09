import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterProductForm from "@/components/forms/products/FilterProductForm";

const FilterProductModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter Product
          </DialogTitle>
        </DialogHeader>
        <FilterProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default FilterProductModal;
