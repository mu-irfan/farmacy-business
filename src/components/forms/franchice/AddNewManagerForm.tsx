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
import { addManagerFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";

const AddManagerForm = ({
  showInsList,
  manager,
  mode,
}: {
  showInsList?: boolean;
  manager: any;
  mode: "add" | "view" | "edit";
}) => {
  const isViewMode = mode === "view";
  const form = useForm<z.infer<typeof addManagerFormSchema>>({
    resolver: zodResolver(addManagerFormSchema),
    defaultValues: {
      managerName: "",
      phoneNo: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (manager) {
      reset({
        managerName: manager.managerName || "",
        phoneNo: manager.phoneNo || "",
      });
    }
  }, [manager, reset]);

  const onSubmit = (data: z.infer<typeof addManagerFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <Form {...form}>
      <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-4">
          <LabelInputContainer>
            <Label htmlFor="managerName" className="dark:text-farmacieGrey">
              Manager Full Name
            </Label>
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter manager name"
                      type="text"
                      id="managerName"
                      className="outline-none focus:border-primary"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phoneNo" className="dark:text-farmacieGrey">
              Phone number
            </Label>
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Manager phone number"
                      type="number"
                      id="phoneNo"
                      className="outline-none focus:border-primary"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          {showInsList && (
            <ul className="list-disc text-xs pl-8 space-y-2 text-yellow-600">
              <li>The number should belongs to the franchise manager</li>
              <li>
                The manager can login in by simply entering the number and
                verify the OTP
              </li>
            </ul>
          )}
        </div>
        <Button
          className="w-full text-white font-medium mt-4"
          type="submit"
          disabled={isViewMode}
        >
          {mode === "add" ? "Create" : "Update"}
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default AddManagerForm;
