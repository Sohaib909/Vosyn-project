import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/reduxSlices/authSlice";
import { setToast } from "@/reduxSlices/snackbarSlice";
import { setUserInfo } from "@/reduxSlices/userSlice";
import {
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  usernameValidation,
} from "@/utils/formValidation";
import { City, Country } from "country-state-city";
import moment from "moment";
import { useRouter } from "next/navigation";

import "./SettingsPage.css";

const displayNamesOrder = {
  first_name: { value: "First Name", order: 1 },
  last_name: { value: "Last Name", order: 2 },
  city: { value: "City", order: 3 },
  country: { value: "Country", order: 4 },
  gender: { value: "Gender", order: 5 },
  dob: { value: "Date of Birth", order: 6 },
  email: { value: "Email Address", order: 7 },
  username: { value: "Username", order: 8 },
};
const genderChoices = {
  M: "Male",
  F: "Female",
  O: "Other",
  N: "Prefer Not to Say",
};

const selectProfileDetails = (state) => state?.userInfo?.userProfile;
const selectOnboardingStatus = (state) =>
  state?.userInfo?.userProfile?.has_finished_onboarding;

const SettingsAccount = ({ setShowSavedAlert }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryDropDownOpen, setCountryDropDownOpen] = useState(false);
  const [cityDropDownOpen, setCityDropDownOpen] = useState(false);
  const [submittedFormErrors, setSubmittedFormErros] = useState({
    username: "",
    email: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState({
    emailSuccess: false,
    formSuccess: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const countryList = Country.getAllCountries();
  const profileDetails = useSelector(selectProfileDetails);

  const isOnboardingCompleted = useSelector(selectOnboardingStatus);

  // To prevent errors if user hasn't completed profle setup before opening account settings which can cause the app to crash
  const onBoardedDobDetails = {
    dob: profileDetails?.dob
      ? moment(profileDetails?.dob, "YYYY-MM-DD")?.toDate()
      : null,
  };

  // Function to return default values for form fields
  const returnDefaultValues = () => {
    // Set's to '--' if onBoarding isn't completed to prevent errors caused by null error when calling split function in year, month, and day
    let dobValue = isOnboardingCompleted ? "--" : onBoardedDobDetails;
    return {
      first_name: profileDetails?.first_name,
      last_name: profileDetails?.last_name,
      email: profileDetails?.email,
      username: profileDetails?.username,
      gender: profileDetails?.gender,
      dob: dobValue,
      year: profileDetails?.dob ? profileDetails?.dob.split("-")?.[0] : "",
      month:
        profileDetails?.dob && profileDetails?.dob.split("-")?.[1]
          ? parseInt(profileDetails?.dob.split("-")?.[1])
          : "",
      day: profileDetails?.dob ? profileDetails?.dob.split("-")?.[2] : "",
      country: profileDetails?.country?.name,
      city: profileDetails?.city,
    };
  };

  const {
    getValues,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: returnDefaultValues(),
  });

  // Logging dob details on component mount
  useEffect(() => {
    console.log("checkcheck", profileDetails?.dob.split("-")?.[1]);
  }, []);

  // Watching changes in country and city fields
  const country = watch("country");
  const city = watch("city");

  // State variables for edit mode and account info
  const [editMode, setEditMode] = useState(false);
  const [accountInfo, setAccountInfo] = useState([]);

  useEffect(() => {
    console.log("country changed", country);

    // Filtering country list based on input
    const filter = countryList.filter((item) =>
      item?.name?.toLowerCase()?.startsWith(country?.toLowerCase()),
    );
    setFilteredCountries(filter);

    // Fetching cities of selected country
    if (country) {
      const selectedCountry = countryList.find(
        (item) => item.name.toLowerCase() === country.toLowerCase(),
      );
      if (selectedCountry) {
        const isoCode = Country.getCountryByCode(
          selectedCountry.isoCode,
        )?.isoCode;
        console.log("iso", isoCode);
        if (isoCode) {
          setCityList(City.getCitiesOfCountry(isoCode));
        }
      }
    }
  }, [country, countryList]);

  // Effect to handle changes in city
  useEffect(() => {
    console.log("City changed. City:", city);
    console.log("City list:", cityList);
    const filter = cityList.filter((item) =>
      item.name.toLowerCase().startsWith(city.toLowerCase()),
    );
    console.log("Filtered cities:", filter);
    setFilteredCities(filter);
  }, [city, cityList]);

  // Effect to update account info based on profile details
  useEffect(() => {
    let userInfo = [];
    if (profileDetails) {
      for (let key in profileDetails) {
        if (displayNamesOrder[key]) {
          let desc;
          if (key === "country") desc = profileDetails?.[key]?.name;
          else if (key === "dob")
            desc = profileDetails?.[key]
              ? moment(profileDetails?.[key], "YYYY-MM-DD")?.toDate()
              : "";
          else if (key === "gender")
            desc = genderChoices?.[profileDetails?.[key]];
          else {
            desc = profileDetails?.[key];
          }
          userInfo.push({
            title: displayNamesOrder?.[key]?.value,
            order: displayNamesOrder?.[key]?.order,
            desc,
          });
        }
      }
    }
    userInfo.sort((userInfo1, userInfo2) => {
      return userInfo1.order - userInfo2.order;
    });
    console.log("userInfo", userInfo);
    setAccountInfo(userInfo);
  }, [profileDetails]);

  // Function to handle form submission
  const submitLoginUpForm = (data) => {
    // Constructing form data
    let formData = {
      ...data,
      dob: `${getValues()?.year}-${getValues()?.month}-${getValues()?.day}`,
      country: countryList.find(
        (country) =>
          country?.name?.toLowerCase() == data?.country?.toLowerCase(),
      )?.isoCode,
    };
    console.log("formdata", formData);

    // Extracting email data
    let emailData = {
      email: data?.email,
    };

    // Removing unnecessary fields from formData
    delete formData.email;
    delete formData.year;
    delete formData.month;
    delete formData.day;

    // Resetting update success flags
    setUpdateSuccess({ emailSuccess: false, formSuccess: false });

    // Updating user profile
    updateUserProfile(formData);
    updateUserProfile(emailData, true);

    // Logging entered data and displaying alert
    console.log("data entered", formData, emailData);
    setShowSavedAlert(true);
  };

  // Effect to handle update success
  useEffect(() => {
    console.log("updateSuccess", updateSuccess);
    if (updateSuccess.emailSuccess && updateSuccess.formSuccess) {
      console.log("navigate the user");
      setEditMode(false);
    }
  }, [updateSuccess]);

  // Function to update user profile
  const updateUserProfile = async (data, emailUpdate = false) => {
    try {
      // Sending update request
      const res = await fetch("/api/auth/profile-update", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log("updateUserProfile", res);

      if (res?.status === 200) {
        emailUpdate
          ? setUpdateSuccess((prev) => ({
              ...prev,
              emailSuccess: true,
            }))
          : setUpdateSuccess((prev) => ({
              ...prev,
              formSuccess: true,
            }));

        // Dispatching user info if not email update
        if (!emailUpdate && res?.data?.user) {
          dispatch(setUserInfo(res?.data?.user));
        }
      } else if (res?.status === 202 && emailUpdate) {
        // Handling email verification
        console.log("updateUserProfile Email Updated");
        setUpdateSuccess((prev) => ({ ...prev, emailSuccess: true }));
        dispatch(
          setToast({
            showSnackBar: true,
            message: "Please verify your email",
            type: "green",
          }),
        );
      } else if (res?.status === 204) {
        // Handling no updates
        console.log("updateUserProfile No Updates", emailUpdate);
        emailUpdate
          ? setUpdateSuccess((prev) => ({
              ...prev,
              emailSuccess: true,
            }))
          : setUpdateSuccess((prev) => ({
              ...prev,
              formSuccess: true,
            }));
      }
    } catch (err) {
      console.log("updateUserProfile err", err);
      let statusCode = err?.response?.status;
      if (statusCode && statusCode === 401) {
        dispatch(logout());
        router.push("/auth?type=login");
      } else if (statusCode && statusCode === 400 && err?.response?.data) {
        console.log("400", err?.response?.data);
        if (err?.response?.data?.email) {
          setSubmittedFormErros((prev) => ({
            ...prev,
            email: "User with this email already exists.",
          }));
        } else if (err?.response?.data?.username) {
          setSubmittedFormErros((prev) => ({
            ...prev,
            username: "A user with that username already exists.",
          }));
        }
      } else {
        dispatch(
          setToast({
            showSnackBar: true,
            message: "Please try again later",
            type: "red",
          }),
        );
      }
    }
  };

  // Function to toggle edit mode
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  // Function to get suffix for day
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Function to render information in view mode
  const renderInfoViewMode = (infoItem, index) => {
    let title, desc;

    // Handling specific titles
    if (infoItem.title === "First Name") {
      title = "Name";
      desc = (
        <>
          {infoItem.desc}{" "}
          {index < accountInfo.length - 1 && accountInfo[index + 1].desc}
        </>
      );
    } else if (infoItem.title === "City") {
      title = "Location";
      desc = (
        <>
          {infoItem.desc}
          {", "}
          {index < accountInfo.length - 1 && accountInfo[index + 1].desc}
        </>
      );
    } else {
      title = infoItem.title;
      desc = infoItem.desc;
    }

    return (
      <>
        <div className="info-title">{title}</div>

        {infoItem.desc instanceof Date ? (
          `${infoItem.desc.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}${getDaySuffix(
            infoItem.desc.getDate(),
          )}, ${infoItem.desc.getFullYear()}`
        ) : (
          <div className="info-desc">{desc}</div>
        )}
      </>
    );
  };

  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  const renderInfoEditMode = () => {
    const findCountryName = (value) => {
      console.log("findCountryName", value, getValues());
      if (
        countryList.some(
          (country) => country?.name?.toLowerCase() == value.toLowerCase(),
        )
      ) {
        console.log("findCountryName yes");
        return true;
      } else {
        console.log("findCountryName no");
        return false;
      }
    };

    const findCityName = (value) => {
      console.log("findCityName", value, getValues());
      if (
        cityList.some(
          (city) =>
            (city?.name + ", " + city?.stateCode)?.toLowerCase() ==
            value.toLowerCase(),
        )
      ) {
        console.log("findCityName yes");
        return true;
      } else {
        console.log("findCityName no");
        return false;
      }
    };

    const validateDate = () => {
      console.log("getValues()", getValues(), new Date().getFullYear());
      const { month, day, year } = getValues();
      if (!month && !day && !year) return true;
      if (month && day && /^\d+$/.test(day) && year && /^\d+$/.test(year)) {
        let date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
        console.log("datechecker", date);
        if (date > moment() || !date.isValid()) return false;
        return true;
      } else {
        return false;
      }
    };

    return (
      <form
        className="account-settings"
        onSubmit={handleSubmit(submitLoginUpForm)}
      >
        <div className="info-item">
          <label htmlFor="firstName" className="info-title">
            First Name
          </label>
          <input
            {...register("first_name", {
              ...firstnameValidation(),
              onChange: () => {
                if (errors.first_name) {
                  trigger("first_name");
                }
              },
            })}
            className="info-desc"
            id="firstName"
            type="text"
          />
          <p className="fieldError">
            &nbsp;{errors?.first_name && errors.first_name?.message}
          </p>
        </div>

        <div className="info-item">
          <label htmlFor="lastName" className="info-title">
            Last Name
          </label>
          <input
            {...register("last_name", {
              ...lastnameValidation(),
              onChange: () => {
                if (errors.last_name) {
                  trigger("last_name");
                }
              },
            })}
            className="info-desc"
            id="lastName"
            type="text"
          />
          <p className="fieldError">
            &nbsp;{errors?.last_name && errors.last_name?.message}
          </p>
        </div>

        <div className="info-item">
          <label htmlFor="email" className="info-title">
            Email Address
          </label>
          <input
            {...register("email", {
              ...emailValidation(),
              onChange: () => {
                if (errors.email) {
                  trigger("email");
                }
                if (submittedFormErrors?.email) {
                  setSubmittedFormErros((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }
              },
            })}
            className="info-desc"
            id="email"
            type="text"
          />
          <p className="fieldError">
            &nbsp;{errors?.email && errors.email?.message}
            {submittedFormErrors && submittedFormErrors?.email}
          </p>
        </div>

        <div className="info-item">
          <label htmlFor="username" className="info-title">
            Username
          </label>
          <input
            {...register("username", {
              ...usernameValidation(),
              onChange: () => {
                if (errors.username) {
                  trigger("username");
                }
                if (submittedFormErrors?.username) {
                  setSubmittedFormErros((prev) => ({
                    ...prev,
                    username: "",
                  }));
                }
              },
            })}
            className="info-desc"
            id="username"
            type="text"
          />
          <p className="fieldError">
            &nbsp;{errors?.username && errors.username?.message}
            {submittedFormErrors && submittedFormErrors?.username}
          </p>
        </div>

        <div className="form-spacer"></div>

        <div className="info-item">
          <label htmlFor="country" className="info-title">
            Country
          </label>
          <input
            {...register("country", {
              onChange: () => {
                setCountryDropDownOpen(true);
                if (errors.country) {
                  trigger("country");
                }
              },
              validate: (value) =>
                findCountryName(value) || "Please enter a valid country",
            })}
            className="info-desc"
            id="country"
            type="text"
            autoComplete="off"
            onBlur={() => {
              setTimeout(() => {
                setCountryDropDownOpen(false);
              }, 200);
            }}
          />
          <p className="fieldError">
            &nbsp;{errors?.country && errors.country?.message}
          </p>
          {countryDropDownOpen && filteredCountries.length > 0 && (
            <ul className="dropdownMenu">
              {filteredCountries.map((country, index) => (
                <li
                  key={`${country.name}-${index}`}
                  role="option"
                  tabIndex={0}
                  value={country.code}
                  onClick={() => {
                    setValue("country", country.name);
                    if (errors.country) {
                      trigger("country");
                    }
                    setCountryDropDownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setValue("country", country.name);
                      if (errors.country) {
                        trigger("country");
                      }
                      setCountryDropDownOpen(false);
                    }
                  }}
                >
                  {country.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="info-item">
          <label htmlFor="city" className="info-title">
            City
          </label>
          <input
            {...register("city", {
              onChange: () => {
                setCityDropDownOpen(true);
                if (errors.city) {
                  trigger("city");
                }
              },
              validate: (value) =>
                findCityName(value) || "Please enter a valid city",
            })}
            className="info-desc"
            id="city"
            type="text"
            autoComplete="off"
            onBlur={() => {
              setTimeout(() => {
                setCityDropDownOpen(false);
              }, 200);
            }}
          />
          <p className="fieldError">
            &nbsp;{errors?.city && errors.city?.message}
          </p>
          {cityDropDownOpen && filteredCities.length > 0 && (
            <ul className="dropdownMenu">
              {filteredCities.map((city, index) => (
                <li
                  key={`${city.name}-${index}`}
                  role="option"
                  tabIndex={0}
                  value={city.stateCode}
                  onClick={() => {
                    setValue("city", city?.name + ", " + city?.stateCode);
                    if (errors.city) {
                      trigger("city");
                    }
                    setCityDropDownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setValue("city", city?.name + ", " + city?.stateCode);
                      if (errors.city) {
                        trigger("city");
                      }
                      setCityDropDownOpen(false);
                    }
                  }}
                >
                  {city?.name + ", " + city?.stateCode}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="info-item">
          <label htmlFor="gender" className="info-title">
            Gender
          </label>
          <select {...register("gender")} className="info-desc" id="gender">
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
            <option value="N">Prefer Not to Say</option>
          </select>
        </div>

        <div className="info-item">
          <label htmlFor="dob" className="info-title">
            Date of Birth
          </label>
          <div className="date-options-container">
            <input
              className="info-desc day"
              type="text"
              placeholder="Day"
              {...register("day", {
                max: {
                  value: 31,
                  message: "Please enter a Valid Date",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Please enter a Valid Date",
                },
                validate: () => validateDate() || "Please enter a Valid Date",
              })}
            />

            <select
              className="info-desc month"
              {...register("month", {
                validate: () => validateDate() || "Please enter a Valid Date",
              })}
            >
              {" "}
              <option disabled selected value="">
                {" "}
                -- select an option --{" "}
              </option>
              {months.map((m, index) => (
                <option key={index} value={m.value}>
                  {m.name}
                </option>
              ))}
            </select>

            <input
              className="info-desc year"
              type="text"
              placeholder="Year"
              {...register("year", {
                min: {
                  value: 1900,
                  message: "Please enter a Valid Date",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Please enter a Valid Date",
                },
                validate: () => validateDate() || "Please enter a Valid Date",
              })}
            />
          </div>
          <p className="fieldError">
            &nbsp;
            {(errors?.month || errors?.year || errors?.day) &&
              "Please enter a valid date"}
          </p>
        </div>

        <div className="buttons-container">
          <button className="save-button" type="submit">
            Save Changes
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              console.log("reset user values");
              reset(returnDefaultValues());
              handleEditClick();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="account-settings">
      <div className="info-section-title">
        {editMode && "Edit "}Account Information
      </div>

      {!editMode ? (
        <>
          {accountInfo.map(
            (infoItem, index) =>
              infoItem.title !== "Last Name" &&
              infoItem.title !== "Country" && (
                <div key={index} className="info-item">
                  {renderInfoViewMode(infoItem, index)}
                </div>
              ),
          )}
          <button
            className="edit-button"
            onClick={() => {
              handleEditClick();
              setShowSavedAlert(false);
            }}
          >
            Edit Information
          </button>
        </>
      ) : (
        <>{renderInfoEditMode()}</>
      )}
    </div>
  );
};

export default SettingsAccount;
