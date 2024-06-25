import Link from "next/link";
import React from "react";

const SignInButtons = () => {
  return (
    <div className="flex border-b-4 border-accent">
      <Link
        className={"px-8 py-2 rounded-none hover:bg-accent"}
        // activeColor="bg-primary"
        href={"/login"}
      >
        Login
      </Link>

      <Link
        className={"px-8 py-2 rounded-none hover:bg-accent"}
        // activeColor="bg-primary"
        href={"/signup"}
      >
        Signup
      </Link>
    </div>
  );
};

export default SignInButtons;
