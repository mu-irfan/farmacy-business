import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { queryResponseSchema } from "@/schemas/validation/validationSchema";
import { Button } from "@/components/ui/button";

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
          <div className="max-w-[75%] bg-primary/10 dark:bg-primary/40 p-3 rounded-lg shadow-sm text-sm">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div>{query}</div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="max-w-[75%]  text-white p-3 rounded-lg shadow-sm text-sm">
            <FormField
              control={form.control}
              name="response"
              render={({ field }) => (
                <FormItem>
                  <div>{response}</div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4 flex justify-start">
          <div className="max-w-[75%] bg-primary/10 dark:bg-primary/40 p-3 rounded-lg shadow-sm text-sm">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div>
                    Ingredient list while adding the product in the global list.
                    Kindly add this active ingredient.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="max-w-[75%] bg-primary/70 text-white p-3 rounded-lg shadow-sm text-sm">
            <FormField
              control={form.control}
              name="response"
              render={({ field }) => (
                <FormItem>
                  <div>
                    Your active ingredient is successfully added in the global
                    list.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full border-primary text-primary font-medium mt-8"
          type="submit"
        >
          Mark as read
        </Button>
        <Button className="w-full text-white font-medium mt-2" type="submit">
          Mark as read and delete
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default Responses;
