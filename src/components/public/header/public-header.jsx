import Image from "next/image";
import CartIcon from "../cart/cart-icon";
import { Collections } from "./Collections";
import HeaderSearch from "./header-search";
import SideComponent from "./side-components";
import dynamic from "next/dynamic";
import Link from "next/link";

const NoSSRCartIcon = dynamic(() => import("../cart/cart-icon"), {
  ssr: false,
});

const PublicHeader = () => {
  return (
    <header className="py-8 select-none space-y-8">
      <div className="grid grid-cols-8 items-end ">
        <Logo />
        <div className="col-span-4">
          <HeaderSearch />
        </div>
        <div className="col-span-2 flex items-center gap-8">
          <SideComponent />
          {/* <ShoppingCartIcon /> */}
          <NoSSRCartIcon />
        </div>
      </div>
      <Collections />
    </header>
  );
};

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-end gap-4 col-span-2">
      <Image src={"/logo.png"} width={50} height={50} alt="logo" />
      <h1 className="text-4xl font-extrabold italic">PLR</h1>
    </Link>
  );
};

export default PublicHeader;
