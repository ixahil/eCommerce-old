import { ProductsGrid } from "@/components/public/products";
import { Pagination } from "@/components/ui/pagination";
import { getCollectionProducts, getData } from "@/lib/fetcher-server";
// import Pagination from "@/components/ui/pagination/Pagination";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }) {
  // const collection = await getCollection(params.collection);

  const collection = await getData({
    endpoint: `collections/${params.collection}`,
  });

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

const CollectionResultPage = async ({ params, searchParams }) => {
  const { data, error } = await getCollectionProducts({
    collection: params.collection,
    query: searchParams,
  });

  return (
    <>
      {error ? (
        <p className="text-center font-bold py-16">{error}</p>
      ) : (
        <ProductsGrid
          products={data?.products}
          className={"gap-y-16 gap-x-12"}
        />
      )}
      <Pagination
        totalPages={data?.facets?.totalPages || 0}
        currentPage={data?.facets?.currentPage || 0}
        totalCount={data?.facets?.totalCount || 0}
        searchParams={searchParams}
        productStartIndex={data?.facets?.startIndex || 0}
      />
    </>
  );
};

export default CollectionResultPage;
