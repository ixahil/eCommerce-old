"use client";
import { Bell } from "lucide-react";
import Image from "next/image";

const UserInfo = (props) => {
  return (
    <div className="flex gap-2 sm:gap-8 items-center">
      <Bell />
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={props.profile.avatar.url}
            alt="user-image"
            width={48}
            height={48}
            className="size-8 rounded-full sm:size-12"
          />
          <h6 className="hidden sm:block">
            {`${props.profile.firstName}  ${props.profile.lastName}`}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
