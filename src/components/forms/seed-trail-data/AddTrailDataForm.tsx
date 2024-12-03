import React, { useEffect } from "react";
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
import { addTrailDataFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import {
  useCreateSeedTrail,
  useGetAllSeeds,
  useGetAllSeedTrailsStagesFormFields,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { seedTrailTableHeaders, tehsils } from "@/constant/data";
import { SkeletonCard } from "@/components/SkeletonLoader";
import toast from "react-hot-toast";

const AddTrailDataForm = ({
  mode,
  onClose,
  cropName,
}: {
  mode: "add" | "view" | "edit";
  onClose: () => void;
  cropName: string;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  const { mutate: createSeedTrail, isPending: creating } = useCreateSeedTrail();
  const { data: seedTrailsStagesForm, isLoading: loadingStagesForm } =
    useGetAllSeedTrailsStagesFormFields(cropName ?? "", token);
  const { data: seedsVarieties, isLoading: loadingSeeds } =
    useGetAllSeeds(token);

  if (seedTrailsStagesForm?.data?.length <= 0) {
    onClose();
    toast.error(
      "The selected crop is not present in the agronomics simulator catalog. Please contact agronomics to add this crop and its stages!"
    );
  }
  const form = useForm<z.infer<typeof addTrailDataFormSchema>>({
    resolver: zodResolver(addTrailDataFormSchema),
    defaultValues: {
      seed_variety: "",
      sowing_date: "",
      city: "",
      tehsil: "",
      water_requirement_per_day: "",
      estimated_yield: "",
      seed_trial_form:
        (seedTrailsStagesForm?.data?.length > 0 &&
          seedTrailsStagesForm?.data?.map(() => ({
            start_day: "",
            end_day: "",
            kc: "",
          }))) ||
        [],
    },
  });

  const { setValue, watch, control } = form;
  const seedTrialForm = watch("seed_trial_form");

  useEffect(() => {
    seedTrialForm?.forEach((item, index) => {
      if (index > 0) {
        const previousEndDay = seedTrialForm[index - 1]?.end_day || "";
        setValue(`seed_trial_form.${index}.start_day`, previousEndDay);
      }
    });
  }, [seedTrialForm, setValue]);

  const selectedSeedUUID = seedsVarieties?.data.find(
    (item: any) => item.seed_variety_name === form.watch("seed_variety")
  )?.uuid;

  const onSubmit = (data: z.infer<typeof addTrailDataFormSchema>) => {
    let isValid = true;

    data.seed_trial_form.forEach((item, index, arr) => {
      if (index > 0) {
        item.start_day = arr[index - 1].end_day;
      }

      const startDay = parseInt(item.start_day, 10);
      const endDay = parseInt(item.end_day, 10);

      if (endDay <= startDay) {
        isValid = false;
        form.setError(`seed_trial_form.${index}.end_day`, {
          type: "manual",
          message: "End day must be greater than start day",
        });
      }
    });

    if (!isValid) return;

    const completeSeedTrialForm = data.seed_trial_form.map((item, index) => ({
      ...item,
      stage: seedTrailsStagesForm?.data[index].stage,
      sub_stage: seedTrailsStagesForm?.data[index].sub_stage,
      bbch_scale: seedTrailsStagesForm?.data[index].bbch_scale.toString(),
    }));

    const finalData = {
      ...data,
      seed_fk: selectedSeedUUID,
      seed_trial_form: completeSeedTrialForm,
    };

    if (mode === "add") {
      createSeedTrail(
        { data: finalData, token },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="seed_variety" className="dark:text-farmacieGrey">
                Seed variety name
              </Label>
              <FormField
                control={form.control}
                name="seed_variety"
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
                          <SelectValue placeholder="Select Seed Variety" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Seed variety</SelectLabel>
                            {seedsVarieties?.data
                              .filter((item: any) => item.crop === cropName)
                              .map((item: any) => (
                                <SelectItem
                                  key={item.uuid}
                                  value={item.seed_variety_name}
                                >
                                  {item.seed_variety_name}
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
            <LabelInputContainer>
              <Label htmlFor="sowing_date" className="dark:text-farmacieGrey">
                Sowing Date
              </Label>
              <FormField
                control={form.control}
                name="sowing_date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter date"
                        type="date"
                        id="sowing_date"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="tehsil" className="dark:text-farmacieGrey">
                Select Tehsil
              </Label>
              <FormField
                control={form.control}
                name="tehsil"
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
                            placeholder={"Select Tehsil"}
                            className=""
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select Tehsil</SelectLabel>
                            {tehsils.map((item) => (
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
            <LabelInputContainer>
              <Label htmlFor="city" className="dark:text-farmacieGrey">
                City
              </Label>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter city name"
                        type="text"
                        id="city"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="water_requirement_per_day"
                className="dark:text-farmacieGrey"
              >
                Water Requirment Per Day (mm)
              </Label>
              <FormField
                control={form.control}
                name="water_requirement_per_day"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter  Water Requirment Per Day"
                        type="text"
                        id="water_requirement_per_day"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label
                htmlFor="estimated_yield"
                className="dark:text-farmacieGrey"
              >
                Estimated yield (per acre)
              </Label>
              <FormField
                control={form.control}
                name="estimated_yield"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter yield percentage"
                        type="text"
                        id="estimated_yield"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <h2 className="py-8 text-yellow-600">Seed Trial Form</h2>
          <div className="overflow-x-auto">
            {!loadingStagesForm ? (
              seedTrailsStagesForm && seedTrailsStagesForm.data.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      {seedTrailTableHeaders.map((header) => (
                        <th
                          key={header.accessor}
                          className="px-4 py-2 border-b text-sm font-normal"
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {seedTrailsStagesForm?.data?.map(
                      (data: any, index: number) => (
                        <tr key={data.id}>
                          <td className="px-4 py-2 border-b text-sm font-normal">
                            {data.stage}
                          </td>
                          <td className="px-4 py-2 border-b text-sm font-normal">
                            {data.sub_stage}
                          </td>

                          <td className="px-4 py-2 border-b">
                            <FormField
                              control={form.control}
                              name={`seed_trial_form.${index}.start_day`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="0"
                                      type="text"
                                      className="outline-none focus:border-primary disabled:bg-primary/20"
                                      {...field}
                                      disabled={index > 0}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td>
                            <FormField
                              control={control}
                              name={`seed_trial_form.${index}.end_day`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      className="outline-none focus:border-primary"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const newEndDay = e.target.value;
                                        if (index < seedTrialForm.length - 1) {
                                          setValue(
                                            `seed_trial_form.${
                                              index + 1
                                            }.start_day`,
                                            newEndDay
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-4 py-2 border-b">
                            <FormField
                              control={form.control}
                              name={`seed_trial_form.${index}.kc`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter KC"
                                      type="number"
                                      className="outline-none focus:border-primary disabled:bg-primary/20"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <h2>No Stages are available for this crop</h2>
              )
            ) : (
              <SkeletonCard className="w-full h-80" />
            )}
          </div>
          <Button
            className="w-full text-white font-medium mt-4"
            type="submit"
            disabled={isViewMode || creating}
          >
            {mode === "add" ? "Submit" : "Update"}
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      </Form>
    </>
  );
};

export default AddTrailDataForm;
