import { cookies } from "next/headers";

// export const getData = async ({ endpoint, params, tag }) => {
//   const nextCookies = cookies();
//   const nextAuthSessionToken = nextCookies.get("accessToken");

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}${endpoint}${params ? `?${params}` : ""}`,
//       {
//         cache: "no-cache",
//         next: { tags: [endpoint] },
//         headers: {
//           Authorization: `Bearer ${nextAuthSessionToken?.value}`,
//         },
//         next: { tags: [endpoint] },
//       }
//     );
//     const result = await res.json();
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getData = async ({
  cache = "no-cache",
  endpoint,
  headers,
  query,
  tags,
  variables,
}) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("accessToken");
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_API);
  url.search = new URLSearchParams(query);

  try {
    const res = await fetch(url, {
      cache: cache,
      next: { tags: [endpoint] },
      headers: {
        Authorization: `Bearer ${nextAuthSessionToken?.value}`,
      },
    });

    if (res.status === 404) {
      return { data: null, error: "Internal Server Error" };
    }

    const body = await res.json();
    return { data: body.data, error: null };
  } catch (error) {}
};

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  query,
}) {
  const res = await getData({
    endpoint: `products/${collection}`,
    query,
  });
  return res;
}

export async function getCollections() {
  const res = await getData({ endpoint: `collections` });
  return res;
}

export async function getBrands() {
  const res = await getData({ endpoint: `brands` });
  return res;
}

export async function getSearchProducts({ query, reverse, sortKey }) {
  const res = await getData({ endpoint: `products`, query });

  return res;
}

// export const getData = async ({ endpoint, params, tag }) => {
//   const nextCookies = cookies();
//   const nextAuthSessionToken = nextCookies.get("accessToken");

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}${endpoint}${params ? `?${params}` : ""}`,
//       {
//         cache: "no-cache",
//         next: { tags: [endpoint] },
//         headers: {
//           Authorization: `Bearer ${nextAuthSessionToken?.value}`,
//         },
//         next: { tags: [endpoint] },
//       }
//     );
//     const result = await res.json();
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
