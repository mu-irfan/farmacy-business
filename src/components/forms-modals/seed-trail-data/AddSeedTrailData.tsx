import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import AddTrailDataForm from "@/components/forms/seed-trail-data/AddTrailDataForm";

const AddSeedTrailDataModal: React.FC<any> = ({
  open,
  onOpenChange,
  mode,
  trailData,
  currentTrailDataUuid,
  loading,
}) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    if (open && mode !== "add") {
      setCurrentMode("view");
    }
  }, [open, mode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-3xl h-[90vh] lg:h-[95vh] overflow-y-auto scrollbar-custom">
        <DialogHeader
          className={cn(
            currentMode === "view"
              ? "flex flex-row items-center justify-between mt-8"
              : ""
          )}
        >
          <DialogTitle className="text-primary text-xl font-bold pt-8">
            {currentMode === "add"
              ? "Add Seed Trial Data"
              : "Update Seed Trial Data"}
          </DialogTitle>
          {currentMode === "view" && (
            <Button size="sm" onClick={() => setCurrentMode("edit")}>
              Edit <Pencil className="w-3.5 h-3.5 ml-2" />
            </Button>
          )}
          {currentMode === "add" && (
            <DialogDescription className="!dark:text-farmacieLightGray">
              Add seed trial data so that it can also be the part recomended
              crop list to the farmer
            </DialogDescription>
          )}
        </DialogHeader>
        <AddTrailDataForm
          mode={currentMode}
          trailData={trailData}
          currentTrailDataUuid={currentTrailDataUuid}
          onClose={onOpenChange}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddSeedTrailDataModal;
