import React, { useEffect, useState } from "react";
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
import { addFranchiseFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { productCategory } from "@/constant/data";
import { useContextConsumer } from "@/context/Context";

const AddFranchiceForm = ({ franchise }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("province");
  const { mode } = useContextConsumer();

  const form = useForm<z.infer<typeof addFranchiseFormSchema>>({
    resolver: zodResolver(addFranchiseFormSchema),
    defaultValues: {
      managerName: "",
      franchiseName: "",
      phoneNo: "",
      address: "",
      province: "",
      district: "",
      tehsil: "",
      remainingDays: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (franchise) {
      reset({
        managerName: franchise.managerName || "",
        franchiseName: franchise.franchiseName || "",
        phoneNo: franchise.phoneNo || "",
        address: franchise.address || "",
        province: franchise.province || "",
        district: franchise.district || "",
        tehsil: franchise.tehsil || "",
        remainingDays: franchise.remainingDays || "",
      });
    }
  }, [franchise, reset]);

  const onSubmit = (data: z.infer<typeof addFranchiseFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <Form {...form}>
      <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-4">
          <LabelInputContainer>
            <Label htmlFor="managerName" className="dark:text-farmacieGrey">
              Select Manager
            </Label>
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue
                          placeholder={
                            franchise?.managerName || "Select Franchise Manager"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Select Manager Name</SelectLabel>
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
          <ul className="list-disc text-xs pl-8 space-y-2 text-yellow-600">
            <li>
              Franchise manager is the person who can log in on farmacie and can
              manage franchise and catalog.
            </li>
            <li>
              Add new manager by creating profile to make it available in the
              drop down.
            </li>
          </ul>
          <LabelInputContainer className="mt-3">
            <Label htmlFor="franchiseName" className="dark:text-farmacieGrey">
              Franchise Name
            </Label>
            <FormField
              control={form.control}
              name="franchiseName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter franchise name"
                      type="text"
                      id="franchiseName"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phoneNo" className="dark:text-farmacieGrey">
              Franchise Contact (Optional)
            </Label>
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="0300 0000 000"
                      type="text"
                      id="phoneNo"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="remainingDays" className="dark:text-farmacieGrey">
              Remaining Days
            </Label>
            <FormField
              control={form.control}
              name="remainingDays"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="0300 0000 000"
                      type="text"
                      id="remainingDays"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="address" className="dark:text-farmacieGrey">
              Address
            </Label>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter address"
                      type="text"
                      id="address"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="province" className="dark:text-farmacieGrey">
              Province
            </Label>
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue
                          placeholder={franchise?.province || "Select province"}
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Select Province</SelectLabel>
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
            <Label htmlFor="district" className="dark:text-farmacieGrey">
              District
            </Label>
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue
                          placeholder={franchise?.district || "Select District"}
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Select Province</SelectLabel>
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
            <Label htmlFor="tehsil" className="dark:text-farmacieGrey">
              Tehsil
            </Label>
            <FormField
              control={form.control}
              name="tehsil"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue
                          placeholder={franchise?.tehsil || "Select Tehsil"}
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Select Province</SelectLabel>
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
        </div>
        <Button className="w-full text-white font-medium" type="submit">
          {mode === "edit" ? "Update" : "Submit Franchise"}
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default AddFranchiceForm;
