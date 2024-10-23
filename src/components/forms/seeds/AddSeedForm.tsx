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
import AddSeedTrialDataInstructionModal from "@/components/forms-modals/seeds/AddSeedTrialDataInstr";
import { useCreateSeed, useSubscribeSeed } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import { baseUrl } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/SkeletonLoader";

const AddSeedForm = ({
  mode,
  seed,
  subscribe,
  currentFranchiseUuid,
  onClose,
  loading: seedLoading,
}: {
  mode: "add" | "view" | "edit";
  seed?: any;
  subscribe?: boolean;
  currentFranchiseUuid?: string;
  onClose: () => void;
  loading?: boolean;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    seed?.category || ""
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // State for selected images
  const [
    isAddSeedTrailDataInstructionModalOpen,
    setAddSeedTrailDataInstructionModalOpen,
  ] = useState(false);

  //
  const { mutate: subscribeSeed, isPending: subscribing } = useSubscribeSeed();
  const { mutate: addSeed, isPending: loading } = useCreateSeed();

  const form = useForm<z.infer<typeof addSeedFormSchema>>({
    resolver: zodResolver(addSeedFormSchema),
    defaultValues: {
      seed_variety_name: "",
      company_fk: "",
      category: "",
      crop: "",
      seed_weight: "",
      package_weight: "",
      germination_percentage: "",
      maturity_percentage: "",
      min_harvesting_days: "",
      max_harvesting_days: "",
      suitable_region: "",
      package_type: "",
      price: "",
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (seed) {
      reset({
        seed_variety_name: seed.seed_variety_name || "",
        company_fk: seed.company_fk || "",
        category: seed.category || "",
        crop: seed.crop || "",
        seed_weight: seed.seed_weight || "",
        package_weight: seed.package_weight || "",
        germination_percentage: seed.germination_percentage || "",
        maturity_percentage: seed.maturity_percentage || "",
        min_harvesting_days: seed.min_harvesting_days || "",
        max_harvesting_days: seed.max_harvesting_days || "",
        suitable_region: seed.suitable_region || "",
        package_type: seed.package_type || "",
        price: seed.price || "",
        description: seed.description || "",
      });
    }
  }, [seed, reset]);

  const onSubmit = (data: z.infer<typeof addSeedFormSchema>) => {
    if (mode === "add" && selectedImages.length < 1) {
      alert("Please upload at least 1 image.");
      return;
    }
    if (mode === "add") {
      addSeed(
        { data, token },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    }
    setAddSeedTrailDataInstructionModalOpen(true);
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

  const verifyToSubscribeSeed = async () => {
    onClose();
    const isConfirmed = await SweetAlert(
      "Subscribe Seed?",
      "",
      "warning",
      "Yes, subscribe it!",
      "#15803D"
    );
    if (isConfirmed) {
      subscribeSeed(
        {
          data: {
            franchise_fk: currentFranchiseUuid,
            seed_fk: seed?.uuid,
          },
          token,
        },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
              router.refresh();
            }
          },
        }
      );
    }
  };

  return (
    <>
      <Form {...form}>
        {seedLoading ? (
          <SkeletonCard className="h-[80vh] w-full" />
        ) : (
          <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="seed_variety_name"
                  className="dark:text-farmacieGrey"
                >
                  Seed Variety Name
                </Label>
                <FormField
                  control={form.control}
                  name="seed_variety_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter variety name"
                          type="text"
                          id="seed_variety_name"
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
                <Label htmlFor="company_fk" className="dark:text-farmacieGrey">
                  Brand Name
                </Label>
                <FormField
                  control={form.control}
                  name="company_fk"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Sygenta fixed"
                          type="text"
                          id="company_fk"
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
                          <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                            <SelectValue
                              placeholder={
                                seed?.crop_category || "Select Crop Category"
                              }
                            />
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
                          <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                            <SelectValue
                              placeholder={seed?.crop || "Select Crop"}
                            />
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
                <Label htmlFor="seed_weight" className="dark:text-farmacieGrey">
                  Seed weight (g)
                </Label>
                <FormField
                  control={form.control}
                  name="seed_weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter seed in gram"
                          type="text"
                          id="seed_weight"
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
                  htmlFor="package_weight"
                  className="dark:text-farmacieGrey"
                >
                  Package weight (kg)
                </Label>
                <FormField
                  control={form.control}
                  name="package_weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter package weight in kg"
                          type="text"
                          id="package_weight"
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
                  htmlFor="germination_percentage"
                  className="dark:text-farmacieGrey"
                >
                  Germination Percentage
                </Label>
                <FormField
                  control={form.control}
                  name="germination_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Germination Percentage"
                          type="text"
                          id="germination_percentage"
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
                  htmlFor="maturity_percentage"
                  className="dark:text-farmacieGrey"
                >
                  Maturity Percentage
                </Label>
                <FormField
                  control={form.control}
                  name="maturity_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter maturity percentage"
                          type="text"
                          id="maturity_percentage"
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
                  htmlFor="min_harvesting_days"
                  className="dark:text-farmacieGrey"
                >
                  Min harvesting days
                </Label>
                <FormField
                  control={form.control}
                  name="min_harvesting_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter min days to reach harvesting"
                          type="text"
                          id="min_harvesting_days"
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
                  htmlFor="max_harvesting_days"
                  className="dark:text-farmacieGrey"
                >
                  Max havesting days
                </Label>
                <FormField
                  control={form.control}
                  name="max_harvesting_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter max days to reach harvesting"
                          type="text"
                          id="max_harvesting_days"
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
                  htmlFor="suitable_region"
                  className="dark:text-farmacieGrey"
                >
                  Suitable Region
                </Label>
                <FormField
                  control={form.control}
                  name="suitable_region"
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
                          <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                            <SelectValue
                              placeholder={
                                seed?.suitable_region ||
                                "Select Suitable region"
                              }
                            />
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
                <Label
                  htmlFor="package_type"
                  className="dark:text-farmacieGrey"
                >
                  Package Type
                </Label>
                <FormField
                  control={form.control}
                  name="package_type"
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
                          <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                            <SelectValue
                              placeholder={
                                seed?.package_type || "Select package type"
                              }
                            />
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
            <LabelInputContainer className="mb-4">
              <Label htmlFor="price" className="dark:text-farmacieGrey">
                Price
              </Label>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Price"
                        type="text"
                        id="price"
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
            {!isViewMode && (
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
            )}
            {isViewMode && subscribe && seed?.seed_image?.length > 0 && (
              <div className="flex flex-wrap mb-4">
                {seed.seed_image.map((image: any, index: number) => (
                  <Image
                    key={index}
                    src={`${baseUrl.replace("/api", "")}${image.image_url}`}
                    alt={`Seed image ${index + 1}`}
                    className="h-32 w-32 object-cover m-1 rounded-md"
                    width={80}
                    height={80}
                  />
                ))}
              </div>
            )}
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
              type={subscribe ? "button" : "submit"}
              disabled={isViewMode && !subscribe}
              onClick={subscribe ? verifyToSubscribeSeed : undefined}
            >
              {mode === "edit"
                ? "Update Seed"
                : subscribe
                ? "Subscribe"
                : "Submit"}
            </Button>
          </form>
        )}
      </Form>
      <AddSeedTrialDataInstructionModal
        open={isAddSeedTrailDataInstructionModalOpen}
        onOpenChange={setAddSeedTrailDataInstructionModalOpen}
      />
    </>
  );
};

export default AddSeedForm;
