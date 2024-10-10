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
import { createAccountFormSchema } from "@/schemas/validation/validationSchema";
import LabelInputContainer from "../LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] =
    useState<boolean>(false);
  const form = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      compnayName: "",
      email: "",
      phoneNo: "",
      ntn: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: z.infer<typeof createAccountFormSchema>) => {
    console.log("Submitting form data:", data);
  };
  return (
    <Form {...form}>
      <form className="py-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="compnayName">Company Name</Label>
            <FormField
              control={form.control}
              name="compnayName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter company name"
                      type="text"
                      id="compnayName"
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
            <Label htmlFor="email">Email</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter company email"
                      type="email"
                      id="email"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNo">Contact</Label>
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter company contact number"
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
        <LabelInputContainer className="mb-4">
          <Label htmlFor="ntn">NTN</Label>
          <FormField
            control={form.control}
            name="ntn"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter NTN number"
                    type="number"
                    id="ntn"
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
          <Label htmlFor="password">Password</Label>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="outline-none focus:border-primary"
                    {...field}
                  />
                </FormControl>
                {!showPassword ? (
                  <Icon
                    name="Eye"
                    size={18}
                    className={cn(
                      "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                      !!form.formState.errors.password
                        ? "top-[20%]"
                        : "top-[32%]"
                    )}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Icon
                    name="EyeOff"
                    size={20}
                    className={cn(
                      "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                      !!form.formState.errors.password
                        ? "top-[20%]"
                        : "top-[32%]"
                    )}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type={confirmShowPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="outline-none focus:border-primary"
                    {...field}
                  />
                </FormControl>
                {!confirmShowPassword ? (
                  <Icon
                    name="Eye"
                    size={18}
                    className={cn(
                      "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                      !!form.formState.errors.password
                        ? "top-[20%]"
                        : "top-[32%]"
                    )}
                    onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                  />
                ) : (
                  <Icon
                    name="EyeOff"
                    size={20}
                    className={cn(
                      "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                      !!form.formState.errors.password
                        ? "top-[20%]"
                        : "top-[32%]"
                    )}
                    onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
        <Button className="w-full text-white font-medium" type="submit">
          Create Account <MoveRight className="w-5 h-5 ml-1" />
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default RegistrationForm;
