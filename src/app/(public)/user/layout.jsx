import UserSidebar from "@/components/user/user-sidebar";
import AuthProvider from "@/services/authentication/auth-provider";
import React from "react";

const UserLayout = ({ children }) => {
  return (
    <AuthProvider layout={"USER"}>
      <div className="h-[76vh] border-2 grid grid-cols-5 divide-x-2 my-8">
        <UserSidebar />
        <div className="px-16 py-16 w-full col-span-4 overflow-auto">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default UserLayout;
