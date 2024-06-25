"use client";
import { useFetchUserQuery } from "@/services/redux/api/user-api";
import { Loader2 } from "lucide-react";
import SignInButtons from "./SignInButtons";
import UserMenu from "./user-menu";
import { useSelector } from "react-redux";
import { userSelector } from "@/services/redux/slice/user-slice";
import { profileSelector } from "@/services/redux/slice/profile-slice";

const SideComponent = () => {
  const { isLoading } = useFetchUserQuery();
  const { user } = useSelector(userSelector);
  const { profile } = useSelector(profileSelector);

  if (isLoading) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  } else {
    return (
      <>
        {user ? <UserMenu profile={profile} user={user} /> : <SignInButtons />}
      </>
    );
  }
};

export default SideComponent;
