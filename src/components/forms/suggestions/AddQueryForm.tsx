import React from "react";
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
import { addQueryFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import LabelInputContainer from "../LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";

const AddQueryForm = () => {
  const form = useForm<z.infer<typeof addQueryFormSchema>>({
    resolver: zodResolver(addQueryFormSchema),
    defaultValues: {
      contactEmail: "",
      query: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addQueryFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <Form {...form}>
      <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
        <LabelInputContainer className="my-6">
          <Label htmlFor="contactEmail" className="dark:text-farmacieGrey">
            Your Contact Email
          </Label>
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Leave empty for default company email or write new "
                    type="email"
                    id="contactEmail"
                    className="outline-none focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="query" className="dark:text-farmacieGrey">
            Query
          </Label>
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter product query ..."
                    // type="text"
                    id="query"
                    className="outline-none focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
        <Button className="w-full text-white font-medium" type="submit">
          Submit Query
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default AddQueryForm;
