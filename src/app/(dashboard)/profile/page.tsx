"use client";
import DashboardLayout from "../dashboard-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profileFormSchema } from "@/schemas/validation/validationSchema";
import LabelInputContainer from "@/components/forms/LabelInputContainer";
import { Label } from "@/components/ui/label";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      bio: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-center items-center mt-20">
        <h2
          className="font-semibold text-2xl md:text-4
        xl mt-4 text-neutral-800 dark:text-green-500"
        >
          Profile Details
        </h2>
        <p className="text-neutral-600 text-sm max-w-md text-center dark:text-neutral-300 mt-4 mb-8">
          Update your profile information here to ensure your details are
          current and accurate.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-6 space-y-4 flex flex-col items-stretch w-full max-w-xl border-2 border-primary p-20 rounded-lg"
          >
            <LabelInputContainer>
              <Label htmlFor="companyName" className="dark:text-farmacieGrey">
                Company Name
              </Label>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Agronomics"
                        type="text"
                        id="companyName"
                        className="outline-none focus:border-primary py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="email" className="dark:text-farmacieGrey">
                Company Email
              </Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="agronomics@gmail.com"
                        type="text"
                        id="email"
                        className="outline-none focus:border-primary py-5"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="email" className="dark:text-farmacieGrey">
                Company Contact
              </Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="03244534538"
                        type="text"
                        id="phoneNo"
                        className="outline-none focus:border-primary py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="email" className="dark:text-farmacieGrey">
                Company NTN
              </Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="NTN"
                        type="text"
                        id="ntn"
                        className="outline-none focus:border-primary py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <Button type="submit" className="my-4">
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
}
