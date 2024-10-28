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
import { filterProductsFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { productCategory, productsList } from "@/constant/data";
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

const FilterProductForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("fertilizer");

  const form = useForm<z.infer<typeof filterProductsFormSchema>>({
    resolver: zodResolver(filterProductsFormSchema),
    defaultValues: {
      category: "",
      allSubCategories: "",
    },
  });

  const onSubmit = (data: z.infer<typeof filterProductsFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 gap-3 mb-4">
          <LabelInputContainer>
            <Label htmlFor="category" className="dark:text-farmacieGrey">
              Category
            </Label>
            <FormField
              control={form.control}
              name="category"
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
                        <SelectValue placeholder="Select Crop Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
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
            <Label
              htmlFor="allSubCategories"
              className="dark:text-farmacieGrey"
            >
              All Sub-Categories
            </Label>
            <FormField
              control={form.control}
              name="allSubCategories"
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
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select All Sub-Categories" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Sub-Category</SelectLabel>
                          {selectedCategory &&
                            productsList[selectedCategory]?.map(
                              (subCategory: any, ind: number) => (
                                <SelectItem key={ind} value={subCategory}>
                                  {subCategory}
                                </SelectItem>
                              )
                            )}
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

export default FilterProductForm;
