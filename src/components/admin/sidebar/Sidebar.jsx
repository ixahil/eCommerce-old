import { MenuData } from "@/constants/menu/menu";
import { Layers } from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";
import Menu from "./Menu";

const Sidebar = () => {
  return (
    <aside className="divide-y-2 sticky overflow-auto left-0 top-0 min-h-screen h-full w-fit border-r-2 border-gray-200 bg-white grid grid-row-6 max-md:hidden sm:p-4 xl:p-8 2xl:w-80">
      <Link
        href={"/admin"}
        className="sm:flex items-center gap-4 row-span-1 sm:p-4 xl:p-6"
      >
        <span>
          <Layers size={35} />
        </span>
        <h1 className="text-2xl font-bold hidden sm:block">Salence</h1>
      </Link>
      <Menu data={MenuData.AdminMenu} className={"row-span-4"} />
      <Logout />
    </aside>
  );
};

export default Sidebar;
