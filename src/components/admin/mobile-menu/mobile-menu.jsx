"use client";
import useStatus from "@/hooks/useStatus";
import { Dialog, Transition } from "@headlessui/react";
import { Layers, MenuIcon, X } from "lucide-react";
import { Fragment } from "react";
import Menu from "../sidebar/Menu";

export default function MobileMenu() {
  const { status, toggleStatus } = useStatus();

  return (
    <div className="md:hidden">
      <button onClick={toggleStatus}>
        <MenuIcon />
      </button>
      {status && <div className="absolute inset-0 bg-black opacity-50" />}

      <Transition
        show={status}
        as={Fragment}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-white max-w-60 px-2 py-2 divide-y-2 grid grid-row-6 border-r-2 border-gray-200 md:hidden"
          onClose={toggleStatus}
        >
          <MenuContent />
        </Dialog>
      </Transition>
    </div>
  );
}

const CloseButton = ({ onClick }) => {
  return (
    <div className="absolute top-0 right-0 -mr-12 pt-2">
      <button
        type="button"
        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        onClick={onClick}
      >
        <span className="sr-only">Close sidebar</span>
        <X size={20} />
      </button>
    </div>
  );
};

const Header = () => {
  return (
    <Link
      href={"/admin"}
      className="flex items-center justify-center gap-4 row-span-1 p-4"
    >
      <span>
        <Layers size={35} />
      </span>
      <h1 className="text-2xl font-bold">Salence</h1>
    </Link>
  );
};

const MenuContent = ({ onClick }) => {
  return (
    <>
      <Header />
      <MenuItems />
    </>
  );
};

const MenuItems = () => {
  return (
    <>
      <Menu data={MenuData.AdminMenu} className={"px-2 row-span-4"} />
      <Menu data={MenuData.AdminFooterMenu} className={"px-2  row-span-1"} />
    </>
  );
};

import Link from "next/link";
import { MenuData } from "@/constants/menu/menu";

const MenuBackdrop = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-45 transition-opacity">
      {children}
    </div>
  );
};
