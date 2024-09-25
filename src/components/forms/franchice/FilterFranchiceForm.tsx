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
import { filterFranchiceFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { productCategory } from "@/constant/data";
import LabelInputContainer from "../LabelInputContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterFranchiceForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("province");

  const form = useForm<z.infer<typeof filterFranchiceFormSchema>>({
    resolver: zodResolver(filterFranchiceFormSchema),
    defaultValues: {
      province: "",
      district: "",
      tehsil: "",
    },
  });

  const onSubmit = (data: z.infer<typeof filterFranchiceFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 gap-3 mb-4">
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
                        <SelectValue placeholder="All Pakistan" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Province</SelectLabel>
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
                        // setValue("");
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="All districts" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>District</SelectLabel>
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
                        // setValue("");
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="All tehsils" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Tehsil</SelectLabel>
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
          Submit Filter
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default FilterFranchiceForm;
