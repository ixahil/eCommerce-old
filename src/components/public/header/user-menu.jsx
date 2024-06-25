"use client";
import { Avatar } from "@/components/ui";
import LinkTag from "@/components/ui/link";
import useStatus from "@/hooks/useStatus";
import { useLogoutUserMutation } from "@/services/redux/api/user-api";
import { useEffect, useRef } from "react";

const UserMenu = (props) => {
  const { toggleStatus, status, setToggleStatus } = useStatus();

  const toggleRef = useRef(null);

  const [mutate] = useLogoutUserMutation();
  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target)) {
      setToggleStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    mutate();
  };
  return (
    <div className="relative" ref={toggleRef}>
      <button onClick={toggleStatus}>
        <Avatar />
      </button>
      {status && (
        <ul className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-accent ring-opacity-5 focus:outline-none">
          <LinkTag
            className={"py-2 px-8 rounded-none"}
            activeColor="bg-accent"
            onClick={toggleStatus}
            href={"/user"}
          >
            Your Profile
          </LinkTag>
          <LinkTag
            className={"py-2 px-8 rounded-none"}
            activeColor="bg-accent"
            onClick={toggleStatus}
            href={"/user/settings"}
          >
            Settings
          </LinkTag>

          <button
            className={
              "px-8 rounded-none py-2 hover:bg-accent w-full text-left block h-auto font-normal"
            }
            variant={"ghost"}
            onClick={() => {
              toggleStatus();
              handleLogout();
            }}
          >
            Sign out
          </button>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
