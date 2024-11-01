import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const nutrientData = [
  {
    crop: "Wheat",
    contents: [
      { label: "High Protein Content", value: "12.0% - 15.0%" },
      { label: "Medium Protein Content", value: "10.5% - 12.0%" },
      { label: "Low Protein Content", value: "8.5% - 10.5%" },
      { label: "High Gluten", value: "13% - 14%" },
      { label: "Medium Gluten", value: "11% - 12%" },
      { label: "Low Gluten", value: "7% - 10%" },
    ],
  },
  {
    crop: "Peanut",
    contents: [
      { label: "High Oleic Acid Content", value: "More than 70%" },
      { label: "Medium Oleic Acid Content", value: "55% - 70%" },
      { label: "Low Oleic Acid Content", value: "Less than 55%" },
      { label: "High Oil Content", value: "Less than 12%" },
      { label: "Medium Oil Content", value: "12% - 15%" },
      { label: "Low Oil Content", value: "More than 15%" },
    ],
  },
  {
    crop: "Rice",
    contents: [
      { label: "Extra long Grain length", value: "More than 7.50 mm" },
      { label: "Long Grain length", value: "6.61 - 7.50 mm" },
      { label: "Medium Grain length", value: "5.51 - 6.60 mm" },
      { label: "Short Grain length", value: "Less than 5.50 mm" },
    ],
  },
  {
    crop: "Barley",
    contents: [
      { label: "High Protein Content", value: "More than 12%" },
      { label: "Medium Protein Content", value: "10% - 12%" },
      { label: "Low Protein Content", value: "Less than 10%" },
    ],
  },
  {
    crop: "Maize",
    contents: [
      { label: "High Crude Protein", value: "10% - 12%" },
      { label: "Medium Crude Protein", value: "7% - 9%" },
      { label: "Low Crude Protein", value: "4% - 6%" },
      { label: "High Crude Fiber", value: "3% - 4%" },
      { label: "Medium Crude Fiber", value: "2% - 3%" },
      { label: "Low Crude Fiber", value: "1% - 2%" },
    ],
  },
];

const NutrientContentModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl h-[90vh] lg:h-[95vh] overflow-y-auto scrollbar-custom">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-primary text-xl font-bold">
            Nutrient Content Instruction
          </DialogTitle>
          <DialogDescription className="!dark:text-farmacieLightGray py-4">
            <div className="space-y-6 mt-6">
              {nutrientData.map((cropData, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">
                    {cropData.crop}
                  </h3>
                  <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 shadow-md">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          <th className="pb-2 font-medium text-sm">Property</th>
                          <th className="pb-2 font-medium text-sm">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cropData.contents.map((content, idx) => (
                          <tr
                            key={idx}
                            className="border-t border-neutral-300 dark:border-neutral-700"
                          >
                            <td className="py-2">{content.label}</td>
                            <td className="py-2">{content.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NutrientContentModal;
