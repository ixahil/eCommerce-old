export const createUrl = (pathname, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const relativeUrl = (pathname) => {
  return `/${pathname}`;
};

export const registerConstructor = ({
  name,
  type = "text",
  min,
  required = false,
}) => {
  const data = { type: type };
  if (required) {
    data.required = `${name} is required`;
    data.minLength = min && {
      value: min,
      message: `${name} must be at least ${min} characters`,
    };
  }
  return {
    ...data,
  };
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
