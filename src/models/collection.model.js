import mongoose, { Schema } from "mongoose";

const CollectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Collection Name is required"],
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
    order: {
      type: Number,
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

// Middleware to set the order sequence before saving a new category
CollectionSchema.pre("save", async function (next) {
  // Check if the category is being created for the first time
  this.$locals.isModified = true;
  if (this.isNew) {
    this.$locals.isModified = !true;
    // Find the highest order sequence currently in use
    const highestOrderCollection = await this.constructor.findOne(
      {},
      {},
      { sort: { order: -1 } }
    );

    // Set the order sequence for the new category
    this.order = highestOrderCollection ? highestOrderCollection.order + 1 : 1;
    this.handle = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
  next();
});

CollectionSchema.methods.removeProduct = async function (id) {
  this.products = this.products.filter((v) => v.toString() !== id.toString());

  await this.save();
};

CollectionSchema.methods.assignOwnerAndProduct = async function (owner, id) {
  this.owner = this.owner || owner;

  if (!this.products.includes(id)) {
    this.products.push(id);
  }

  return await this.save();
};

CollectionSchema.statics.findOneAndCreate = async function (
  newProduct,
  existingProduct
) {
  const existingCollection = await this.findOne({
    name: newProduct.collections.name,
  });

  if (!existingCollection) {
    const currentCollection = existingProduct
      ? await this.findOne({ name: existingProduct.collections.name })
      : null;

    if (currentCollection) {
      await currentCollection.removeProduct(existingProduct._id);
    }

    const newBrand = await this.create({ name: newProduct.collections.name });
    await newBrand.assignOwnerAndProduct(newProduct.owner, newProduct._id);
    return newBrand;
  }

  return await existingCollection.assignOwnerAndProduct(
    newProduct.owner,
    newProduct._id
  );
};

export const CollectionModal = mongoose.model("Collection", CollectionSchema);
