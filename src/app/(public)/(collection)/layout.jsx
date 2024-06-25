import Section from "@/components/layouts/Section";
import { ProductFilters } from "@/components/public/products";
import { FilterTags, SortBy } from "@/components/ui";
import { getBrands } from "@/lib/fetcher-server";

const tags = [
  "t-shirts",
  "t-shirts",
  "t-shirts",
  "t-shirts",
  "t-shirts",
  "tootebags ",
  "tootebags ",
  "tootebags ",
  "tootebags ",
  "tootebags ",
  "tootebags ",
  "tootebags ",
  "tootebags ",
];

const CollectionPageLayout = async ({ children }) => {
  const { data, error } = await getBrands();

  return (
    <Section className={"py-8 grid grid-cols-5 space-y-0 space-x-8"}>
      <ProductFilters brands={data?.brands} error={error} />
      <div className="col-span-4">
        <div className="pb-8 space-y-8">
          <SortBy classNames={"text-right space-x-2"} />
          <FilterTags tags={tags} />
        </div>
        <main>{children}</main>
      </div>
    </Section>
  );
};

export default CollectionPageLayout;
