import AdminSearch from "@/components/admin/admin-search";
import Section from "@/components/layouts/Section";
import { DataTable } from "@/components/shared/data-table/data-table";
import { Button, FilterPills } from "@/components/ui";
import { ItemsPerPage, Pagination } from "@/components/ui/pagination";
import { ProductColumns } from "@/constants/menu/columns";
import { ProductFilters } from "@/constants/menu/filters";
import { getData } from "@/lib/fetcher-server";
import Link from "next/link";

const ProductsPage = async ({ searchParams }) => {
  const params = new URLSearchParams(searchParams);

  const { data, error } = await getData({
    endpoint: "products",
    query: params.toString(),
  });

  return (
    <Section heading={"view products"} className={"py-0"}>
      <FilterPills searchParams={searchParams} filters={ProductFilters} />
      <div className="flex justify-between">
        <AdminSearch
          placeholder={"Search for Products..."}
          searchParams={searchParams}
        >
          <Link className="" href={"products/add"}>
            <Button>Add</Button>
          </Link>
        </AdminSearch>
        <ItemsPerPage />
      </div>

      <DataTable columns={ProductColumns} data={data?.products} />

      <Pagination
        totalPages={data?.facets?.totalPages || 0}
        currentPage={data?.facets?.currentPage || 0}
        totalCount={data?.facets?.totalCount || 0}
        searchParams={searchParams}
        productStartIndex={data?.facets?.startIndex || 0}
      />
    </Section>
  );
};

export default ProductsPage;
