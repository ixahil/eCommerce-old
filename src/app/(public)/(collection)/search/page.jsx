import { ProductsGrid } from "@/components/public/products";
import { Pagination } from "@/components/ui/pagination";
import { getData, getSearchProducts } from "@/lib/fetcher-server";

const SearchResultPage = async ({ params, searchParams }) => {
  const { data, error } = await getSearchProducts({ query: searchParams });

  return (
    <>
      {error ? (
        <p className="text-center font-bold py-16">{error}</p>
      ) : (
        <ProductsGrid
          products={data?.products}
          error={error}
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

export default SearchResultPage;
