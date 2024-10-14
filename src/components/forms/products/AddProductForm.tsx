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

const AddProductForm = ({
  mode,
  productData,
  subscribe,
}: {
  mode: "add" | "view" | "edit";
  productData?: any;
  subscribe?: boolean;
}) => {
  const isViewMode = mode === "view";
  const [selectedCategory, setSelectedCategory] = useState(
    productData?.category || ""
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // State for selected images
  const { inputFields, handleAddField, handleDeleteField } =
    useDynamicFields(0);

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      productName: "",
      brandName: "",
      category: "",
      subCategory: "",
      activeIngredient: "",
      concentration: "",
      units: "",
      packageWeight: "",
      weightUnit: "",
      packagingType: "",
      areaCovered: "",
      price: "",
      disease: "",
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (productData) {
      reset({
        productName: productData.productName || "",
        brandName: productData.brandName || "",
        category: productData.category || "",
        subCategory: productData.subCategory || "",
        activeIngredient: productData.activeIngredient || "",
        concentration: productData.concentration || "",
        units: productData.units || "",
        packageWeight: productData.packageWeight || "",
        weightUnit: productData.weightUnit || "",
        packagingType: productData.packagingType || "",
        areaCovered: productData.areaCovered || "",
        disease: productData.disease || "",
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
            <Label htmlFor="productName" className="dark:text-farmacieGrey">
              Product Name
            </Label>
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Product name"
                      type="text"
                      id="productName"
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
                      // defaultValue={field.value.toString()}
                      disabled={isViewMode}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue
                          placeholder="Select Category"
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
            <Label htmlFor="subCategory" className="dark:text-farmacieGrey">
              Sub category
            </Label>
            <FormField
              control={form.control}
              name="subCategory"
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
                        <SelectValue placeholder="Select SubCategory" />
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
            <Label htmlFor="packageWeight" className="dark:text-farmacieGrey">
              Package Weight
            </Label>
            <FormField
              control={form.control}
              name="packageWeight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Package Weight"
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
          <LabelInputContainer>
            <Label htmlFor="weightUnit" className="dark:text-farmacieGrey">
              Weight Unit
            </Label>
            <FormField
              control={form.control}
              name="weightUnit"
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
                        <SelectValue placeholder="Select Weight Unit" />
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
            <Label htmlFor="packagingType" className="dark:text-farmacieGrey">
              Packaging type
            </Label>
            <FormField
              control={form.control}
              name="packagingType"
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
                        <SelectValue placeholder="Select Packaging type" />
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
            <Label htmlFor="areaCovered" className="dark:text-farmacieGrey">
              Area covered (acre)
            </Label>
            <FormField
              control={form.control}
              name="areaCovered"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Area covered"
                      type="text"
                      id="areaCovered"
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
            <Label htmlFor="disease" className="dark:text-farmacieGrey">
              Disease/Purpose
            </Label>
            <FormField
              control={form.control}
              name="disease"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter purpose or disease keywords seperated by comma"
                      type="text"
                      id="disease"
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
          type="submit"
          disabled={isViewMode}
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
