import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import CustomCheckbox from "@/components/ui/CustomCheckbox";

const ActivateFranchisePaymentModal = ({ open, onOpenChange }: any) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleCheckboxChange = (paymentMethod: string) => {
    setSelectedPayment((prev) =>
      prev === paymentMethod ? null : paymentMethod
    );
  };
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
          <div className="flex items-center justify-start pl-4 md:pl-10">
            <CustomCheckbox
              id="payment-jazzcash"
              checked={selectedPayment === "JazzCash"}
              onChange={() => handleCheckboxChange("JazzCash")}
            />
            <CardTitle className="text-xl md:text-3xl pl-2 md:pl-8 font-bold text-primary">
              Pay With JazzCash
            </CardTitle>
          </div>
        </Card>
        <Card className="w-full py-8 rounded-xl text-center bg-primary/10">
          <div className="flex items-center justify-start pl-4 md:pl-10">
            <CustomCheckbox
              id="payment-card"
              checked={selectedPayment === "Card"}
              onChange={() => handleCheckboxChange("Card")}
            />
            <CardTitle className="text-xl md:text-3xl pl-2 md:pl-8 font-bold text-primary">
              Pay With Card
            </CardTitle>
          </div>
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
