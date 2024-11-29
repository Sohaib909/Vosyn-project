import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import useStatusNotification from "@/hooks/useStatusNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { setUserInfo } from "../../../reduxSlices/userSlice";
import AuthInput from "../AuthInput/AuthInput";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { setStatus } = useStatusNotification();
  const router = useRouter();

  const [loginApiError, setLoginApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, {
      message: "Password cannot be empty",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const submitLoginForm = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { data: data });

      // On success, save token, set status to imform user, set logged in status and set user info.
      if (res?.status === 200) {
        setStatus("Login successful", "success");
        dispatch(setUserInfo(res?.data?.user || {}));
        router.push("/home?tab=featured");
      }
    } catch (err) {
      const statusCode = err?.response?.status;

      if (statusCode && statusCode === 400) {
        const loginApiError = err?.response?.data?.errors;

        if (loginApiError) {
          setLoginApiError(mapArrayToObject(loginApiError));
          setStatus(
            "There is an error with your inputs. Please double-check the inputs marked in red.",
            "error",
            10000,
          );
        }
      } else {
        setStatus("Some error ocurred. Please try again later", "error", 10000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const removeLoginApiError = (formField) => {
    // Check if loginApiError is undefined or is an empty object
    if (loginApiError && Object.keys(loginApiError).length > 0) {
      setLoginApiError((prevState) => {
        let newState = { ...prevState };

        if (loginApiError[formField]) {
          delete newState[formField];
        }
        if (loginApiError["non_field_errors"]) {
          delete newState["non_field_errors"];
        }
        return newState;
      });
    }
  };

  return (
    <Box className={styles.loginContent}>
      <Box component="form" onSubmit={handleSubmit(submitLoginForm)}>
        <AuthInput
          label="Email address"
          id="login-email"
          register={register("email", {
            onChange: () => removeLoginApiError("email"),
          })}
          error={
            errors.email ||
            loginApiError?.email ||
            loginApiError?.non_field_errors
          }
          helperText={errors.email?.message || loginApiError?.email}
          variant="email"
          placeholderText="username@example.com"
        />

        <AuthInput
          label="Password"
          id="login-password"
          register={register("password", {
            onChange: () => {
              removeLoginApiError("password");
            },
          })}
          error={
            errors.password ||
            loginApiError?.password ||
            loginApiError?.non_field_errors
          }
          helperText={errors.password?.message || loginApiError?.password}
          variant="password"
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
        />

        <Link href="/forgot-password" className={styles.forgotPwd}>
          Forgot Password?
        </Link>

        {loginApiError?.non_field_errors && (
          <Typography className={styles.error}>
            {loginApiError?.non_field_errors}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          className={`${styles.formbtn} ${styles.loginbtn} ${isLoading ? styles.buttonLoading : ""}`}
          variant="contained"
        >
          Log In
        </Button>
      </Box>

      <Typography className={`${styles.noAccountText}`}>
        No account?
        <Link href="/auth?type=signup" className={styles.signupLink}>
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
