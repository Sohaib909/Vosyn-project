import React, { useState } from "react";
import { useForm } from "react-hook-form";

import useStatusNotification from "@/hooks/useStatusNotification";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import axios from "axios";

import styles from "./Signup.module.css";

/**
 *
 * @param {*} text - The text to display with the blob animation
 *
 * @returns - A component containing the Signup form to be rendered on the auth page
 */
const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setStatus } = useStatusNotification();

  const [formFieldError, setFormFieldError] = useState();

  const [termsAgreementChecked, setTermsAgreementChecked] = useState(false);

  const handleTermsAgreementChange = (event) => {
    setTermsAgreementChecked(event.target.checked);
  };

  const signupHandler = async (data) => {
    try {
      const requestBody = {
        ...data,
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(signupHandler)}
      className={styles.signupContainer}
    >
      <Box className={styles.nameFieldContainer}>
        <TextField
          id="signup-first-name"
          fullWidth
          size="medium"
          placeholder="Your First Name"
          label="First Name"
          {...register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Please enter a valid name",
            },
            maxLength: {
              value: 25,
              message: "Name must be less than 25 characters",
            },
          })}
          error={!!errors.firstName}
          helperText={`${errors?.firstName?.message ? errors.firstName.message : ""} ${formFieldError?.first_name ? formFieldError.first_name : ""}`}
        />
        <TextField
          id="signup-last-name"
          fullWidth
          size="medium"
          placeholder="Your Last Name"
          label="Last Name"
          {...register("lastName", {
            required: "Last name is required",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Please enter a valid name",
            },
            maxLength: {
              value: 25,
              message: "Name must be less than 25 characters",
            },
          })}
          error={!!errors.lastName}
          helperText={`${errors?.lastName?.message ? errors.lastName.message : ""} ${formFieldError?.last_name ? formFieldError.last_name : ""}`}
        />
      </Box>
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
        })}
        error={!!errors.email}
        helperText={`${errors?.email?.message ? errors.email.message : ""} ${formFieldError?.email ? formFieldError.email : ""}`}
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
        })}
        error={!!errors.username}
        helperText={`${errors?.username?.message ? errors.username.message : ""} ${formFieldError?.username ? formFieldError.username : ""}`}
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
        })}
        error={!!errors.password}
        helperText="Password must be at least 8 characters and contain at least 1 letter,
                1 number, and, 1 symbol."
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAgreementChecked}
              onChange={handleTermsAgreementChange}
            />
          }
          label="I accept the
                Terms & Conditions and Privacy Policy"
        />
      </FormGroup>
      <Button disabled={isSubmitting} variant="contained" type="submit">
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
