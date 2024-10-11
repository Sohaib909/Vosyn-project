import { useDispatch } from "react-redux";

import { setStatusNotification } from "@/reduxSlices/statusNotificationSlice";

const useStatusNotification = () => {
  const dispatch = useDispatch();

  const setStatus = (showStatusNotification, message, severity) => {
    dispatch(
      setStatusNotification({
        showStatusNotification,
        message,
        severity,
      }),
    );
  };

  return { setStatus };
};

export default useStatusNotification;
