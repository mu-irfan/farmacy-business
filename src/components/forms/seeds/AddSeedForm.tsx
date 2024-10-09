import React, { useEffect, useState } from "react";
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
import { addSeedFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { Textarea } from "../../ui/textarea";
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

const AddSeedForm = ({
  mode,
  seed,
  subscribe,
}: {
  mode: "add" | "view" | "edit";
  seed?: any;
  subscribe?: boolean;
}) => {
  const isViewMode = mode === "view";
  const [selectedCategory, setSelectedCategory] = useState(
    seed?.category || ""
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // State for selected images

  const form = useForm<z.infer<typeof addSeedFormSchema>>({
    resolver: zodResolver(addSeedFormSchema),
    defaultValues: {
      varietyName: "",
      brandName: "",
      category: "",
      crop: "",
      seedWeight: "",
      packageWeight: "",
      germinationPercentage: "",
      maturityPercentage: "",
      minHarvestingDays: "",
      maxHavestingDays: "",
      suitableRegion: "",
      packageType: "",
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (seed) {
      reset({
        varietyName: seed.varietyName || "",
        brandName: seed.brandName || "",
        category: seed.category || "",
        crop: seed.crop || "",
        seedWeight: seed.seedWeight || "",
        packageWeight: seed.packageWeight || "",
        germinationPercentage: seed.germinationPercentage || "",
        maturityPercentage: seed.maturityPercentage || "",
        minHarvestingDays: seed.minHarvestingDays || "",
        maxHavestingDays: seed.maxHavestingDays || "",
        suitableRegion: seed.suitableRegion || "",
        packageType: seed.packageType || "",
        description: seed.description || "",
      });
    }
  }, [seed, reset]);

  const onSubmit = (data: z.infer<typeof addSeedFormSchema>) => {
    if (mode === "add" && selectedImages.length < 5) {
      alert("Please upload at least 5 images.");
      return;
    }
    console.log("Submitting form data:", data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (selectedImages.length + files.length <= 10) {
        // Allow a maximum of 10 images
        setSelectedImages((prev) => [...prev, ...files]);
      } else {
        alert("You can upload a maximum of 10 images.");
      }
    }
  };

  const handleCardClick = () => {
    if (mode === "add") document.getElementById("fileInput")?.click();
  };

  return (
    <Form {...form}>
      <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="varietyName" className="dark:text-farmacieGrey">
              Seed Variety Name
            </Label>
            <FormField
              control={form.control}
              name="varietyName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter variety name"
                      type="text"
                      id="varietyName"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
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
            <Label htmlFor="brandName" className="dark:text-farmacieGrey">
              Brand Name
            </Label>
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Sygenta fixed"
                      type="text"
                      id="brandName"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
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
                        setSelectedCategory(value);
                        field.onChange(value);
                      }}
                      disabled={isViewMode}
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
                        setSelectedCategory(value);
                        // setValue("");
                        field.onChange(value);
                      }}
                      disabled={isViewMode}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Crop</SelectLabel>
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
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="seedWeight" className="dark:text-farmacieGrey">
              Seed weight (g)
            </Label>
            <FormField
              control={form.control}
              name="seedWeight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter seed in gram"
                      type="text"
                      id="seedWeight"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
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
            <Label htmlFor="packageWeight" className="dark:text-farmacieGrey">
              Package weight (kg)
            </Label>
            <FormField
              control={form.control}
              name="packageWeight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter package weight in kg"
                      type="text"
                      id="packageWeight"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label
              htmlFor="germinationPercentage"
              className="dark:text-farmacieGrey"
            >
              Germination Percentage
            </Label>
            <FormField
              control={form.control}
              name="germinationPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Germination Percentage"
                      type="text"
                      id="germinationPercentage"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
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
            <Label
              htmlFor="maturityPercentage"
              className="dark:text-farmacieGrey"
            >
              Maturity Percentage
            </Label>
            <FormField
              control={form.control}
              name="maturityPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter maturity percentage"
                      type="text"
                      id="maturityPercentage"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label
              htmlFor="minHarvestingDays"
              className="dark:text-farmacieGrey"
            >
              Min harvesting days
            </Label>
            <FormField
              control={form.control}
              name="minHarvestingDays"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter min days to reach harvesting"
                      type="text"
                      id="minHarvestingDays"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
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
            <Label
              htmlFor="maxHavestingDays"
              className="dark:text-farmacieGrey"
            >
              Max havesting days
            </Label>
            <FormField
              control={form.control}
              name="maxHavestingDays"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter max days to reach harvesting"
                      type="text"
                      id="maxHavestingDays"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="suitableRegion" className="dark:text-farmacieGrey">
              Suitable Region
            </Label>
            <FormField
              control={form.control}
              name="suitableRegion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                        field.onChange(value);
                      }}
                      disabled={isViewMode}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select Suitable region" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Suitable Region</SelectLabel>
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
            <Label htmlFor="packageType" className="dark:text-farmacieGrey">
              Package Type
            </Label>
            <FormField
              control={form.control}
              name="packageType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                        // setValue("");
                        field.onChange(value);
                      }}
                      disabled={isViewMode}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select package type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Package Type</SelectLabel>
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
        <LabelInputContainer className="mb-2.5">
          <Label htmlFor="description" className="dark:text-farmacieGrey">
            Description
          </Label>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description ..."
                    // type="text"
                    id="description"
                    className="outline-none focus:border-primary disabled:bg-primary/20"
                    {...field}
                    disabled={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </LabelInputContainer>
        <Card
          className="w-full mb-3 rounded-xl text-center bg-primary/10 border border-primary cursor-pointer aria-disabled:cursor-not-allowed"
          aria-disabled={isViewMode}
          onClick={handleCardClick}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium">
              {selectedImages.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                  {selectedImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Selected image ${index + 1}`}
                      className="h-20 w-20 object-cover m-1 rounded-md"
                    />
                  ))}
                </div>
              ) : (
                <CirclePlus className="h-5 w-5 mx-auto dark:text-green-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm dark:text-green-500">
              {selectedImages.length > 0
                ? `${selectedImages.length} Images Selected`
                : "Add Images"}
            </div>
          </CardContent>
        </Card>
        <Input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
        <Button
          className="w-full text-white font-medium"
          type="submit"
          disabled={isViewMode}
        >
          {mode === "edit" ? "Update Seed" : subscribe ? "Subscribe" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddSeedForm;
