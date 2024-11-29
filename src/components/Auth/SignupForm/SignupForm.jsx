import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { setUserInfo } from "@/reduxSlices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

import AuthInput from "../AuthInput/AuthInput";

import styles from "./SignupForm.module.css";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [signupApiError, setSignupApiError] = useState();
  const { setStatus } = useStatusNotification();
  const dispatch = useDispatch();
  const router = useRouter();

  const signUpSchema = z.object({
    username: z.string().regex(/^[a-zA-Z0-9_]{3,30}$/, {
      message:
        "Username must be 3-30 characters long. Letters, numbers and underscores are allowed.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(12, { message: "Password must be at least 12 characters long." })
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one number.",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character.",
      }),
    hasAgreedToTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the terms and conditions",
      }),
    }),
  });

  const validatePassword = (thePassword) => {
    if (!thePassword) return [];

    const passwordCriteria = [
      {
        test: thePassword.length >= 12,
        message: "At least 12 characters",
      },
      {
        test: /[a-z]/.test(thePassword),
        message: "At least one lowercase letter",
      },
      {
        test: /[A-Z]/.test(thePassword),
        message: "At least one uppercase letter",
      },
      { test: /\d/.test(thePassword), message: "At least one number" },
      {
        test: /[!@#$%^&*(),.?":{}|<>]/.test(thePassword),
        message: "At least one special character",
      },
    ];

    return passwordCriteria.map((criterion) => ({
      ...criterion,
      isValid: criterion.test,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitSignupForm = async (data) => {
    setIsLoading(true);

    try {
      const requestBody = {
        email: data.email,
        password: data.password,
        password2: data.password,
        username: data.username,
        has_agreed_to_terms: data.hasAgreedToTerms,
        has_agreed_to_privacy_policy: data.hasAgreedToTerms,
      };
      const res = await axios.post("/api/auth/signup", requestBody);

      if (res?.status === 201) {
        if (res?.data?.sessionCreationFailed) {
          setStatus(
            "Account created, but user session not established. Try logging in.",
            "warning",
          );
          router.push("/auth?type=login");
          return;
        }

        setStatus("Account created", "success");
        dispatch(setUserInfo(res?.data?.user || {}));
        router.push("/onboarding");
      }

      // TODO: Handle post account creation (e.g., navigate to onboarding)
    } catch (err) {
      const statusCode = err?.response?.status;

      if (statusCode === 400) {
        setSignupApiError(mapArrayToObject(err?.response?.data?.errors));
        setStatus(
          "There is an error with your inputs. Please double-check the inputs marked in red.",
          "error",
          10000,
        );
      } else {
        setStatus("An error ocurred. Please try again later.", "error", 10000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidationResults = validatePassword(password);
  const isPasswordValid =
    passwordValidationResults.filter((p) => p.isValid === false).length === 0;

  const mapArrayToObject = (inputArray) => {
    if (inputArray && inputArray.length > 0) {
      return inputArray.reduce((resultObject, currentValue) => {
        const field = currentValue?.field || "";
        if (field && !resultObject[field]) {
          resultObject[field] = [];
        }

        if (field) {
          resultObject[field].push(currentValue?.message);
        }

        return resultObject;
      }, {});
    } else {
      return undefined;
    }
  };

  const removeSignupApiError = (formField) => {
    // Check if signupApiError is undefined or is an empty object
    if (signupApiError && Object.keys(signupApiError).length > 0) {
      setSignupApiError((prevState) => {
        let newState = { ...prevState };

        if (signupApiError[formField]) {
          delete newState[formField];
        }
        if (signupApiError["non_field_errors"]) {
          delete newState["non_field_errors"];
        }
        return newState;
      });
    }
  };

  const onChangePassword = (newPass) => {
    setPassword(newPass);
    removeSignupApiError("password");
  };

  return (
    <Box className={styles.signupContent}>
      <Box component="form" onSubmit={handleSubmit(submitSignupForm)}>
        <AuthInput
          label="Username"
          id="signup-username"
          register={register("username", {
            onChange: () => {
              removeSignupApiError("username");
            },
          })}
          error={errors.username || signupApiError?.username}
          helperText={errors.username?.message || signupApiError?.username}
          autocomplete="new-username"
        />
        <AuthInput
          label="Email address"
          id="signup-email"
          register={register("email", {
            onChange: () => {
              removeSignupApiError("email");
            },
          })}
          error={errors.email || signupApiError?.email}
          helperText={errors.email?.message || signupApiError?.email}
          variant="email"
          autocomplete="new-email"
          placeholderText="username@example.com"
        />

        <AuthInput
          label="Password"
          id="signup-password"
          register={register("password", {
            onChange: (e) => {
              onChangePassword(e.target.value);
            },
          })}
          error={errors.password || signupApiError?.password}
          helperText={signupApiError?.password || ""}
          variant={"password"}
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
          password={password}
          autocomplete="new-password"
        />
        {password === "" && (
          <Typography className={styles.signupPasswordHelperText}>
            Set a strong password with at least 12 characters, including a
            number, uppercase and lowercase letter, and special symbol.
          </Typography>
        )}
        {!isPasswordValid && (
          <List className={styles.passwordValidation}>
            {passwordValidationResults.map((result, index) => (
              <ListItem
                key={index}
                className={`${styles.passwordValidationItem} ${result.isValid ? styles.green : styles.red}`}
              >
                {result.message}
              </ListItem>
            ))}
          </List>
        )}

        <Box className={styles.acknowledgementBox}>
          <Box className={styles.acknowledgementTop}>
            <Checkbox
              {...register("hasAgreedToTerms")}
              className={styles.checkbox}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 16,
                  color: "#527AF9",
                },
              }}
            />
            <Typography className={styles.acknowledgement}>
              I have read and agree with Vosyn&apos;s{" "}
              <Link className={styles.hyperlink} href={"/terms"}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className={styles.hyperlink} href={"/privacy-policy"}>
                Privacy Policy.
              </Link>
            </Typography>
          </Box>

          {errors.hasAgreedToTerms?.message && (
            <FormHelperText
              id={`hasAgreedToTerms-helper-text`}
              sx={{
                color: "#d32f2f",
                marginLeft: 0,
                fontSize: "0.875rem",
              }}
            >
              {errors.hasAgreedToTerms?.message}
            </FormHelperText>
          )}
        </Box>

        {signupApiError?.non_field_error && (
          <Typography className={styles.error}>
            {signupApiError?.non_field_error}
          </Typography>
        )}

        <Button
          type="submit"
          className={styles.signupBtn}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? `Please wait...` : `Sign Up`}
        </Button>

        <Typography className={styles.signupText}>
          Already have an account?{" "}
          <Link className={styles.existingUsr} href={"/auth?type=login"}>
            Log In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;
