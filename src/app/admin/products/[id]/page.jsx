import Section from "@/components/layouts/Section";
import React from "react";
import ProductForm from "../ProductForm";
import { getData } from "@/lib/fetcher-server";

const LandingPage = async ({ params: { id } }) => {
  const {
    data: { product },
    error,
  } = await getData({ endpoint: `products/product/${id}` });
  const {
    data: { collection },
  } = await getData({ endpoint: "collections" });
  const {
    data: { brands },
  } = await getData({ endpoint: "brands" });

  return (
    <Section heading={"edit product"} breadCrumb={true}>
      <ProductForm
        collection={collection}
        brands={brands}
        product={product}
        type={"edit"}
      />
    </Section>
  );
};

export default LandingPage;
