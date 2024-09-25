import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddProductForm from "@/components/forms/AddProductForm";

const AddProductModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Add New Product
          </DialogTitle>
          <DialogDescription>
            These products are added in the global list (a list containing all
            unique products that can be sold on farmacie)
          </DialogDescription>
        </DialogHeader>
        <AddProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
