import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const useMutation = () => {
  const router = useRouter();
  const mutate = async ({ fn, data, endpoint, message, redirect }) => {
    const { data: resData, error } = await fn({ data, endpoint });
    if (resData) {
      toast.success(message);
      if (redirect) router.push(redirect);
      return resData;
    }
    if (error) {
    }
  };

  return mutate;
};

export default useMutation;
