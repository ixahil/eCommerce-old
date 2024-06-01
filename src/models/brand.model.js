import mongoose, { Schema } from "mongoose";

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Name is required"],
      trim: true,
      unique: true,
    },
    handle: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    products: [
      {
        ref: "Product",
        type: Schema.Types.ObjectId,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

BrandSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.handle = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
  next();
});

// BrandSchema.statics.findOneAndCreate = async function (product) {
//   const existingBrand = await this.findOne({
//     name: product.brand.name,
//   });

//   if (!existingBrand) {
//     const brand = await this.create({ name: product.brand.name });
//     brand.owner = product.owner;
//     brand.products.push(product._id);
//     await brand.save();
//     return brand;
//   }

//   existingBrand.products.push(product._id);
//   await existingBrand.save();

//   return existingBrand;
// };

BrandSchema.methods.removeProduct = async function (id) {
  this.products = this.products.filter((v) => v.toString() !== id.toString());

  await this.save();
};

BrandSchema.methods.assignOwnerAndProduct = async function (owner, id) {
  this.owner = this.owner || owner;

  if (!this.products.includes(id)) {
    this.products.push(id);
  }

  return await this.save();
};
BrandSchema.statics.findOneAndCreate = async function (
  newProduct,
  existingProduct
) {
  const existingBrand = await this.findOne({ name: newProduct.brand.name });

  if (!existingBrand) {
    const currentBrand = existingProduct
      ? await this.findOne({ name: existingProduct.brand.name })
      : null;

    if (currentBrand) {
      await currentBrand.removeProduct(existingProduct._id);
    }

    const newBrand = await this.create({ name: newProduct.brand.name });
    await newBrand.assignOwnerAndProduct(newProduct.owner, newProduct._id);
    return newBrand;
  }

  return await existingBrand.assignOwnerAndProduct(
    newProduct.owner,
    newProduct._id
  );
};

export const BrandModel = mongoose.model("Brand", BrandSchema);
