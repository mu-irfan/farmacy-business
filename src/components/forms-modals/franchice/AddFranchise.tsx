import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddFranchiceForm from "../../forms/franchice/AddFranchiseForm";

const AddFranchiseModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Add New Franchise
          </DialogTitle>
          <DialogDescription>
            Add the franchise to expand the distribution network on the farmacie
          </DialogDescription>
        </DialogHeader>
        <AddFranchiceForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddFranchiseModal;
