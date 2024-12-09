// SettingsPrivacy.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { logout } from "@/reduxSlices/authSlice";
import { setToast } from "@/reduxSlices/snackbarSlice";
import { useRouter } from "next/router";

import {
  PasswordChangeForm,
  VisibilitySettings,
} from "./SettingsPrivacyComponents";

import "./SettingsPage.css";

const SettingsPrivacy = ({ showSavedAlert, setShowSavedAlert }) => {
  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({ mode: "onBlur" });

  const router = useRouter();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);

  // Function to toggle password visibility
  const handleTogglePasswordVisibility = (changeFun) => {
    changeFun((prevShowPassword) => !prevShowPassword);
  };

  // Function to submit form
  const submitForm = (data) => {
    console.log("submitForm", data);
    const passData = {
      old_password: data.currentpassword,
      new_password: data.password1,
      new_password2: data.password1,
    };
    updateUserPassword(passData);
    setShowSavedAlert(true);
  };

  // Function to update user password
  const updateUserPassword = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/profile-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setIsLoading(false);
      if (res?.status === 200) {
        console.log("check pass");
        dispatch(
          setToast({
            showSnackBar: true,
            message: "Password Updated Successfully!",
            type: "green",
          }),
        );
      }
    } catch (err) {
      setIsLoading(false);
      let statusCode = err?.response?.status;
      if (statusCode && statusCode === 401) {
        dispatch(logout());
        router.push("/auth?type=login");
      } else if (
        statusCode &&
        statusCode === 400 &&
        err?.response?.data?.old_password
      ) {
        setOldPasswordError(true);
      }
    }
  };

  return (
    <>
      {/* Conditional rendering: Show either edit mode or privacy settings based on editMode state */}
      {editMode ? (
        <PasswordChangeForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
          showCurrentPassword={showCurrentPassword}
          setShowCurrentPassword={setShowCurrentPassword}
          showNewPassword={showNewPassword}
          setShowNewPassword={setShowNewPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          oldPasswordError={oldPasswordError}
          handleTogglePasswordVisibility={handleTogglePasswordVisibility}
          handleSubmitForm={submitForm}
          isLoading={isLoading}
          editMode={editMode}
          handleEditClick={() => setEditMode(!editMode)}
        />
      ) : (
        <VisibilitySettings
          showSavedAlert={showSavedAlert}
          setShowSavedAlert={setShowSavedAlert}
          editMode={editMode}
          handleEditClick={() => setEditMode(!editMode)}
        />
      )}
    </>
  );
};

export default SettingsPrivacy;
