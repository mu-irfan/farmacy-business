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
import { addProductFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, Plus, Trash } from "lucide-react";

import { activeIngredients, productCategory, units } from "@/constant/data";
import LabelInputContainer from "../LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDynamicFields from "@/hooks/useDynamicFields";
import { useSubscribeProduct } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SweetAlert } from "@/components/alerts/SweetAlert";

const AddProductForm = ({
  mode,
  productData,
  subscribe,
  currentFranchiseUuid,
  onClose,
}: {
  mode: "add" | "view" | "edit";
  productData?: any;
  subscribe?: boolean;
  currentFranchiseUuid?: string;
  onClose: any;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  const [selectedCategory, setSelectedCategory] = useState(
    productData?.category || ""
  );

  const [selectedImages, setSelectedImages] = useState<File[]>([]); // State for selected images
  const { inputFields, handleAddField, handleDeleteField } =
    useDynamicFields(0);
  const { mutate: subscribeProduct, isPending: subscribing } =
    useSubscribeProduct();

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      company_fk: "",
      category: "",
      sub_category: "",
      activeIngredient: "",
      concentration: "",
      units: "",
      package_weight: "",
      weight_unit: "",
      package_type: "",
      area_covered: "",
      price: "",
      disease_purpose: "",
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (productData) {
      reset({
        name: productData.name || "",
        company_fk: productData.company_fk || "",
        category: productData.category || "",
        sub_category: productData.sub_category || "",
        activeIngredient: productData.activeIngredient || "",
        concentration: productData.concentration || "",
        units: productData.units || "",
        package_weight: productData.package_weight || "",
        weight_unit: productData.weight_unit || "",
        package_type: productData.package_type || "",
        area_covered: productData.area_covered || "",
        disease_purpose: productData.disease_purpose || "",
        price: productData.price || "",
        description: productData.description || "",
      });
    }
  }, [productData, reset]);

  const onSubmit = (data: z.infer<typeof addProductFormSchema>) => {
    if (mode === "add" && selectedImages.length < 5) {
      alert("Please upload at least 5 images.");
      return;
    }
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

  const verifyToSubscribeProduct = async () => {
    onClose();
    const isConfirmed = await SweetAlert(
      "Subscribe Product?",
      "",
      "question",
      "Yes, subscribe it!",
      "#15803D"
    );
    if (isConfirmed) {
      subscribeProduct(
        {
          data: {
            franchise_fk: currentFranchiseUuid,
            product_fk: productData?.uuid,
          },
          token,
        },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name" className="dark:text-farmacieGrey">
              Product Name
            </Label>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Product name"
                      type="text"
                      id="name"
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
                      disabled={isViewMode}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue
                          placeholder={
                            productData?.category || "Select Category"
                          }
                          className=""
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
            <Label htmlFor="sub_category" className="dark:text-farmacieGrey">
              Sub category
            </Label>
            <FormField
              control={form.control}
              name="sub_category"
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
                        <SelectValue
                          placeholder={
                            productData?.sub_category || "Select Sub Category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Sub-Category</SelectLabel>
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
            <Label
              htmlFor="activeIngredient"
              className="dark:text-farmacieGrey"
            >
              Active Ingredient
            </Label>
            <FormField
              control={form.control}
              name="activeIngredient"
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
                        <SelectValue placeholder="Select Active Ingredient" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Active Ingredients</SelectLabel>
                          {activeIngredients.map((item) => (
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
          <div className="flex flex-col md:flex-row items-center w-full space-y-2 md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="concentration" className="dark:text-farmacieGrey">
                Concentration
              </Label>
              <FormField
                control={form.control}
                name="concentration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="John"
                        type="text"
                        id="concentration"
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
              <Label htmlFor="units" className="dark:text-farmacieGrey">
                Unit
              </Label>
              <FormField
                control={form.control}
                name="units"
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
                          <SelectValue placeholder="kg" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select unit</SelectLabel>
                            {units.map((item) => (
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
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                className="bg-primary text-farmacieWhite mt-5"
                type="button"
                onClick={handleAddField}
                disabled={isViewMode}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {inputFields.map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"
          >
            <LabelInputContainer>
              <Label
                htmlFor={`activeIngredient-${index}`}
                className="dark:text-farmacieGrey"
              >
                Active Ingredient
              </Label>
              <FormField
                control={form.control}
                name="activeIngredient"
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
                          <SelectValue placeholder="Select Active Ingredient" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Active Ingredients</SelectLabel>
                            {activeIngredients.map((item) => (
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
            <div className="flex flex-col md:flex-row items-center w-full space-y-2 md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label
                  htmlFor="concentration"
                  className="dark:text-farmacieGrey"
                >
                  Concentration
                </Label>
                <FormField
                  control={form.control}
                  name="concentration"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="John"
                          type="text"
                          id="concentration"
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
                <Label htmlFor="units" className="dark:text-farmacieGrey">
                  Unit
                </Label>
                <FormField
                  control={form.control}
                  name="units"
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
                            <SelectValue placeholder="kg" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Select unit</SelectLabel>
                              {units.map((item) => (
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
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  className="bg-red-500 hover:bg-red-600 text-black mt-5"
                  type="button"
                  onClick={() => handleDeleteField(index)}
                  disabled={isViewMode}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="package_weight" className="dark:text-farmacieGrey">
              Package Weight
            </Label>
            <FormField
              control={form.control}
              name="package_weight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Package Weight"
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
          <LabelInputContainer>
            <Label htmlFor="weight_unit" className="dark:text-farmacieGrey">
              Weight Unit
            </Label>
            <FormField
              control={form.control}
              name="weight_unit"
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
                        <SelectValue
                          placeholder={
                            productData?.weight_unit || "Select Weight Unit"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Weight-Unit</SelectLabel>
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
            <Label htmlFor="package_type" className="dark:text-farmacieGrey">
              Packaging type
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
                        field.onChange(value);
                      }}
                      disabled={isViewMode}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue
                          placeholder={
                            productData?.package_type || "Select Packaging type"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Packaging-Type</SelectLabel>
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
            <Label htmlFor="area_covered" className="dark:text-farmacieGrey">
              Area covered (acre)
            </Label>
            <FormField
              control={form.control}
              name="area_covered"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Area covered"
                      type="text"
                      id="area_covered"
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
          <LabelInputContainer>
            <Label htmlFor="disease_purpose" className="dark:text-farmacieGrey">
              Disease/Purpose
            </Label>
            <FormField
              control={form.control}
              name="disease_purpose"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter purpose or Disease keywords seperated by comma"
                      type="text"
                      id="disease_purpose"
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
          onClick={handleCardClick}
          aria-disabled={isViewMode}
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
          type={subscribe ? "button" : "submit"}
          disabled={isViewMode && !subscribe}
          onClick={subscribe ? verifyToSubscribeProduct : undefined}
        >
          {mode === "edit"
            ? "Update Product"
            : subscribe
            ? "Subscribe"
            : "Submit"}
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default AddProductForm;
