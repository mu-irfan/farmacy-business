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
import { filterSeedFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { cropCategories, cropCategoriesOptions } from "@/constant/data";
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
import { cn } from "@/lib/utils";

type SeedCategory = keyof typeof cropCategoriesOptions;

const FilterSeedForm = ({
  onSubmit,
}: {
  onSubmit: (data: { category: string; crop: string }) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SeedCategory | "">(
    ""
  );

  const form = useForm<z.infer<typeof filterSeedFormSchema>>({
    resolver: zodResolver(filterSeedFormSchema),
    defaultValues: {
      category: "",
      crop: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof filterSeedFormSchema>) => {
    onSubmit(data as any);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col space-y-2 gap-3 mb-4">
          <LabelInputContainer>
            <Label htmlFor="category" className="dark:text-farmacieGrey">
              Crop Category
            </Label>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value as any);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                          !field.value
                            ? "dark:text-farmaciePlaceholderMuted"
                            : "dark:text-farmacieWhite"
                        )}
                      >
                        <SelectValue placeholder="Select Crop Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {cropCategories.map((item) => (
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
                    >
                      <SelectTrigger
                        className={cn(
                          "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                          !field.value
                            ? "dark:text-farmaciePlaceholderMuted"
                            : "dark:text-farmacieWhite"
                        )}
                      >
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Crop</SelectLabel>
                          {selectedCategory &&
                            cropCategoriesOptions[selectedCategory]?.map(
                              (crop: any, ind: number) => (
                                <SelectItem key={ind} value={crop}>
                                  {crop}
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

export default FilterSeedForm;
