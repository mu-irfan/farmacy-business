import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

const ActivateFranchisePaymentModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader className="py-8">
          <DialogTitle className="text-primary text-xl font-bold">
            Bulk Franchise Activate
          </DialogTitle>
          <DialogDescription className="md:flex items-center justify-between">
            Select the payment method
          </DialogDescription>
        </DialogHeader>
        <Card className="w-full py-8 rounded-xl text-center bg-primary/10">
          <CardTitle className="text-3xl font-bold text-primary">
            Pay With JazzCash
          </CardTitle>
        </Card>
        <Card className="w-full py-8 rounded-xl text-center bg-primary/10">
          <CardTitle className="text-3xl font-bold text-primary">
            Pay With Card
          </CardTitle>
        </Card>
        <Button className="w-full text-white font-medium my-4" type="submit">
          Continue to Payment
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default ActivateFranchisePaymentModal;
