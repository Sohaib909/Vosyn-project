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
   * @param {*} timeout - time till the status will be shown (if -1, message is "permanent")
   *
   */
  const setStatus = (message, severity = "info", timeout = 2000) => {
    dispatch(
      setStatusNotification({
        message,
        severity,
        timeout,
      }),
    );
  };

  return { setStatus };
};

export default useStatusNotification;
