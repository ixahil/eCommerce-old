"use client";
import { useLogoutUserMutation } from "@/services/redux/api/user-api";
import { cn } from "@/utils/cn";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Logout = ({ data, className }) => {
  const router = useRouter();

  const [mutate] = useLogoutUserMutation();

  return (
    <nav className={cn("py-8", className)}>
      <ul className="space-y-2 flex flex-col max-sm:text-xs">
        <li
          className={
            "py-4 px-2 rounded-lg hover:bg-accent flex items-center gap-4 cursor-pointer"
          }
          onClick={() => mutate()}
        >
          <LogOut />
          {"Logout"}
        </li>
      </ul>
    </nav>
  );
};

export default Logout;
