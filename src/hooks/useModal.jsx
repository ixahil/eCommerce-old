import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Confirm");
  const [buttonVariant, setButtonVariant] = useState("default");

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsShowing((prevIsShowing) => !prevIsShowing);
  };

  // Function to set confirmation status
  const setIsConfirmed = (userSelect) => {
    setConfirmed(userSelect);
  };

  // Function to set modal title
  const setModalTitle = (newTitle) => {
    setTitle(newTitle);
  };

  const resetModalStates = () => {
    setConfirmed(false);
    setTitle("");
    setButtonLabel("Confirm");
  };

  return {
    isShowing,
    toggleModal,
    setModalTitle,
    title,
    setIsConfirmed,
    confirmed,
    setButtonLabel,
    buttonLabel,
    resetModalStates,
    setButtonVariant,
    buttonVariant,
  };
};

export default useModal;
