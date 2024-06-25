"use client";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { SubTitle } from "./text";
import { cn } from "@/utils/cn";
import { useSelector } from "react-redux";
import { profileSelector } from "@/services/redux/slice/profile-slice";
import { userSelector } from "@/services/redux/slice/user-slice";

const Avatar = (props) => {
  const { profile } = useSelector(profileSelector);
  const { user } = useSelector(userSelector);
  return (
    <div
      className={cn(
        "flex items-center gap-2 group cursor-pointer",
        props.className
      )}
    >
      <SubTitle>Hola, {user.username}</SubTitle>

      <Image
        src={profile?.avatar.url || "/user.jpg"}
        alt="user image"
        height={100}
        width={100}
        className={cn(
          "rounded-full size-12",
          avatarStyles({ variant: props.variant })
        )}
      />
    </div>
  );
};

const avatarStyles = cva(["rounded-full", "relative"], {
  variants: {
    variant: {
      sm: ["size-12"],
      md: ["size-12", "lg:size-24"],
      lg: ["size-96"],
    },
  },
  defaultVariants: {
    variant: "sm",
  },
});

export default Avatar;
