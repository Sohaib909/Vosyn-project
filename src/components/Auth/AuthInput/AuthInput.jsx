import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import styles from "./AuthInput.module.css";

// Scoped CSS module

/**
 * A reusable input component for forms that supports various field types,
 * including password fields with visibility toggle and password validation.
 *
 * variant can be either email, password or text
 */
const AuthInput = ({
  label,
  error,
  helperText,
  register,
  id,
  togglePasswordVisibility,
  showPassword,
  variant = "text",
  placeholderText = "",
  autocomplete = "off",
  ...props
}) => {
  let inputType = "text";

  if (variant === "password" && !showPassword) {
    inputType = "password";
  }
  if (variant === "email") {
    inputType = "email";
  }

  return (
    <FormControl
      variant="outlined"
      fullWidth
      className={styles.formfieldControl}
      error={Boolean(error)}
    >
      <FormLabel className={styles.formfieldLabel} htmlFor={id}>
        {label}
      </FormLabel>
      <OutlinedInput
        {...register}
        id={id}
        aria-describedby={`${id}-helper-text`}
        className={`${styles.formfield} ${error ? styles.inputError : ""}`}
        type={inputType}
        placeholder={placeholderText}
        autoComplete={autocomplete}
        endAdornment={
          variant === "password" && (
            <InputAdornment position="end">
              <IconButton
                className={styles.visibilityIconBox}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <VisibilityIcon className={styles.visibilityIcon} />
                ) : (
                  <VisibilityOffIcon className={styles.visibilityIcon} />
                )}
              </IconButton>
            </InputAdornment>
          )
        }
        {...props}
      />
      {error && helperText && (
        <FormHelperText
          id={`${id}-helper-text`}
          sx={{
            color: "#d32f2f",
            marginLeft: 0,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AuthInput;
