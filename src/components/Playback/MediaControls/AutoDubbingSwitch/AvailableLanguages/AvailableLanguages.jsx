// this is the code for just limited languages. Remove this when we want to use show all languages and search bar and uncomment the code below.
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectPlayer,
  setDubbedLanguage,
  setPinnedLanguage,
} from "@/reduxSlices/playerSlice";
import { Box, Typography } from "@mui/material";

import styles from "./AvailableLanguages.module.css";

const AvailableLanguages = ({ languageTimeout, setSelectedLanguage }) => {
  const languageList = ["en", "fr", "es"];

  const { pinnedLanguages } = useSelector(selectPlayer);

  const dispatch = useDispatch();

  // const handleLanguageClick = (langObj) => {
  //   const index = langObj.index - 1;

  //   //Skip translation if the selected language is already active
  //   if (index === selectedTrackIndex) {
  //     return;
  //   }
  //   handleAudioChange(langObj);
  // };

  const addToPinnedLanguages = (language) => {
    if (!pinnedLanguages.some((item) => item.name === language)) {
      setPinnedLanguage([...pinnedLanguages, { name: language }]);
    }
  };

  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
      onMouseEnter={() => clearTimeout(languageTimeout.current)}
    >
      <Box className={styles.defaultLanguages}>
        {languageList.length > 0 ? (
          languageList.map((languageObj, index) => (
            <Typography
              variant="body2"
              key={index}
              sx={{
                width: "fit-content",
                backgroundColor: "var(--mui-palette-primary-main)",
                borderRadius: "4px",
                padding: "2px 15px",
                "&:hover": {
                  backgroundColor: "var(--mui-palette-neutral-400)",
                },
              }}
              onClick={() => {
                // handleLanguageClick(languageObj);
                setSelectedLanguage(languageObj);
                addToPinnedLanguages(languageObj);
                dispatch(setDubbedLanguage(languageObj));
              }}
            >
              {languageObj}
            </Typography>
          ))
        ) : (
          <Typography>No track available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AvailableLanguages;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { LANGUAGES_URL } from "@/constants/URLs/constants";
// import useStatusNotification from "@/hooks/useStatusNotification";
// import {
//   selectPlayer,
//   setDubbedLanguage,
//   setPinnedLanguage,
// } from "@/reduxSlices/playerSlice";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import { Box, InputAdornment, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import styles from "./AvailableLanguages.module.css";
// const AvailableLanguages = ({
//   languageTimeout,
//   languageList,
//   selectedTrackIndex,
//   handleAudioChange,
//   setShowLanguagePopup,
//   setSelectedLanguage,
//   setChangeLanguagePopup,
// }) => {
//   const [searchResults, setSearchResults] = useState([]);
//   const { setStatus } = useStatusNotification();
//   const { pinnedLanguages } = useSelector(selectPlayer);
//   const [alpha, setAlpha] = useState();
//   const dispatch = useDispatch();
//   // Fetches languages and filters them based on the search string
//   const getLanguages = async (searchString) => {
//     if (!searchString) return;
//     try {
//       const response = await axios.get(LANGUAGES_URL);
//       if (!response.ok) {
//         setStatus(`Error Status: ${response.status}`, "error");
//       }
//       const data = await response?.data;
//       const result = data
//         ?.map((item) => item["English"])
//         .filter(
//           (language) =>
//             language &&
//             language.toLowerCase().includes(searchString.toLowerCase()),
//         );
//       const lan = data?.filter((item) =>
//         item["English"]?.toLowerCase().includes(searchString.toLowerCase()),
//       );
//       setAlpha(lan);
//       setSearchResults(result);
//     } catch (error) {
//       setStatus("Error fetching the data", "error");
//     }
//   };
//   // Function to get the alpha2 of the selected dubbedLanguage
//   const getSelectedLanguageAlpha2 = (lan) => {
//     const language =
//       alpha?.find((item) => item["English"] === lan)?.["alpha2"] || null;
//     dispatch(setDubbedLanguage(language));
//   };
//   // Updates search input and makes a call to fetch languages
//   const handleChange = (input) => {
//     getLanguages(input);
//   };
//   // Initiates the audio track change when a language is selected
//   const handleLanguageClick = (langObj) => {
//     const index = langObj.index - 1;
//     //Skip translation if the selected language is already active
//     if (index === selectedTrackIndex) {
//       return;
//     }
//     handleAudioChange(langObj);
//   };
//   const addToPinnedLanguages = (language) => {
//     if (!pinnedLanguages.some((item) => item.name === language)) {
//       setPinnedLanguage([...pinnedLanguages, { name: language }]);
//     }
//   };
//   return (
//     <Box
//       component="section"
//       sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
//       onMouseEnter={() => clearTimeout(languageTimeout.current)}
//     >
//       <Box>
//         <TextField
//           id="search"
//           fullWidth
//           placeholder="Search any language"
//           aria-label="Search"
//           size="small"
//           onChange={(e) => handleChange(e.target.value)}
//           slotProps={{
//             input: {
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchRoundedIcon />
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />
//       </Box>
//       <Box className={styles.defaultLanguages}>
//         {languageList.length > 0 ? (
//           languageList.map((languageObj, index) => (
//             <Typography
//               variant="body2"
//               key={index}
//               sx={{
//                 width: "fit-content",
//                 backgroundColor:
//                   selectedTrackIndex === languageObj.streamInfo.index
//                     ? "var(--mui-palette-primary-main)"
//                     : "var(--mui-palette-neutral-500)",
//                 borderRadius: "4px",
//                 padding: "2px 15px",
//                 "&:hover": {
//                   backgroundColor: "var(--mui-palette-neutral-400)",
//                 },
//               }}
//               onClick={() => {
//                 handleLanguageClick(languageObj);
//               }}
//             >
//               {languageObj.lang}
//             </Typography>
//           ))
//         ) : (
//           <Typography>No track available</Typography>
//         )}
//       </Box>
//       {searchResults.length > 0 && (
//         <Box
//           sx={{
//             backgroundColor: "var(--mui-palette-neutral-900)",
//             padding: "1rem",
//             borderRadius: "4px",
//             maxHeight: "5rem",
//             overflow: "auto",
//             display: "flex",
//             flexDirection: "column",
//             rowGap: "10px",
//           }}
//         >
//           {searchResults.map((language, index) => (
//             <Typography
//               key={index}
//               variant="body2"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "var(--mui-palette-neutral-800)",
//                   padding: "5px",
//                   borderRadius: "2px",
//                 },
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 addToPinnedLanguages(language);
//                 setShowLanguagePopup(false);
//                 setSelectedLanguage(language);
//                 setChangeLanguagePopup(false);
//                 getSelectedLanguageAlpha2(language);
//               }}
//             >
//               {language}
//             </Typography>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };
// export default AvailableLanguages;
