import { Button, SubTitle } from "@/components/ui";
import FormField from "@/components/ui/form-field";
import useOnSubmit from "@/hooks/useOnSubmit";
import { useDeleteAccountMutation } from "@/services/redux/api/user-api";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

const DeleteModal = ({ isShowing, toggleShowing }) => {
  const { onSubmit } = useOnSubmit();
  const [mutate, { isLoading }] = useDeleteAccountMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { isDirty, errors },
  } = useForm({});

  return isShowing
    ? createPortal(
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50">
          <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto flex items-center">
            <div className="space-y-4 relative z-50 bg-white m-auto max-w-[500px] p-4 rounded-md">
              <div className="modal-header flex gap-4">
                <SubTitle>
                  Are you sure, You want to delete your account?
                </SubTitle>
                <button
                  type="button"
                  className="modal-close-button font-semibold text-2xl"
                  onClick={() => toggleShowing(false)}
                >
                  <span>&times;</span>
                </button>
              </div>

              <p className="text-sm">
                Please confirm your account by providing your credentials
              </p>
              <form
                className="space-y-4"
                onSubmit={handleSubmit((data) =>
                  onSubmit(data, mutate, "", reset)
                )}
              >
                <div className="space-y-2">
                  <FormField
                    type="username"
                    name="username"
                    label={"Username"}
                    placeholder="Please Enter your username"
                    register={register}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    type="password"
                    name="password"
                    label={"password"}
                    placeholder="Please Enter your password"
                    register={register}
                  />
                </div>
                <div className="flex items-center justify-evenly">
                  <Button
                    classNames={`inline-flex gap-2 items-center py-1 bg-red-500 text-white : "
                `}
                    type={"submit"}
                    isLoading={isLoading}
                    disabled={!isDirty}
                    variant={"delete"}
                    buttonType={"outline"}
                  >
                    Delete
                  </Button>
                  <Button // Moved onClick handler inside Button props
                    classNames={
                      "bg-white border hover:bg-accent inline-flex gap-2 items-center py-1"
                    }
                    type={"button"}
                    onClick={() => toggleShowing(false)} // Pass function reference
                  >
                    Cancel
                  </Button>
                  '
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default DeleteModal;
