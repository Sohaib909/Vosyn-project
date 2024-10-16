import { useDispatch } from "react-redux";

import { setStatusNotification } from "@/reduxSlices/statusNotificationSlice";

/**
 * A hook for the use of status notification
 *
 * @returns - a method
 */
const useStatusNotification = () => {
  const dispatch = useDispatch();

  /**
   *
   * @param {*} message - the notification message
   * @param {*} severity - the status
   */
  const setStatus = (message, severity) => {
    dispatch(
      setStatusNotification({
        message,
        severity,
      }),
    );
  };

  return { setStatus };
};

export default useStatusNotification;
