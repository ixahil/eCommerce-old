"use client";
import { PageHeading, SubTitle } from "@/components/ui";
import { profileSelector } from "@/services/redux/slice/profile-slice";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

const Header = () => {
  const data = useSelector(profileSelector);

  return (
    <div className="flex justify-between items-center py-8">
      <div className="">
        <PageHeading className={"font-bold"}>
          {"welcome back, " + data.profile.firstName}
        </PageHeading>

        <SubTitle className="text-gray-500">
          {"Here's what's happening with your store today"}
        </SubTitle>
      </div>

      <UserInfo profile={data.profile} />
    </div>
  );
};

export default Header;
