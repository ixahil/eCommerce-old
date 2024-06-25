import Section from "@/components/layouts/Section";
import ProductForm from "../ProductForm";
import { getData } from "@/lib/fetcher-server";

const page = async () => {
  const {
    data: { collection },
    error: collectionError,
  } = await getData({ endpoint: "collections" });
  const {
    data: { brands },
    error: brandError,
  } = await getData({ endpoint: "brands" });

  return (
    <Section heading={"add product"} breadCrumb={true} className={"py-0"}>
      <ProductForm collection={collection} brands={brands} type={"add"} />
    </Section>
  );
};

export default page;
