//component file for SettingsPrivacy.jsx
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./SettingsPage.css";

export const PasswordChangeForm = ({
  register,
  handleSubmit,
  errors,
  trigger,
  getValues,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  oldPasswordError,
  handleTogglePasswordVisibility,
  handleSubmitForm,
  isLoading,
  editMode,
  handleEditClick,
}) => {
  return (
    <form
      autoComplete="off"
      className="privacy-settings"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="info-section-title privacy-section-title">
        Change Password
      </div>
      <div className="info-item password-item privacy-option">
        <label className="info-title">
          Current Password
          <div className="password-input-wrapper">
            <input
              autoComplete="off"
              {...register("currentpassword", {
                required: "Current password is required",
                onChange: () => {
                  if (errors?.currentpassword) {
                    trigger("currentpassword");
                  }
                  // No function call here
                },
              })}
              type={showCurrentPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() =>
                handleTogglePasswordVisibility(setShowCurrentPassword)
              }
              className="showPasswordButton"
            >
              {showCurrentPassword ? (
                <FaEye size={18} />
              ) : (
                <FaEyeSlash size={18} />
              )}
            </button>
          </div>
        </label>
        <p className="fieldError">
          &nbsp;
          {errors?.currentpassword && errors.currentpassword?.message}
          {oldPasswordError && "Please verify your old password"}{" "}
          {/* Displaying error message */}
        </p>
      </div>

      <div className="privacy-option new-password">
        <div className="info-item password-item">
          <label className="info-title">
            New Password
            <div className="password-input-wrapper">
              <input
                {...register("password1", {
                  required: "New password is required",
                  onChange: () => {
                    if (errors?.password1) {
                      trigger("password1");
                    }
                  },
                })}
                type={showNewPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() =>
                  handleTogglePasswordVisibility(setShowNewPassword)
                }
                className="showPasswordButton"
              >
                {showNewPassword ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
          </label>
          <p className="fieldError">
            &nbsp;{errors?.password1 && errors.password1?.message}
          </p>
        </div>

        <div className="info-item password-item">
          <label className="info-title">
            Confirm New Password
            <div className="password-input-wrapper">
              <input
                {...register("password2", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === getValues()?.password1 ||
                    "Passwords do not match",
                  onChange: () => {
                    if (errors?.password2) {
                      trigger("password2");
                    }
                  },
                })}
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() =>
                  handleTogglePasswordVisibility(setShowConfirmPassword)
                }
                className="showPasswordButton"
              >
                {showConfirmPassword ? (
                  <FaEye size={18} />
                ) : (
                  <FaEyeSlash size={18} />
                )}
              </button>
            </div>
          </label>
          <p className="fieldError">
            &nbsp;{errors?.password2 && errors.password2?.message}
          </p>
        </div>
      </div>
      {editMode && (
        <div className="buttons-container">
          <>
            <button disabled={isLoading} className="edit-button" type="submit">
              Save Changes
            </button>
            <button className="cancel-button" onClick={handleEditClick}>
              Cancel
            </button>
          </>
        </div>
      )}
    </form>
  );
};

export const VisibilitySettings = ({
  showSavedAlert,
  setShowSavedAlert,
  handleEditClick,
}) => {
  return (
    <div className="privacy-settings">
      <div className="info-section-title privacy-section-title">Visibility</div>
      <div className="privacy-option-tiles">
        <div className="privacy-option">
          <div className="privacy-text-wrapper">
            <div className="privacy-toggle-title"> Set to Private</div>
            <div className="privacy-toggle-text">
              {" "}
              Your profile won&apos;t be visible to other users.
            </div>
          </div>
          <label className="privacy-toggle-switch">
            toggle
            <input
              type="checkbox"
              onClick={() => {
                if (showSavedAlert) {
                  setShowSavedAlert(false);
                  setTimeout(() => {
                    setShowSavedAlert(true);
                  }, 150);
                } else {
                  setShowSavedAlert(true);
                }
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div
          role="button"
          tabIndex={0}
          className="privacy-option change-password"
          onClick={() => {
            setShowSavedAlert(false);
            handleEditClick();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowSavedAlert(false);
              handleEditClick();
            }
          }}
        >
          <div className="privacy-text-wrapper">
            <div className="privacy-toggle-title"> Change Password</div>
            <div className="privacy-toggle-text">
              {" "}
              Update your account password.
            </div>
          </div>
          <img
            src={process.env.PUBLIC_URL + `/assets/SettingsPrivacy/svg/gt.svg`}
            className="change-password-icon"
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};
