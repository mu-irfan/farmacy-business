import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterSubscribedProductsForm from "@/components/forms/products/FilterSubscribedProductsForm";

const NewProductSubscribeModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter
          </DialogTitle>
        </DialogHeader>
        <FilterSubscribedProductsForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewProductSubscribeModal;
