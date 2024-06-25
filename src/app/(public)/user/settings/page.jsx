"use client";
import Section from "@/components/layouts/Section";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Button } from "@/components/ui";
import { Trash2 } from "lucide-react";
import UpdatePassword from "./UpdatePassword";
import Modal from "@/components/modals/Modal";
import { useDeleteAccountMutation } from "@/services/redux/api/user-api";
import { useForm } from "react-hook-form";
import FormField from "@/components/ui/form-field";

const page = () => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [mutate, { isLoading }] = useDeleteAccountMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    getValues,

    formState: { isDirty, errors },
  } = useForm({});

  const handleConfirm = async () => {
    const { data, error } = await mutate(getValues());
    if (error) {
      setError("globalError", { type: "server", message: error.data.message });
    }
  };

  return (
    <Section
      heading={"Settings"}
      className={"space-y-6 py-0"}
      breadCrumb={true}
    >
      <div className="grid grid-cols-2">
        <div className="">
          <UpdatePassword />
          <Button
            type={"button"}
            variant={"delete"}
            onClick={() => setIsModalShowing(true)}
            className={"flex"}
            buttonType={"outline"}
          >
            Delete Account
            <Trash2 />
          </Button>
        </div>
        {/* <DeleteModal isShowing={toggleModal} toggleShowing={setToggleModal} /> */}
        <Modal
          className={"space-y-4"}
          isShowing={isModalShowing}
          confirmLabel={"Delete Account"}
          buttonProps={{
            variant: "delete",
            buttonType: "outline",
            isLoading: isLoading,
            disabled: isLoading,
          }}
          disableOverlayClose={true}
          hide={() => setIsModalShowing(false)}
          title="Are you sure, You want to delete your account?"
          onConfirm={handleConfirm}
          onCancel={() => setIsModalShowing(false)}
        >
          <p>Please confirm your account by providing your credentials</p>
          <form
            className="space-y-4"
            onSubmit={handleSubmit((data) => onSubmit(data, mutate, "", reset))}
          >
            <div className="space-y-2">
              <FormField
                type="username"
                name="username"
                label={"Username"}
                placeholder="Please Enter your username"
                register={register}
                error={errors.username}
              />
            </div>
            <div className="space-y-2">
              <FormField
                type="password"
                name="password"
                label={"password"}
                placeholder="Please Enter your password"
                register={register}
                error={errors.password}
              />
            </div>
          </form>
          {errors.globalError && (
            <p className="normal-case text-red-500 text-xs pl-2 mt-4 text-center">
              {errors?.globalError?.message}
            </p>
          )}
        </Modal>
      </div>
    </Section>
  );
};

export default page;
