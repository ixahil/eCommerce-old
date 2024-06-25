"use client";
import Container from "@/components/layouts/Container";
import { Button } from "@/components/ui";
import FormField from "@/components/ui/form-field";
import useMutation from "@/hooks/useMutation";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/services/redux/api/product-api";
import { convertUrlsToFiles } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ProductMedia from "./ProductMedia";
import SelectBox from "@/components/ui/select";

// const SelectBox = dynamic(() => import("@/components/ui"), {
//   loading: () => <input />,
//   ssr: false,
// });

const ProductForm = ({
  collection,
  brands,
  product: { brand, collections, subImages, mainImage, ...restProduct } = {},
  type,
}) => {
  const [initialImages, setInitialImages] = useState([
    mainImage?.url,
    ...((subImages && subImages.flatMap((v) => v.url)) || []),
  ]);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await convertUrlsToFiles(initialImages);
      setValue("images", files);
    };

    if (mainImage || subImages) {
      fetchFiles();
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    defaultValues: {
      brand: {
        label: brand?.name,
        value: brand?.handle,
      },
      collection: {
        label: collections?.name,
        value: collections?.handle,
      },
      isVisible: restProduct.isVisible || true,
      ...restProduct,
    },
  });
  const [addProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const useMutate = useMutation();

  const onSubmit = async (data) => {
    data.collection = data.collection.label;

    data.brand = data.brand.label;
    data.mainImage = data?.images?.[0];

    data.images = data?.images?.slice(1);

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    data.images &&
      data.images.forEach((file, index) => {
        formData.append("subImages", file);
      });

    switch (type) {
      case "add":
        useMutate({
          fn: addProduct,
          data: formData,
          message: "Product added successfully",
          redirect: "./",
        });
        break;
      case "edit":
        useMutate({
          fn: updateProduct,
          endpoint: data.sku,
          data: formData,
          message: "Product updated successfully",
        });
        break;
      default:
        break;
    }
  };

  const registerConstructor = ({
    name,
    type = "text",
    min,
    required = false,
  }) => {
    const data = { type: type };
    if (required) {
      data.required = `${name} is required`;
      data.minLength = min && {
        value: min,
        message: `${name} must be at least ${min} characters`,
      };
    }
    return {
      ...data,
    };
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <div className="flex flex-row-reverse gap-2">
          <FormField
            className={"size-6 mt-0 ml-0"}
            name={"isVisible"}
            type="checkbox"
            label={"Visible on Storefront"}
            register={register}
          />
        </div>
        <div className="flex gap-4">
          <Button
            disabled={isLoading}
            variant={"delete"}
            type={"reset"}
            buttonType={"outline"}
          >
            Discard Changes
          </Button>

          <Button disabled={isLoading} isLoading={isLoading}>
            Save Product
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 h-full gap-y-8 xl:gap-8">
        <Container className={"border-none col-span-2 xl:p-0 p-0"}>
          <Container title={"General Information"} className={""}>
            <div className="space-y-2 ">
              <div className="flex flex-row-reverse gap-2">
                <FormField
                  className={"size-6 mt-0 ml-0"}
                  name={"isFeatured"}
                  type="checkbox"
                  label={"Featured Product"}
                  register={register}
                />
              </div>
              <FormField
                name={"name"}
                label={"Product Name"}
                placeholder={"Product Name"}
                register={register}
                error={errors.name}
              />
            </div>
            <div className="space-y-2">
              <Controller
                control={control}
                name="brand"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <SelectBox
                    placeholder={"Select Brand Name..."}
                    label={"Brand Name"}
                    required={true}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={brands}
                    error={errors?.brand?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                name={"description"}
                label={"Description"}
                type="text-area"
                placeholder={"Product Description..."}
                register={register}
                error={errors.description}
              />
            </div>
          </Container>
          <Container title={"Pricing"} className={""}>
            <div className="space-y-2">
              <FormField
                label={"Base Price"}
                name={"price"}
                type="currency"
                placeholder={0}
                min={0}
                register={register}
              />
            </div>
          </Container>
          <Container title={"Inventory"} className={""}>
            <div className="flex w-full gap-2">
              <div className="space-y-2 w-full">
                <FormField
                  label={"Sku"}
                  name={"sku"}
                  placeholder={"113902"}
                  register={register}
                  error={errors.sku}
                />
              </div>
              <div className="space-y-2 w-full">
                <FormField
                  label={"Stock"}
                  name={"stock"}
                  type="number"
                  placeholder={0}
                  min={0}
                  register={register}
                />
              </div>
            </div>
          </Container>
        </Container>
        <Container className={"border-none col-span-1 xl:p-0 p-0"}>
          <Container title={"Product Media"} className={""}>
            <ProductMedia
              setValue={setValue}
              getValues={getValues}
              initialImages={initialImages}
            />
          </Container>
          <Container title={"Category"} className={""}>
            <Controller
              control={control}
              name="collection"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <SelectBox
                  placeholder={"Select Category..."}
                  label={"Product Category"}
                  required={true}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  options={collection}
                  error={errors?.collection?.message}
                />
              )}
            />
          </Container>
          <Container title={"Shipping Details"}>
            <div className="space-y-2">
              <FormField
                name={"fixedShippingPrice"}
                min={0}
                label={"Fixed Shipping Price"}
                placeholder={"0"}
                type="currency"
                register={register}
                error={errors.fixedShippingPrice}
              />
            </div>
            <div className="flex flex-row-reverse gap-2">
              <FormField
                className={"size-6 mt-0 ml-0"}
                name={"isFreeShipping"}
                type="checkbox"
                label={"Free Shipping"}
                register={register}
              />
            </div>
          </Container>
        </Container>
      </div>
    </form>
  );
};

export default ProductForm;
