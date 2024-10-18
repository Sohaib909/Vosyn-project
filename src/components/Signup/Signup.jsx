"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import useStatusNotification from "@/hooks/useStatusNotification";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import TermsAgreementModal from "@/components/TermsAgreement/TermsAgreementModal";

import styles from "./Signup.module.css";

/**
 *
 * @param {*} text - The text to display with the blob animation
 *
 * @returns - A component containing the Signup form to be rendered on the auth page
 */
const Signup = () => {
  const { setStatus } = useStatusNotification();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [formFieldError, setFormFieldError] = useState({});

  const [termsAgreementChecked, setTermsAgreementChecked] = useState(false);
  const [isTermsAgreementOpen, setIsTermsAgreementOpen] = useState(false);
  const [termsAgreementError, setTermsAgreementError] = useState(false);

  const signupHandler = async (data) => {
    // Validate that terms & conditions/privacy policy has been agreed to
    // TODO: Look into handling terms & conditions/privacy policy validation with react hook form
    if (!termsAgreementChecked) {
      setTermsAgreementError(true);
      return;
    }

    try {
      const requestBody = {
        ...data,
        first_name: data.fullName,
        last_name: "placeholder",
        password2: data.password,
        has_agreed_to_terms: termsAgreementChecked,
        has_agreed_to_privacy_policy: termsAgreementChecked,
      };
      const res = await axios.post("/api/auth/signup", requestBody);

      // Upon account creation, the user will have to verify their account
      // BACKEND TODO: Move account verifcation to be sent through email instead of ntfy
      if (res?.status === 201) {
        setStatus(
          "A verification email has been sent. Please check your inbox.",
          "success",
        );
      }

      // TODO: Handle post account creation (e.g., switch to login, display separate verify account component, navigate to home)
    } catch (err) {
      const statusCode = err?.response?.status;

      if (statusCode === 400) {
        setFormFieldError(err?.response?.data);
        setStatus(
          "There is an error with your inputs. Please double-check the inputs marked in red.",
          "error",
        );
      } else {
        setStatus("An error ocurred. Please try again alter.", "error");
      }
    }
  };

  const removeFormFieldError = (formField) => {
    if (formFieldError[formField]) {
      setFormFieldError((prevState) => {
        let newState = { ...prevState };
        delete newState[formField];
        return newState;
      });
    }
  };

  const handleOpenTermsAgreement = () => setIsTermsAgreementOpen(true);
  const handleCloseTermsAgreement = () => setIsTermsAgreementOpen(false);
  const handleTermsAgreementChange = (event) => {
    setTermsAgreementChecked(event.target.checked);
    setTermsAgreementError(false);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(signupHandler)}
        className={styles.signupContainer}
      >
        <TextField
          id="signup-full-name"
          fullWidth
          size="medium"
          placeholder="Your Full Name"
          label="Full Name"
          {...register("fullName", {
            required: "Full name is required",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Please enter a valid name",
            },
            maxLength: {
              value: 25,
              message: "Name must be less than 25 characters",
            },
            onChange: () => {
              removeFormFieldError("first_name");
            },
          })}
          error={!!errors.fullName || !!formFieldError.first_name}
          helperText={`\u00A0${errors?.fullName?.message ? errors.fullName.message : ""}${formFieldError?.first_name ? formFieldError.first_name : ""}`}
        />
        <TextField
          id="signup-email"
          fullWidth
          size="medium"
          type="email"
          placeholder="name@domain.com"
          label="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email address",
            },
            onChange: () => {
              removeFormFieldError("email");
            },
          })}
          error={!!errors.email || !!formFieldError.email}
          helperText={`\u00A0${errors?.email?.message ? errors.email.message : ""}${formFieldError?.email ? formFieldError.email : ""}`}
        />
        <TextField
          id="signup-username"
          fullWidth
          size="medium"
          placeholder="Your Username"
          label="Username"
          {...register("username", {
            required: "Please enter a valid username",
            pattern: {
              value: /^[A-Za-z0-9_@.]+$/,
              message:
                "Please enter a valid username. Only include letters, numbers, and the special characters: (_, ., @)",
            },
            maxLength: {
              value: 18,
              message: "Username must be between 8 to 18 characters",
            },
            minLength: {
              value: 8,
              message: "Username must be between 8 to 18 characters",
            },
            onChange: () => {
              removeFormFieldError("username");
            },
          })}
          error={!!errors.username || !!formFieldError.username}
          helperText={`\u00A0${errors?.username?.message ? errors.username.message : ""}${formFieldError?.username ? formFieldError.username : ""}`}
        />
        <TextField
          id="signup-password"
          fullWidth
          size="medium"
          type="password"
          autoComplete="new-password"
          placeholder="Your Password"
          label="Password"
          {...register("password", {
            required: "Please enter a password",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              message: "Please enter a valid password",
            },
            onChange: () => {
              removeFormFieldError("password");
            },
          })}
          error={!!errors.password || !!formFieldError.password}
          helperText="Password must be at least 8 characters and contain at least 1 letter,
              1 number, and, 1 symbol."
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAgreementChecked}
                onChange={handleTermsAgreementChange}
                sx={{ color: termsAgreementError ? "red" : "gray" }}
              />
            }
            label={
              <Typography
                sx={{
                  color: termsAgreementError ? "red" : "white",
                  fontSize: "0.75rem",
                  fontWeight: "400",
                }}
              >
                I accept the{" "}
                <ButtonBase
                  type="button"
                  onClick={handleOpenTermsAgreement}
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    textDecoration: "underline",
                  }}
                >
                  Terms & Conditions and Privacy Policy
                </ButtonBase>
              </Typography>
            }
          />
        </FormGroup>
        <Button
          disabled={isSubmitting}
          variant="contained"
          type="submit"
          sx={{ py: "0.5rem", mt: "1rem" }}
        >
          Sign Up
        </Button>
      </Box>
      <TermsAgreementModal
        isModalOpen={isTermsAgreementOpen}
        closeModal={handleCloseTermsAgreement}
      />
    </>
  );
};

export default Signup;
