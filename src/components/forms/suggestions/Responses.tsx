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
import { queryResponseSchema } from "@/schemas/validation/validationSchema";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { Input } from "@/components/ui/input";
import { CornerDownLeft, Plus } from "lucide-react";

const Responses = ({ query, response }: any) => {
  const form = useForm<z.infer<typeof queryResponseSchema>>({
    resolver: zodResolver(queryResponseSchema),
    defaultValues: {
      query: "",
      response: "",
    },
  });

  const onSubmit = (data: z.infer<typeof queryResponseSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4 flex justify-start">
          <div className="max-w-[75%] bg-primary/10 dark:bg-farmacieLightSecondary p-3 rounded-lg shadow-sm text-sm">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div className="dark:text-farmacieDarkSecondary">{query}</div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="max-w-[75%]  dard:text-white p-3 border border-farmaciePlaceholderMuted rounded-lg shadow-sm text-sm">
            <FormField
              control={form.control}
              name="response"
              render={({ field }) => (
                <FormItem>
                  <div className="dark:text-farmacieDarkSecondary">
                    {response}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <LabelInputContainer className="mt-20">
          <FormField
            control={form.control}
            name="response"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    placeholder="Query Further ..."
                    type="text"
                    id="varietyName"
                    className="outline-none border py-6 border-primary rounded-full pl-5 pr-20 font-light"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5 absolute right-3.5 w-10 h-7 top-4 -translate-y-1/2 bottom-0.5 rounded-full"
                >
                  <CornerDownLeft className="size-4" />
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default Responses;
