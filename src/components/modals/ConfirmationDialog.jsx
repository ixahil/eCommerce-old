// ConfirmationDialog.js
// import React from "react";
// import Button from "../ui/Button";

// const ConfirmationDialog = ({
//   title,
//   setIsConfirmed,
//   toggleModal,
//   buttonLabel,
//   userData,
//   setUserData,
//   variant,

//   disabled,
// }) => {
//   // Define functions to toggle confirm status
//   const handleConfirm = () => {
//     setIsConfirmed(true);
//     toggleModal();
//   };
//   const handleCancel = () => {
//     setIsConfirmed(false);
//     toggleModal();
//   };

//   return (
//     <div className="space-y-4">
//       <h6 className="text-md ">{title}</h6>
//       {setUserData && (
//         <>
//           <p className="text-sm">
//             Please confirm your account by providing your credentials
//           </p>
//           <div className="space-y-4">
//             <input
//               className={"text-lg"}
//               label={"Email"}
//               type="email"
//               placeholder="Please Enter your email"
//               onChange={(e) =>
//                 setUserData((prev) => ({
//                   ...prev,
//                   email: e.target.value,
//                 }))
//               }
//               value={userData.email}
//             />
//             <input
//               className={"text-lg"}
//               label={"password"}
//               type="password"
//               placeholder="Please Enter your password"
//               onChange={(e) =>
//                 setUserData((prev) => ({
//                   ...prev,
//                   password: e.target.value,
//                 }))
//               }
//               value={userData.password}
//             />
//           </div>
//         </>
//       )}
//       <div className="flex items-center justify-evenly">
//         <Button
//           variant={buttonVariant}
//           disabled={disabled}
//           onClick={handleConfirm} // Pass function reference
//         >
//           {buttonLabel}
//         </Button>

//         <button // Moved onClick handler inside Button props
//           className={
//             "bg-white border hover:bg-primaryAccent inline-flex gap-2 items-center py-1"
//           }
//           onClick={handleCancel} // Pass function reference
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationDialog;

import Button from "../ui/button";
import { NormalText } from "../ui/text";

const ConfirmationDialog = ({
  buttonLabel,
  buttonProps,
  toggleModal,
  title,
  setIsConfirmed,
}) => {
  const handleConfirm = () => {
    setIsConfirmed(true);
    toggleModal();
  };
  const handleCancel = () => {
    setIsConfirmed(false);
    toggleModal();
  };
  return (
    <div className="space-y-4">
      <NormalText>{title}</NormalText>
      <div className="flex items-center gap-2">
        <Button
          className={"w-full py-2"}
          {...buttonProps}
          onClick={handleConfirm}
        >
          {buttonLabel}
        </Button>

        <Button
          className={"w-full py-2"}
          variant={"outline"}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
