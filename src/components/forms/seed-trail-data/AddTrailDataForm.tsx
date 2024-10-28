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
import { useCreateManager, useUpdateManager } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { Toaster } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ManagersData,
  productCategory,
  tehsils,
  TrailData,
} from "@/constant/data";
import DataTable from "@/components/Table/DataTable";

const AddTrailDataForm = ({
  showInsList,
  trailData,
  mode,
  loading,
  currentTrailDataUuid,
  onClose,
}: {
  showInsList?: boolean;
  trailData: any;
  mode: "add" | "view" | "edit";
  loading?: boolean;
  currentTrailDataUuid?: string;
  onClose: () => void;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  //   const { mutate: addManager, isPending: loading } = useCreateManager();
  //   const { mutate: updateManager, isPending: updating } =
  //     useUpdateManager(token);

  const form = useForm<z.infer<typeof addTrailDataFormSchema>>({
    resolver: zodResolver(addTrailDataFormSchema),
    defaultValues: {
      variety: "",
      sowingDate: "",
      city: "",
      tehsil: "",
      min_irrigation: "",
      max_irrigation: "",
      yield_percentage: "",
      start_day: "",
      end_day: "",
      kc: "",
    },
  });

  const TrailDataFormCols: {
    Header: string;
    accessor: TrailDataColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Stage", accessor: "stage" },
    { Header: "Principle Stage", accessor: "principle_stage" },
    {
      Header: "Start Day",
      accessor: "start_day",
      Cell: ({ row }: any) => (
        <LabelInputContainer className="w-20">
          <FormField
            control={form.control}
            name="start_day"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="text"
                    id="start_day"
                    className="outline-none focus:border-primary disabled:bg-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
      ),
    },
    {
      Header: "End Day",
      accessor: "end_day",
      Cell: ({ row }: any) => (
        <LabelInputContainer className="w-20">
          <FormField
            control={form.control}
            name="end_day"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="text"
                    id="end_day"
                    className="outline-none focus:border-primary disabled:bg-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
      ),
    },
    {
      Header: "Kc",
      accessor: "kc",
      Cell: ({ row }: any) => (
        <LabelInputContainer className="w-20">
          <FormField
            control={form.control}
            name="kc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="text"
                    id="kc"
                    className="outline-none focus:border-primary disabled:bg-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
      ),
    },
  ];

  const { reset } = form;
  //   useEffect(() => {
  //     if (manager) {
  //       reset({
  //         full_name: manager.full_name || "",
  //         contact: manager.contact || "",
  //       });
  //     }
  //   }, [manager, reset]);

  const onSubmit = (data: z.infer<typeof addTrailDataFormSchema>) => {
    console.log(data, "traildata");

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

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="variety" className="dark:text-farmacieGrey">
                Seed variety name
              </Label>
              <FormField
                control={form.control}
                name="variety"
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
                              // productData?.variety ||
                              "Select variety"
                            }
                            className=""
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>variety</SelectLabel>
                            {productCategory.map((item) => (
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
              <Label htmlFor="sowingDate" className="dark:text-farmacieGrey">
                Sowing Date
              </Label>
              <FormField
                control={form.control}
                name="sowingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter date"
                        type="text"
                        id="sowingDate"
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
                            placeholder={
                              // productData?.tehsil ||
                              "Select Tehsil"
                            }
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
                htmlFor="min_irrigation"
                className="dark:text-farmacieGrey"
              >
                Min irrigation (mm)
              </Label>
              <FormField
                control={form.control}
                name="min_irrigation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter min_irrigation name"
                        type="text"
                        id="min_irrigation"
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
                htmlFor="max_irrigation"
                className="dark:text-farmacieGrey"
              >
                Max irrigation (mm)
              </Label>
              <FormField
                control={form.control}
                name="max_irrigation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter max irrigation in mm"
                        type="text"
                        id="max_irrigation"
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
          <LabelInputContainer>
            <Label
              htmlFor="yield_percentage"
              className="dark:text-farmacieGrey"
            >
              Estimated yield (per acre)
            </Label>
            <FormField
              control={form.control}
              name="yield_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter yield percentage"
                      type="text"
                      id="yield_percentage"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <h2 className="py-8 text-yellow-600">Seed Trial Form</h2>
          <DataTable
            columns={TrailDataFormCols}
            data={TrailData as TrailData[]}
          />
          <Button
            className="w-full text-white font-medium mt-4"
            type="submit"
            disabled={isViewMode || loading}
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
