import React from "react";

const useOnSubmit = () => {
  const onSubmit = async (data, submitFnc, setError, reset) => {
    try {
      const response = await submitFnc(data);

      if (response.error) {
        const errorType = response.error.data.message.split(":")[0];
        if (setError) {
          setError(
            errorType,
            { message: response.error.data.message },
            { shouldFocus: true }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    reset(data, { keepErrors: true });
  };

  return { onSubmit };
};

export default useOnSubmit;
