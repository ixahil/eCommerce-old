"use client";

import { Button } from "@/components/ui";
import FormField from "@/components/ui/form-field";
import useOnSubmit from "@/hooks/useOnSubmit";
import { useUpdatePasswordMutation } from "@/services/redux/api/user-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const AccountSchema = z
  .object({
    currentPassword: z.string().min(3, {
      message: "Password is too short",
    }),
    newPassword: z.string().min(3, {
      message: "Password is too short",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New Password cannot be the same as Current Password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const UpdatePassword = () => {
  const [mutate, { isLoading }] = useUpdatePasswordMutation();
  const { onSubmit } = useOnSubmit();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { isDirty, errors },
  } = useForm({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, mutate, setError, reset))}
    >
      <div className="py-8 space-y-8">
        <div className="space-y-2">
          <FormField
            type={"password"}
            name={"currentPassword"}
            label={"Current Password"}
            placeholder={"*****"}
            register={register}
            error={errors.currentPassword}
          />
        </div>
        <div className="space-y-2">
          <FormField
            type={"password"}
            name={"newPassword"}
            label={"New Password"}
            placeholder={"*****"}
            register={register}
            error={errors.newPassword}
          />
        </div>
        <div className="space-y-2">
          <FormField
            type={"password"}
            name={"confirmPassword"}
            label={"Confirm Password"}
            placeholder={"*****"}
            register={register}
            error={errors.confirmPassword}
          />
        </div>

        <Button
          type={"submit"}
          loading={isLoading}
          disabled={!isDirty}
          className={"px-6"}
        >
          Update Password
        </Button>
      </div>
    </form>
  );
};

export default UpdatePassword;
