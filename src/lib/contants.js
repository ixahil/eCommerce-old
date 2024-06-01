export const ProductFilters = [
  { index: 1, name: "All Products", path: "", viewId: "0" },
  {
    index: 2,
    name: "Featured",
    path: "isFeatured",
    viewId: "1",
    query: { isFeatured: true },
  },
  {
    index: 3,
    name: "Free Shipping",
    path: "isFreeShipping",
    viewId: "2",
    query: { isFreeShipping: true },
  },
  {
    index: 4,
    name: "Out of Stock",
    path: "outofstock",
    viewId: "3",
    query: { stock: 0 },
  },
  {
    index: 5,
    name: "Not Visible",
    path: "notvisible",
    viewId: "4",
    query: { isVisible: false },
  },
  {
    index: 6,
    name: "Visible",
    path: "isVisible",
    viewId: "5",
    query: { isVisible: true },
  },
];

export const OrderFilters = [
  { index: 1, name: "All Orders", path: "", viewId: "0" },
  {
    index: 2,
    name: "Shipped",
    path: "status=Shipped",
    query: { status: "SHIPPED" },
    viewId: "1",
  },
  {
    index: 3,
    name: "Pending Shipping",
    path: "status=pending",
    query: { status: "PENDING" },
    viewId: "2",
  },
  {
    index: 4,
    name: "Cancelled",
    path: "status=Cancelled",
    query: { status: "CANCELLED" },
    viewId: "3",
  },
  {
    index: 5,
    name: "Payment Pending",
    path: "refund=pending",
    query: { isPaymentDone: false },
    viewId: "4",
  },
];

export const CustomerFilters = [
  { index: 1, name: "All Customers", path: "", viewId: "0" },
  {
    index: 2,
    name: "Active",
    query: { userStatus: "ACTIVE" },
    viewId: "1",
  },
  {
    index: 3,
    name: "Inactive",
    query: { userStatus: "INACTIVE" },
    viewId: "2",
  },
  {
    index: 4,
    name: "Deleted",
    query: { userStatus: "DELETED" },
    viewId: "3",
  },
  {
    index: 5,
    name: "Suspended",
    query: { userStatus: "SUSPENDED" },
    viewId: "4",
  },
];
