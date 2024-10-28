import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { crops } from "@/constant/data";
import LabelInputContainer from "@/components/forms/LabelInputContainer";
import { Label } from "@/components/ui/label";
import { useContextConsumer } from "@/context/Context";
import { addCropSelectionFormSchema } from "@/schemas/validation/validationSchema";
import AddSeedTrailDataModal from "./AddSeedTrailData";

const AddCropSelectionSeedTrailDataModal: React.FC<any> = ({
  open,
  onOpenChange,
  mode,
  trailData,
  currentTrailDataUuid,
  loading,
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  const [currentMode, setCurrentMode] = useState(mode);
  const [isAddSeedTrailDataModalOpen, setAddSeedTrailDataModalOpen] =
    useState(false);

  //   const { mutate: addManager, isPending: loading } = useCreateManager();
  //   const { mutate: updateManager, isPending: updating } =
  //     useUpdateManager(token);

  const form = useForm<z.infer<typeof addCropSelectionFormSchema>>({
    resolver: zodResolver(addCropSelectionFormSchema),
    defaultValues: {
      crop: "",
    },
  });

  const { reset } = form;
  //   useEffect(() => {
  //     if (manager) {
  //       reset({
  //         full_name: manager.full_name || "",
  //         contact: manager.contact || "",
  //       });
  //     }
  //   }, [manager, reset]);

  const onSubmit = (data: z.infer<typeof addCropSelectionFormSchema>) => {
    setAddSeedTrailDataModalOpen((prev: any) => !prev);
    //     if (mode === "add") {
    //       addManager(
    //         { data, token },
    //         {
    //           onSuccess: (log) => {
    //             if (log?.success) {
    //               onClose();
    //             }
    //           },
    //         }
    //       );
    //     } else if (mode === "edit") {
    //       const updatedData = { full_name: data.full_name, uuid: manager?.uuid };
    //       updateManager(updatedData, {
    //         onSuccess: (log) => {
    //           if (log?.success) {
    //             onClose();
    //           }
    //         },
    //       });
    //     }
  };

  useEffect(() => {
    if (open && mode !== "add") {
      setCurrentMode("view");
    }
  }, [open, mode]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-xl h-[50vh] lg:h-[55vh] overflow-y-auto scrollbar-custom">
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
          <ul className="list-disc text-xs pl-8 space-y-2 text-yellow-600">
            <li>
              If you are the seed producer, Kindly provide the seed trial data.
            </li>
            <li>
              Trial data in needed to check the seed suitability and gdd
              calculation.
            </li>
            <li>
              These seed will be recommended to farmers on the basis of their
              suitability.
            </li>
            <li>
              These seeds will become the part of suitable crop list in
              agronomics app.
            </li>
            <li>
              It is recommended to add{" "}
              <strong className="text-white font-normal">
                {" "}
                2 to 3 trials{" "}
              </strong>{" "}
              of different location.
            </li>
          </ul>
          <Form {...form}>
            <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
              <LabelInputContainer>
                <Label htmlFor="crop" className="dark:text-farmacieGrey">
                  Crop
                </Label>
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          disabled={isViewMode}
                        >
                          <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                            <SelectValue
                              placeholder={
                                // productData?.crop ||
                                "Select crop"
                              }
                              className=""
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>crop</SelectLabel>
                              {crops.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
              <Button
                className="w-full text-white font-medium mt-4"
                type="submit"
                disabled={isViewMode || loading}
              >
                {mode === "add" ? "Add Trial Data" : "Update"}
              </Button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AddSeedTrailDataModal
        open={isAddSeedTrailDataModalOpen}
        onOpenChange={setAddSeedTrailDataModalOpen}
        mode="add"
      />
    </>
  );
};

export default AddCropSelectionSeedTrailDataModal;
