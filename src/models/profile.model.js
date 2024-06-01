import mongoose, { Schema } from "mongoose";
import { UserModel } from "./index.js";

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "John",
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      default: "Doe",
      required: [true, "Last Name is required"],
    },
    countryCode: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: Number,
      default: "",
    },
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `http://localhost:8080/public/static/placeholders/user.jpg`,
        localPath: "public/static/placeholders/user.jpg",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

profileSchema.post("save", async (profile, next) => {
  const user = await UserModel.findOne({ _id: profile.owner });

  if (user) {
    user.profile = profile._id;
    user.save();
    console.log("saved");
  }
});

export const EcomProfileModel = mongoose.model("EcomProfile", profileSchema);
