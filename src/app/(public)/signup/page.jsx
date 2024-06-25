"use client";
import Section from "@/components/layouts/Section";
import { CardWrapper } from "@/components/shared/card";
import FormField from "@/components/ui/form-field";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "@/services/redux/api/user-api";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";

const UserSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email",
    }),
    username: z.string().min(4, {
      message: "Username must be at least 4 characters",
    }),
    password: z.string().min(3, {
      message: "Password is too short",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

const SignupPage = () => {
  const router = useRouter();

  const [mutate, { isSuccess, isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { data, error } = await mutate({ endpoint: "/signup", data: values });

    if (data) {
      toast.success("Registered & Loggedin Successfully!");
      router.push("/user");
    }
    if (error) {
      const [name = "", value = ""] = error.data.message.split(":");
      setError(name, { type: "server", message: value });
    }
  };

  return (
    <Section>
      <CardWrapper headerTitle={"Create a new account"}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-4">
            <div className="space-y-3">
              <FormField
                required={true}
                label={"email"}
                type="email"
                placeholder="Email"
                name="email"
                register={register}
                error={errors.email}
              />
            </div>
            <div className="space-y-3">
              <FormField
                required={true}
                label={"Username"}
                type="username"
                placeholder="Username"
                name="username"
                register={register}
                error={errors.username}
              />
            </div>
            <div className="space-y-3">
              <FormField
                label={"Password"}
                type="password"
                placeholder="Password"
                name="password"
                register={register}
                error={errors.password}
              />
            </div>
            <div className="space-y-3">
              <FormField
                label={"confirm Password"}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-accent w-full px-4 py-3 rounded-lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
        <Link className={`flex gap-2 items-center`} href={"/login"}>
          <ArrowLeft />
          {"Already have an Account?"}
        </Link>
      </CardWrapper>
    </Section>
  );
};

export default SignupPage;
