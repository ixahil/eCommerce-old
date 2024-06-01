export const getStaticProductImagePath = (req, sku, fileName) => {
  return `${req.protocol}://${req.get(
    "host"
  )}/public/static/products/images/${sku}/${fileName}`;
};

export const getLocalproductImagePath = (sku, fileName) => {
  return `public/static/images/${sku}/${fileName}`;
};

export const getStaticAvatarImagePath = (req, username, fileName) => {
  if (!username)
    return `${req.protocol}://${req.get("host")}/public/static/users/user.jpg`;
  return `${req.protocol}://${req.get(
    "host"
  )}/public/static/users/${username}/${fileName}`;
};

export const getLocalAvatarImagePath = (username, fileName) => {
  if (!username) return `public/static/users/user.jpg`;
  return `public/static/users/${username}/${fileName}`;
};

export const getStaticPath = (req, dir, fileName) => {
  return `${req.protocol}://${req.get("host")}/${dir}/${fileName}`;
};

export const getLocalPath = (dir, fileName) => {
  return `${dir}/${fileName}`;
};

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
