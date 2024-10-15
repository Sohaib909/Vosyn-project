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
   * @param {*} showStatusNotification - show the notification or not
   * @param {*} message - the notification message
   * @param {*} severity - the ststus
   */
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
