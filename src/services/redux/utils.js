import toast from "react-hot-toast";

export const apiBaseURL = process.env.NEXT_PUBLIC_API;

export const errorHandler = (err) => {
  if (err.status === "FETCH_ERROR") {
    toast.error("Internal server error!");
  }
  if (err.originalStatus === 404) {
    toast.error("Internal server error!");
  }
  if (err.status === 400) {
    toast.error(err.data.message);
  }
  if (err.status === 401) {
    toast.error(err.data.message);
  }
  if (err.status === 401) {
    toast.error(err.data.message);
  }
  if (err.status === 500) {
    toast.error(err.data.message);
  }
  return err;
};
export const transformResponse = (response) => {
  if (response.statusCode === 200) {
    if (response.message) {
      toast.success(response.message);
    }
  }
  const { data } = response;
  return data;
};

export async function urlToFile(url, index) {
  const response = await fetch(url);

  const contentType = response.headers.get("content-type");

  const blob = await response.blob();

  const extension = contentType.split("/")[1];
  const filename = `image_${index + 1}.${extension}`;

  return new File([blob], filename, { type: contentType });
}

export async function convertUrlsToFiles(urls) {
  const files = await Promise.all(urls.map((v, k) => urlToFile(v, k)));
  return files;
}

export const saveToLocalStorage = (state, name) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      window.localStorage.setItem(name, serializedState);
    }
  } catch (error) {
    console.log(error);
  }
};

export const loadFromLocalStorage = (item) => {
  try {
    const serializedState = window.localStorage.getItem(item);

    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
  }
};

// export const loadFromLocalStorage = () => {
//   let preloadedState;
//   const persistedState = localStorage?.getItem("cart");

//   if (persistedState) {
//     preloadedState = JSON.parse(persistedState);
//   }
//   return preloadedState;
// };
