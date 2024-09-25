import React, { useState } from "react";
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

const AddFranchiceForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("province");

  const form = useForm<z.infer<typeof addFranchiseFormSchema>>({
    resolver: zodResolver(addFranchiseFormSchema),
    defaultValues: {
      managerName: "",
      phoneNo: "",
      address: "",
      province: "",
      district: "",
      tehsil: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addFranchiseFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <Form {...form}>
      <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-4">
          <LabelInputContainer>
            <Label htmlFor="managerName">Manager Name</Label>
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter franchise manager name"
                      type="text"
                      id="managerName"
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
            <Label htmlFor="phoneNo">Contact</Label>
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter contact no"
                      type="number"
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
            <Label htmlFor="address">Address</Label>
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
            <Label htmlFor="province">Province</Label>
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
                      <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select province" />
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
            <Label htmlFor="district">District</Label>
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
                      <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select District" />
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
            <Label htmlFor="tehsil">Tehsil</Label>
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
                      <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select Tehsil" />
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
          Submit Franchise
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default AddFranchiceForm;
