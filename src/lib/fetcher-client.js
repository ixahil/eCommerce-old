export async function fetchData({ endpoint }) {
  const api = `${process.env.NEXT_PUBLIC_API}${endpoint}`;
  try {
    const response = await fetch(api);

    if (response.status === 200) {
      const body = await response.json();
      return body.data;
    }

    if (response.status == 400) {
      throw new Error("400, Collection not exist");
    }

    if (response.status == 404) {
      throw new Error("404, Internal Server Error");
    }

    if (body.status == "fail") {
      throw new Error("404, Api not exist: " + endpoint);
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}

// export const fetchData = async ({ endpoint, params, tag }) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API}${endpoint}${params ? `?${params}` : ""}`,
//       {
//         cache: "no-cache",
//         credentials: "include",
//         next: { tags: [endpoint] },
//       }
//     );
//     const result = await res.json();
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
