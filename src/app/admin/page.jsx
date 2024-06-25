import GridComponent from "@/components/grid-component/grid-component";
import Section from "@/components/layouts/Section";
import {
  BadgeDollarSign,
  ShoppingBasket,
  Undo2,
  UsersRound,
} from "lucide-react";

const AdminHome = () => {
  return (
    <Section className={"py-2"}>
      <div className="grid grid-cols-2 xl:grid-cols-4 border rounded-lg divide-x min-h-36">
        <GridComponent
          className={""}
          icon={<ShoppingBasket color="white" />}
          heading={"Orders"}
          content={"2,088"}
        />
        <GridComponent
          icon={<UsersRound color="white" />}
          heading={"Customers"}
          content={"1,931"}
        />
        <GridComponent
          icon={<BadgeDollarSign color="white" />}
          heading={"Products"}
          content={"92,397"}
        />
        <GridComponent
          icon={<Undo2 color="white" />}
          heading={"Categories"}
          content={"3,498"}
        />
      </div>
    </Section>
  );
};

export default AdminHome;
