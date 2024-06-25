import path from "path";
import { getLocalPath, getStaticPath } from "./index.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const generateImagePath = (dir, prefix, postfix, file) => {
  const uniqueId = uuidv4();
  const fileName = `${prefix}_${postfix}_${uniqueId}.${file.name
    .split(".")
    .pop()}`;
  const filepath = path.join(dir, fileName);
  return { fileName, filepath };
};

export const moveImage = async (req, folder, postfix) => {
  if (!req.files) {
    if (folder === "products/images") {
      const url = getStaticPath(
        req,
        "public/static/placeholders",
        "product-placeholder.png"
      );
      const localPath = getLocalPath(
        "public/static/placeholders",
        "product-placeholder.png"
      );
      return { mainImage: [{ url, localPath }] };
    } else {
      const url = getStaticPath(req, "public/static/placeholders", "user.jpg");
      const localPath = getLocalPath("public/static/placeholders", "user.jpg");
      return { avatar: [{ url, localPath }] };
    }
  }
  const dir = `public/static/${folder}/${postfix}`;
  const imageObj = {};

  const fields = Object.keys(req.files);

  for (const field of fields) {
    deleteImage(dir, field);
    const files = req.files[field];
    imageObj[field] = [];
    if (Array.isArray(files)) {
      for (const file of files) {
        const { fileName, filepath } = generateImagePath(
          dir,
          field,
          postfix,
          file
        );
        file.mv(filepath);
        const url = getStaticPath(req, dir, fileName);
        const localPath = getLocalPath(dir, fileName);
        imageObj[field].push({ url, localPath });
      }
    } else {
      const { fileName, filepath } = generateImagePath(
        dir,
        field,
        postfix,
        files
      );
      files.mv(filepath);
      const url = getStaticPath(req, dir, fileName);
      const localPath = getLocalPath(dir, fileName);
      imageObj[field].push({ url, localPath });
    }
  }

  return { ...imageObj };
};

export const deleteImage = (dir, prefix) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { recursive: true });
  files.forEach((file) => {
    if (file.startsWith(prefix + "_")) {
      const filePath = path.join(dir, file);
      fs.unlinkSync(filePath, { recursive: true });
    }
  });
};

export const deleteFolder = (dir) => {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true });
};
