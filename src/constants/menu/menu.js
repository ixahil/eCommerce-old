import {
  Bolt,
  Headset,
  LayoutPanelLeft,
  LifeBuoy,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";

export const MenuData = {
  AdminMenu: [
    { index: 1, label: "Overview", value: "/admin", icon: <LayoutPanelLeft /> },
    {
      index: 2,
      label: "Products",
      value: "/admin/products",
      icon: <ShoppingBag />,
    },
    { index: 3, label: "Customers", value: "/admin/customers", icon: <User /> },
    {
      index: 4,
      label: "Orders",
      value: "/admin/orders",
      icon: <ShoppingCart />,
    },
    { index: 5, label: "Settings", value: "/admin/settings", icon: <Bolt /> },
  ],
  AdminFooterMenu: [
    {
      index: 1,
      label: "Help",
      value: "#",
      icon: <LifeBuoy />,
    },
    {
      index: 2,
      label: "Contact us",
      value: "#",
      icon: <Headset />,
    },
  ],
  UserMenuData: [
    {
      index: 1,
      label: "Profile",
      value: "/user",
      icon: <User size={28} />,
    },
    {
      index: 2,
      label: "Orders",
      value: "/user/orders",
      icon: <ShoppingCart size={28} />,
    },

    {
      index: 3,
      label: "Settings",
      value: "/user/settings",
      icon: <Bolt size={28} />,
    },
  ],
};
