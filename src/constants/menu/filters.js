export const ProductFilters = [
  { index: 1, name: "All Products", path: "", viewId: "0" },
  { index: 2, name: "Featured", path: "isFeatured", viewId: "1" },
  { index: 3, name: "Free Shipping", path: "isFreeShipping", viewId: "2" },
  { index: 4, name: "Out of Stock", path: "outofstock", viewId: "3" },
  { index: 5, name: "Not Visible", path: "notvisible", viewId: "4" },
  { index: 6, name: "Visible", path: "isVisible", viewId: "5" },
];

export const OrderFilters = [
  { index: 1, name: "All Orders", path: "", viewId: "0" },
  { index: 2, name: "Shipped", path: "status=Shipped", viewId: "1" },
  { index: 3, name: "Pending Shipping", path: "status=pending", viewId: "2" },
  { index: 4, name: "Cancelled", path: "status=Cancelled", viewId: "3" },
  { index: 5, name: "Payment Pending", path: "refund=pending", viewId: "4" },
];

export const CustomerFilters = [
  { index: 1, name: "All Customers", path: "", viewId: "0" },
  {
    index: 2,
    name: "Active",
    query: { status: "ACTIVE" },
    viewId: "1",
  },
  {
    index: 3,
    name: "Inactive",
    query: { status: "INACTIVE" },
    viewId: "2",
  },
  {
    index: 4,
    name: "Deleted",
    query: { status: "DELETED" },
    viewId: "3",
  },
  {
    index: 5,
    name: "Suspended",
    query: { Status: "SUSPENDED" },
    viewId: "4",
  },
];
