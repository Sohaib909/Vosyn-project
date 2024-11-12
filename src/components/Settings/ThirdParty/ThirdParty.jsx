import React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Divider, Link, Typography } from "@mui/material";
import Image from "next/image";

const ThirdPartyAccounts = () => {
  const labels = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
    },
  ];

  return (
    <>
      <Typography variant="h5">Link 3rd Party Accounts</Typography>

      <Box sx={{ width: "100%" }}>
        <Typography variant="h6">Linked accounts</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1vw",
            backgroundColor: "var(--mui-palette-neutral-700)",
            padding: "1rem",
            borderRadius: "4px",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {labels.map((label, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: "1rem",
                cursor: "pointer",
              }}
            >
              <Box sx={{ position: "relative", width: "5rem", height: "3rem" }}>
                <Image src={label?.image} fill alt={i} />
              </Box>
              <Typography variant="subtitle1">Edit</Typography>
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              rowGap: "1rem",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: "5rem",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddCircleOutlineIcon />
            </Box>
            <Typography variant="subtitle1">Add More </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6">Add More Accounts</Typography>
        <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
          *Don’t see a platform in our system? {"  "}
          <Link
            sx={{
              textDecoration: "none",
              "&:hover": { color: "#fff", cursor: "pointer" },
            }}
          >
            Send a message to our system
          </Link>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1vw",
            backgroundColor: "var(--mui-palette-neutral-700)",
            padding: "1rem",
            borderRadius: "4px",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {labels.map((label, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: "1rem",
                cursor: "pointer",
              }}
            >
              <Box sx={{ position: "relative", width: "5rem", height: "3rem" }}>
                <Image src={label?.image} fill alt={i} />
              </Box>
              <Typography variant="subtitle1">Link</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider />
    </>
  );
};

export default ThirdPartyAccounts;
