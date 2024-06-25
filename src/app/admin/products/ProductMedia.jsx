"use client";
import { convertUrlsToFiles } from "@/utils/helpers";
import { Delete, DeleteIcon, LucideDelete, Trash, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProductMedia = ({ setValue, getValues, initialImages }) => {
  const [images, setImages] = useState([...initialImages]);

  const handleImage = (e) => {
    const urls = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...urls]);
    const prevImages = getValues("images") || [];
    const newImages = Array.from(e.target.files);

    setValue("images", [...prevImages, ...newImages]);
  };

  const handleDelete = async (image) => {
    setImages((prev) => prev.filter((v) => v !== image));
    const files = await convertUrlsToFiles(images.filter((v) => v !== image));
    setValue("images", files);
  };

  return (
    <div className="space-y-10">
      <div className="flex gap-4 flex-wrap">
        {images.map((v, k) => (
          <div className="relative" key={"product-image-" + k}>
            <Image
              src={v}
              alt={`product-image-${k}`}
              height={120}
              width={120}
            />

            <Trash
              className="absolute text-delete top-0 right-0 shadow-sm hover:animate-shake cursor-pointer"
              onClick={() => handleDelete(v)}
            />
          </div>
        ))}
      </div>
      <label className="flex items-center justify-center">
        <span className="sr-only">Upload Image</span>
        <label
          htmlFor="images"
          className="bg-transparent p-3 border rounded-lg cursor-pointer hover:bg-accent"
        >
          Add Images
        </label>
        <input
          type="file"
          name="images"
          id="images"
          multiple={true}
          onChange={(e) => handleImage(e)}
          className="block w-full text-sm text-slate-500 cursor-pointer
                    file:mr-4
                    file:py-3 file:px-6
                    file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primaryAccent file:text-black-700
                    hover:file:bg-primaryAccent/70
                    file:cursor-pointer
                    
                  "
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default ProductMedia;
