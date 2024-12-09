import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/reduxSlices/authSlice";
import { setUserInfo } from "@/reduxSlices/userSlice";
import { useRouter } from "next/navigation";

import "./SettingsPage.css";

const selectPreferredLanguage = (state) =>
  state?.userInfo?.userProfile?.preferred_language;
const SettingsLang = ({ showSavedAlert, setShowSavedAlert }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const preferred_language = useSelector(selectPreferredLanguage);
  const [lang, setLang] = useState(preferred_language);

  const handleLanguageChange = (e) => {
    setLang(e?.target?.value);
    let data = { preferred_language: e?.target?.value };
    updateUserProfile(data);
  };

  const updateUserProfile = async (data) => {
    try {
      const res = await fetch("/api/auth/profile-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res?.status === 200 && res?.data?.user) {
        dispatch(setUserInfo(res?.data?.user));
      }
    } catch (err) {
      let statusCode = err?.response?.status;
      if (statusCode && statusCode === 401) {
        dispatch(logout());
        router.push("/auth?type=login");
      }
    }
  };

  return (
    <>
      <div className="language-settings">
        <div className="info-section-title language-section-title">
          Default Language
        </div>
        <div className="language-option">
          <div className="language-text-wrapper">
            <div className="language-dropdown-title">Default Language</div>
            <div className="language-dropdown-text">
              Select your default language upon logging in.
            </div>
          </div>
          <form className="settings-dropdown-form" action="">
            <select
              onChange={(val) => {
                handleLanguageChange(val);
                if (showSavedAlert) {
                  setShowSavedAlert(false);
                  setTimeout(() => {
                    setShowSavedAlert(true);
                  }, 150);
                } else {
                  setShowSavedAlert(true);
                }
              }}
              value={lang}
              className="settings-dropdown"
              name="langs"
              id="langs"
            >
              <option value="en">English (US)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            <br></br>
            {/* <input type="submit" value="Save Changes" /> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsLang;
