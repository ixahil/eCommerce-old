import LinkTag from "@/components/ui/link";
import { MenuData } from "@/constants/menu/menu";
import Link from "next/link";

const UserSidebar = () => {
  return (
    <aside className="space-y-8 h-full w-full">
      <div className="h-full py-8 pt-32">
        <Avatar className={"flex-col-reverse cursor-auto gap-4"} variant="md" />
        <Menu
          data={MenuData.UserMenuData}
          className={"row-span-5"}
          accent={"bg-accent"}
        />
      </div>
    </aside>
  );
};

import { cn } from "@/utils/cn";
import { Avatar } from "../ui";

const Menu = ({ data, className, accent }) => {
  return (
    <nav className={cn("py-8", className)}>
      <ul className="space-y-2 flex flex-col max-sm:text-xs justify-start">
        {data.map((v, k) => (
          <LinkTag
            key={v.value + v.index}
            href={v.value}
            className={"py-4 px-8 rounded-none"}
            activeColor={accent}
          >
            <div className={`hidden lg:block`}>{v.icon}</div>

            {v.label}
          </LinkTag>
        ))}
      </ul>
    </nav>
  );
};

export default UserSidebar;
