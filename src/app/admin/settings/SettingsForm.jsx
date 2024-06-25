"use client";
import Container from "@/components/layouts/Container";
import UpdateProfilePicture from "@/components/shared/profile/UpdateProfile";
import { Button } from "@/components/ui";
import FormField from "@/components/ui/form-field";
import { customRevalidateTag } from "@/lib/revalidateTag";
import { useUpdateProfileMutation } from "@/services/redux/api/profile-api";
import { convertUrlsToFiles } from "@/utils/helpers";
import { registerConstructor } from "@/utils/helpers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function SettingsForm({ data }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting: isLoading, isDirty },
  } = useForm({
    defaultValues: {
      firstName: data.profile.firstName,
      lastName: data.profile.lastName,
      phoneNumber: data.profile.phoneNumber,
      email: data.user.email,
    },
  });

  useEffect(() => {
    const fetchFiles = async () => {
      // setInitialImages([mainImage?.url, ...subImages?.flatMap((v) => v.url)]);
      const files = await convertUrlsToFiles([data.profile.avatar.url]);
      setValue("avatar", files[0]);
    };

    fetchFiles();
  }, []);

  const [mutate, {}] = useUpdateProfileMutation();

  const onSubmit = async (profileData) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(profileData)) {
      formData.append(key, value);
    }

    await mutate({ endpoint: data.profile._id, data: formData });
    customRevalidateTag("users/me");
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Container className={"border-none"}>
        <Container
          className={
            "xl:w-1/2 flex flex-col items-center justify-center mx-auto"
          }
        >
          <UpdateProfilePicture setValue={setValue} />
          <Container className={"border-none"} title={"User Details"}>
            <div className="flex gap-2">
              <div className="w-full space-y-2">
                <FormField
                  type={"text"}
                  label={"First Name"}
                  name={"firstName"}
                  placeholder={data.profile.firstName}
                  register={register}
                  error={errors.firstName}
                />
              </div>
              <div className="w-full space-y-2">
                <FormField
                  type={"text"}
                  label={"Last Name"}
                  name={"lastName"}
                  placeholder={data.profile.lastName}
                  register={register}
                  error={errors.lastName}
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full space-y-2">
                <FormField
                  type={"text"}
                  label={"Phone Number"}
                  name={"phoneNumber"}
                  placeholder={data.profile.phoneNumber}
                  register={register}
                  error={errors.phoneNumber}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center pt-8">
              <Button // disabled={isLoading}
                variant={"delete"}
                type={"reset"}
                buttonType={"outline"} // className={
                //   "text-delete border-delete hover:bg-delete hover:text-white"
                // }
                disabled={true}
              >
                Delete Profile
              </Button>

              <Button disabled={isLoading || !isDirty} isLoading={isLoading}>
                Update Profile
              </Button>
            </div>
          </Container>
        </Container>
      </Container>
    </form>
  );
}

export default SettingsForm;
