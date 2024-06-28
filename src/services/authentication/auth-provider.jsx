"use client";
import { useRouter } from "next/navigation";
import { useFetchUserQuery } from "../redux/api/user-api";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slice/user-slice";
import { LoadingSpinner } from "@/components/loading";

const AuthProvider = ({ children, layout }) => {
  const router = useRouter();
  const { isLoading } = useFetchUserQuery();

  const { user } = useSelector(userSelector);

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (user?.role !== layout) {
    return router.push("/");
  } else {
    return children;
  }

  // if (isError) {
  //   return router.back();
  // }

  //   switch (data.data.user.role === layout) {
  //     case "ADMIN":
  //       return children;
  //     case "USER":
  //       return children;
  //     default:
  //       return router.push("/login");
  //   }
};

export default AuthProvider;
