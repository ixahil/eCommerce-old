"use client";
import Container from "@/components/layouts/Container";
import Section from "@/components/layouts/Section";
import ConfirmationDialog from "@/components/modals/ConfirmationDialog";
import Modal from "@/components/modals/Modal";
import UpdateProfilePicture from "@/components/shared/profile/UpdateProfile";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { Title } from "@/components/ui/text";
import useModal from "@/hooks/useModal";
import { useUpdateProfileMutation } from "@/services/redux/api/profile-api";
import { useResendEmailVerificationMutation } from "@/services/redux/api/user-api";
import { profileSelector } from "@/services/redux/slice/profile-slice";
import { userSelector } from "@/services/redux/slice/user-slice";
import { convertUrlsToFiles } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UserHome = () => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const { profile } = useSelector(profileSelector);
  const { user } = useSelector(userSelector);

  const [mutate] = useUpdateProfileMutation();
  const [resendVerification, { isLoading: isLoadingEmail, isSuccess }] =
    useResendEmailVerificationMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting: isLoading, isDirty },
    watch,
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      phoneNumber: profile?.phoneNumber,
      // avatar: URL.revokeObjectURL([profile.avatar.url]),
    },
  });

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await convertUrlsToFiles([profile.avatar.url]);
      setValue("avatar", files[0]);
    };

    fetchFiles();
  }, []);

  const handleConfirm = async () => {
    const { data } = await resendVerification();
    if (data.statusCode === 200) setIsModalShowing(false);
  };

  const onSubmit = async (profileData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(profileData)) {
      formData.append(key, value);
    }

    await mutate({ endpoint: profile._id, data: formData });

    reset(profileData);

    // custom refresh
    // customRevalidateTag("users/me");
  };

  return (
    <Section heading={"Update Your Profile"} className={"space-y-6 py-0"}>
      <form className="space-y-8 px-8" onSubmit={handleSubmit(onSubmit)}>
        <Container
          className={"flex flex-col items-center justify-center mx-auto"}
        >
          <UpdateProfilePicture setValue={setValue} />
          <Container className={"border-none"} title={"User Details"}>
            <div className="flex gap-2">
              <div className="w-full space-y-2">
                <FormField
                  type="text"
                  label={"First Name"}
                  name={"firstName"}
                  register={register}
                  error={errors.firstName}
                />
              </div>
              <div className="w-full space-y-2">
                <FormField
                  type="text"
                  label={"Last Name"}
                  name={"lastName"}
                  register={register}
                  error={errors.lastName}
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-1/2 space-y-2">
                <FormField
                  type="number"
                  label={"Phone"}
                  name={"phoneNumber"}
                  register={register}
                  error={errors.phoneNumber}
                />
              </div>
              <div className="flex items-center gap-4">
                <Title>Email is not verified, send a verification Link?</Title>
                <Button
                  type={"button"}
                  disabled={isLoadingEmail}
                  isLoading={isLoadingEmail}
                  onClick={() => setIsModalShowing(true)}
                >
                  Send Link
                </Button>
              </div>
              <Button disabled={isLoading || !isDirty} isLoading={isLoading}>
                Update Profile
              </Button>
            </div>
          </Container>
        </Container>
      </form>
      <Modal
        isShowing={isModalShowing}
        confirmLabel={"Send Link"}
        buttonProps={{
          isLoading: isLoadingEmail,
          disabled: isLoadingEmail,
        }}
        hide={() => setIsModalShowing(false)}
        title="Confirmation"
        onConfirm={handleConfirm}
        onCancel={() => setIsModalShowing(false)}
      >
        <p>
          Do you wish to send another verification Email on <b>{user.email}</b>
        </p>
      </Modal>
    </Section>
  );
};

export default UserHome;
