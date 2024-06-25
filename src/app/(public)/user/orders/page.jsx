import Section from "@/components/layouts/Section";
import {
  ArrowUpFromDot,
  Ellipsis,
  Map,
  MapPin,
  Pin,
  Truck,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const OrdersPage = () => {
  return (
    <Section
      heading={"Your Orders"}
      className={"space-y-6 py-0"}
      breadCrumb={true}
    >
      {/* <h2 className="text-start font-bold text-xl">Your Orders</h2> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
        <OrderCard order={order} />
        <OrderCard order={order} />
        <OrderCard order={order} />
        <OrderCard order={order} />
      </div>
    </Section>
  );
};

const OrderCard = ({ order }) => {
  const { id, location, estimatedArrival, status, items } = order;

  return (
    <div className="bg-white shadow-md p-4 rounded-md border-2 space-y-6">
      <div className="">
        <div className="flex justify-between">
          <div className="">
            <h4 className="text-sm text-gray-500">Order ID:</h4>
            <h3 className="text-lg font-medium mb-2">{id}</h3>
          </div>
          <div className="">
            <p className="p-2 bg-[#eef9eb] text-[#57c634]">{status}</p>
          </div>
        </div>
        <div className="flex flex-wrap xl:flex-nowrap justify-between items-center gap-4 text-xs xl:text-sm">
          <p className="p-2 border-2 flex gap-2 items-center">
            <Truck />
            {"Malang Indonesia"}
          </p>
          <div className="flex">
            <Ellipsis />
            <Ellipsis />
            <ArrowUpFromDot className="rotate-90" />
          </div>
          <p className="p-2 border-2 flex gap-2 items-center text-xs xl:text-sm">
            <MapPin />
            {"Emir's house indoneisa"}
          </p>
        </div>
      </div>

      <ul className="border-2 p-2 grid grid-cols-1fr gap-4 h-64 overflow-auto text-sm xl:text-base">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <Image src={item.image} alt="test" height={100} width={100} />
            <div className="space-y-4">
              <h3>{item.name}</h3>
              <div className="inline space-x-2">
                <h4 className="text-gray-500 inline">Size:</h4>
                <p className="inline">{item.size}</p>
                <p>Rp {item.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-md">
        <p className="inline font-medium">Total: {order.total} </p>
        <p className="inline text-sm text-gray-500">
          ({order.totalItems} Items){" "}
        </p>
      </div>
    </div>
  );
};

const order = {
  id: "#7812657",
  from: "Malang, Indonesia",
  to: "28 May 2024",
  status: "On Deliver",
  items: [
    {
      name: "Nike Air Max SYSTM",
      size: 24,
      price: 1459000,
      image: "/test.jpg",
    },
    { name: "Nike Air Rift", size: 24, price: 1909000, image: "/test.jpg" },
    { name: "Nike Air Rift", size: 24, price: 1909000, image: "/test.jpg" },
  ],
  total: 7890000,
  totalItems: 8,
};

export default OrdersPage;
