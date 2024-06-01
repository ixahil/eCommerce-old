export { getCollections, getACollection } from "./collection.controller.js";

export {
  registerUser,
  loginUser,
  getAUser,
  verifyEmail,
  resendEmailVerification,
  getAllUsers,
  logoutUser,
  updateUserDetails,
  updatePassword,
  updateAccount,
  deleteAccount,
} from "./user.controller.js";

export {
  createNewProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getAProduct,
  getProductsByCollection,
  updateProductStatus,
} from "./product.controller.js";

export { getProfile, updateProfile } from "./profile.controller.js";
export {
  createNewOrder,
  updateOrderStatus,
  getAllOrders,
} from "./order.controller.js";

export { getABrand, getBrands } from "./brand.controller.js";
