import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      default: orderNumber,
      unique: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    discountedOrderPrice: {
      type: Number,
      required: true,
    },
    items: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
            default: 1,
          },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["PENDING", "SHIPPED", "CANCELLED", "DELIVERED", "REFUNDED"],
      default: "PENDING",
    },
    address: {
      addressLine1: {
        required: true,
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        required: true,
        type: String,
      },
      country: {
        required: true,
        type: String,
      },
      pincode: {
        required: true,
        type: String,
      },
      state: {
        required: true,
        type: String,
      },
    },

    // paymentProvider: {
    //   type: String,
    //   enum: ["CASH", "ONLINE"],
    //   default: PaymentProviderEnum.UNKNOWN,
    // },
    // paymentId: {
    //   type: String,
    // },
    // This field shows if the payment is done or not
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
function orderNumber() {
  let now = Date.now().toString(); // '1492341545873'
  // pad with extra random digit
  now += now + Math.floor(Math.random() * 10);
  // format
  return [now.slice(6, 10), now.slice(10, 14)].join("");
}

// orderSchema.pre("save", async function (next) {

//   if (this.isNew) {
//     // Find the highest order sequence currently in use

//   }
//   next();
// });

export const OrderModel = mongoose.model("Order", orderSchema);
