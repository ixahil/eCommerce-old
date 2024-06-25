"use client";
import { profileSelector } from "@/services/redux/slice/profile-slice";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateProfilePicture = (props) => {
  const { profile } = useSelector(profileSelector);

  const [avatar, setAvatar] = useState(profile?.avatar?.url);
  const handleImage = (e) => {
    const avatar = e.target.files[0];
    const image = URL.createObjectURL(avatar);
    setAvatar(image);
    props.setValue("avatar", avatar, { shouldTouch: true, shouldDirty: true });
  };

  return (
    <label className="relative rounded-full cursor-pointer hover:opacity-40">
      <input
        type="file"
        name="avatar"
        id="avatar"
        multiple={false}
        onChange={(e) => handleImage(e)}
        className="block w-full text-sm text-slate-500 cursor-pointer
                    file:mr-4
                    file:py-3 file:px-6
                    file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primaryAccent file:text-black-700
                    hover:file:bg-primaryAccent/70
                    file:cursor-pointer
                    
                  "
        style={{ display: "none" }}
      />
      <Image
        aria-label="avatar"
        src={avatar || "/user.jpg"}
        height={72}
        width={72}
        alt="user-avatar"
        className="rounded-full size-36"
      />
      <Camera className="absolute bottom-4 right-6" />
    </label>
  );
};

export default UpdateProfilePicture;
