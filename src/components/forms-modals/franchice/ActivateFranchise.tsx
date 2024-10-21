import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ActivateFranchisePaymentModal from "./FranchiceActivatePayment";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import { useGetInActiveFranchises } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";

const ActivateFranchiseModal = ({ open, onOpenChange }: any) => {
  const { token } = useContextConsumer();
  const [isPaymentBulkActivateModalOpen, setPaymentBulkActivateModalOpen] =
    useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState<boolean[]>([]);

  // franchise
  const { data: inActiveFranchises, isLoading: loading } =
    useGetInActiveFranchises(token);

  useEffect(() => {
    if (inActiveFranchises?.data) {
      setSelectedAddresses(
        new Array(inActiveFranchises.data.length).fill(false)
      );
    }
  }, [inActiveFranchises]);

  const handleCheckboxChange = (index: number) => {
    setSelectedAddresses((prev) =>
      prev.map((selected, i) => (i === index ? !selected : selected))
    );
  };

  const handlePaymentBulkActivateModalOpen = () => {
    setPaymentBulkActivateModalOpen((prev) => !prev);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
          <DialogHeader className="mt-10 mb-4">
            <DialogTitle className="text-primary text-xl font-bold">
              Bulk Franchise Activate
            </DialogTitle>
            <DialogDescription className="md:flex items-center justify-between">
              <ul className="list-disc text-xs pl-3 space-y-2 mt-2 text-yellow-600 ">
                <li>
                  Price to activate single franchise is rupees:{" "}
                  <strong className="text-black dark:text-farmacieGrey">
                    500.00
                  </strong>
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
                className="font-medium border-primary dark:border-yellow-400 dark:text-yellow-500 mt-2 md:mt-0"
                type="button"
              >
                Payment Inquiry
              </Button>
            </DialogDescription>
          </DialogHeader>
          <Card className="w-full pt-4 rounded-xl text-center bg-primary/10">
            <div className="space-x-3 lg:space-x-6 pb-2 text-farmacieGrayModalText">
              <span>Count: {selectedAddresses.filter(Boolean).length}</span>
              <span>
                Price: {selectedAddresses.filter(Boolean).length * 500}
              </span>
              <span>
                Tax15%:{" "}
                {(
                  selectedAddresses.filter(Boolean).length *
                  500 *
                  0.15
                ).toFixed(2)}
              </span>
            </div>
            <CardTitle className="text-3xl lg:text-5xl font-bold text-primary">
              Rs:{" "}
              {(selectedAddresses.filter(Boolean).length * 500 * 1.15).toFixed(
                2
              )}
            </CardTitle>
            <CardContent className="text-farmacieGrayModalText">
              <p className="text-sm pt-3">Total bill including 15% Tax</p>
            </CardContent>
          </Card>
          <div className="max-h-[400px] overflow-y-auto space-y-4 scrollbar-custom">
            {inActiveFranchises?.data &&
              inActiveFranchises?.data?.length > 0 &&
              inActiveFranchises?.data?.map(
                (franchise: any, cardIndex: number) => (
                  <Card
                    key={franchise.uuid}
                    className="w-full pt-4 rounded-xl text-left bg-primary/10"
                  >
                    <CardContent>
                      <div className="flex items-center">
                        <CustomCheckbox
                          id={`checkbox-${cardIndex}`}
                          checked={selectedAddresses[cardIndex]}
                          onChange={() => handleCheckboxChange(cardIndex)}
                        />
                        <ul className="text-sm pl-10 space-y-2">
                          <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="text-farmacieGrey">Address:</span>
                            <span className="text-gray-800 font-light dark:text-white capitalize">
                              {franchise.address}
                            </span>
                          </li>
                          <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="text-farmacieGrey">Province:</span>
                            <span className="text-gray-800 font-light dark:text-white capitalize">
                              {franchise.province}
                            </span>
                          </li>
                          <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="text-farmacieGrey">District:</span>
                            <span className="text-gray-800 font-light dark:text-white capitalize">
                              {franchise.district}
                            </span>
                          </li>
                          <li className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="text-farmacieGrey">Tehsil:</span>
                            <span className="text-gray-800 font-light dark:text-white capitalize">
                              {franchise.tehsil}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
          </div>
          <Button
            className="w-full text-white font-medium"
            type="submit"
            onClick={handlePaymentBulkActivateModalOpen}
          >
            Continue to Payment
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
        </DialogContent>
      </Dialog>
      <ActivateFranchisePaymentModal
        open={isPaymentBulkActivateModalOpen}
        onOpenChange={setPaymentBulkActivateModalOpen}
      />
    </>
  );
};

export default ActivateFranchiseModal;
