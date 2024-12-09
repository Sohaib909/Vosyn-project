"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectLanguage,
  setOriginalLanguage,
  setTranslatedLanguage,
} from "@/reduxSlices/languageSlice";
import {
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Image from "next/image";

import styles from "./TranslationPanelInput.module.css";

const TranslationPanelInput = ({ array, label }) => {
  const dispatch = useDispatch();

  const { selectedTranslatedLanguage, selectedOriginalLanguage } =
    useSelector(selectLanguage);

  // Handle language selection change for both translated and original languages
  const handleLanguageChange = (event) => {
    if (label === "Detected Language") {
      dispatch(setOriginalLanguage(event.target.value));
    } else {
      dispatch(setTranslatedLanguage(event.target.value));
    }
  };

  return (
    <FormControl disabled sx={{ width: "100%" }}>
      <InputLabel id="selectLanguageLabel">{label}</InputLabel>
      <Select
        sx={{ height: "3rem" }}
        labelId="selectLanguageLabel"
        id={styles.multipleLanguage}
        value={
          label === "Detected Language"
            ? selectedOriginalLanguage
            : selectedTranslatedLanguage
        }
        onChange={(event) => handleLanguageChange(event)}
        input={<OutlinedInput label={label} />}
      >
        {array.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <ListItemIcon>
              <Image
                alt="flag icon"
                width={32}
                height={32}
                src={`https://flagsapi.com/${lang.code}/flat/64.png`}
              />
            </ListItemIcon>
            <ListItemText>{lang.name}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TranslationPanelInput;
