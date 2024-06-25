import AdminSearch from "@/components/admin/admin-search";
import Section from "@/components/layouts/Section";
import { DataTable } from "@/components/shared/data-table/data-table";
import { Button, FilterPills } from "@/components/ui";
import { ItemsPerPage, Pagination } from "@/components/ui/pagination";
import {
  CustomersColumns,
  OrdersColumns,
  ProductColumns,
} from "@/constants/menu/columns";
import {
  CustomerFilters,
  OrderFilters,
  ProductFilters,
} from "@/constants/menu/filters";
import { getData } from "@/lib/fetcher-server";
import Link from "next/link";

const OrdersPage = async ({ searchParams }) => {
  const params = new URLSearchParams(searchParams);

  const { data, error } = await getData({
    endpoint: "orders",
    query: params.toString(),
  });

  return (
    <Section heading={"view orders"} className={"py-0"}>
      <FilterPills searchParams={searchParams} filters={OrderFilters} />
      <div className="flex justify-between">
        <AdminSearch
          placeholder={"Search for Orders..."}
          searchParams={searchParams}
        ></AdminSearch>
        <ItemsPerPage />
      </div>

      <DataTable columns={OrdersColumns} data={data?.orders} />

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

export default OrdersPage;
