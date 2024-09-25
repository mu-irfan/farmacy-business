import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { bulkFranchiseAddresses } from "@/constant/data";

const ActivateFranchiseModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Bulk Franchise Activate
          </DialogTitle>
          <DialogDescription className="md:flex items-center justify-between">
            <ul className="list-disc text-xs pl-3 text-yellow-600">
              <li>
                Price to activate single franchise is rupees:{" "}
                <strong className="text-black dark:text-white">500.00</strong>
              </li>
              <li>Select the franchises want to activate and pay</li>
              <li>
                If the payment status does not change after payment click the
                inquiry button.
              </li>
            </ul>
            <Button
              variant="outline"
              size="sm"
              className="font-medium border-primary dark:border-yellow-400 mt-2 md:mt-0"
              type="button"
            >
              Payment Inquiry
            </Button>
          </DialogDescription>
        </DialogHeader>
        <Card className="w-full pt-4 rounded-xl text-center bg-primary/10">
          <div className="space-x-3 lg:space-x-6 pb-2">
            <span>Count: 5</span>
            <span>Price: 5</span>
            <span>Tax15%: 375</span>
          </div>
          <CardTitle className="text-3xl lg:text-5xl font-bold text-primary">
            Rs: 2875.00
          </CardTitle>
          <CardContent>
            <p className="text-sm pt-3">Total bill including 15% Tax</p>
          </CardContent>
        </Card>
        <Card className="w-full pt-4 rounded-xl text-left bg-primary/10">
          <CardContent>
            <ul className="text-sm pl-3">
              {bulkFranchiseAddresses.map((item, index) => (
                <li key={index} className="grid grid-cols-[100px_1fr] gap-2">
                  <span>{item.label}:</span>
                  <span className="text-gray-800 font-medium dark:text-white">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="w-full pt-4 rounded-xl text-left bg-primary/10">
          <CardContent>
            <ul className="text-sm pl-3">
              {bulkFranchiseAddresses.map((item, index) => (
                <li key={index} className="grid grid-cols-[100px_1fr] gap-2">
                  <span>{item.label}:</span>
                  <span className="text-gray-800 font-medium dark:text-white">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="w-full pt-4 rounded-xl text-left bg-primary/10">
          <CardContent>
            <ul className="text-sm pl-3">
              {bulkFranchiseAddresses.map((item, index) => (
                <li key={index} className="grid grid-cols-[100px_1fr] gap-2">
                  <span>{item.label}:</span>
                  <span className="text-gray-800 font-medium dark:text-white">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Button className="w-full text-white font-medium" type="submit">
          Continue to Payment
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default ActivateFranchiseModal;
