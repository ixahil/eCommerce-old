import multer from "multer";
import fs from "fs";

const ensureDestinationPath = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

const storage = {
  subImages: (sku) =>
    multer.diskStorage({
      destination: async (req, file, cb) => {
        const uploadDir = `./public/static/products/images/${sku}`;
        ensureDestinationPath(uploadDir);
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        let fileExtension = "";
        if (file.originalname.split(".").length > 1) {
          fileExtension = file.originalname.substring(
            file.originalname.lastIndexOf(".")
          );
        }
        const fileNameWithoutExtension = file.originalname
          .toLowerCase()
          .split(".")
          .join("-")
          ?.split(".")[0];
        cb(null, fileNameWithoutExtension + Date.now() + fileExtension);
      },
    }),
};

export const upload = {
  subImages: (sku) => multer({ storage: storage.subImages(sku) }),
};
