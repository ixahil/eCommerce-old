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
import Button from "@/components/ui/button";

const UserSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters",
  }),
  password: z.string().min(3, {
    message: "Password is too short",
  }),
});

const LoginPage = () => {
  const router = useRouter();

  const [mutate, { isLoading }] = useLoginUserMutation();

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
    const { data, error } = await mutate({ endpoint: "/login", data: values });

    if (data?.user.role === "ADMIN") router.push("/admin");
    if (data?.user.role === "USER") router.push("/user");
    if (error) {
      setError("globalError", { type: "server", message: error.data.message });
    }
  };

  return (
    <Section>
      <CardWrapper headerTitle={"Login to your account"}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-4">
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
            {errors.globalError && (
              <p className="normal-case text-red-500 text-xs pl-2 mt-4 text-center">
                {errors?.globalError?.message}
              </p>
            )}
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
        <Link className={`flex gap-2 items-center`} href={"/signup"}>
          <ArrowLeft />
          {"Don't have an Account?"}
        </Link>
      </CardWrapper>
    </Section>
  );
};

export default LoginPage;
