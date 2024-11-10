import React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Divider, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ThirdPartyAccounts = ({ onBack }) => {
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

  const Label = ({
    image = "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  }) => (
    <Box
      sx={{
        pl: "2vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2vh",
        cursor: "pointer",
        "&:hover": {
          opacity: "0.8",
        },
      }}
    >
      <Box
        sx={{
          width: "10vh",
          height: "10vh",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginBottom: "10px",
          backgroundImage: `url(${image})`,
        }}
      ></Box>
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        Edit
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "80%",
        mx: "10%",
        mt: "10vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={2}>
          <div>
            <Button
              startIcon={<ArrowBackIosNew />}
              onClick={onBack}
              sx={{
                textTransform: "none",
                bgcolor: "transparent",
                px: "8px",
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              Back
            </Button>
          </div>
        </Grid>

        <Grid item size={8}>
          <Typography variant="h5">Link 3rd Party Accounts</Typography>
          <Typography variant="subtitle1" sx={{ opacity: "0.7" }}>
            {" "}
            VosynVerse supports vast language compatibility and supports
            multi-language for many features. You have the flexibility to
            explore and consume content in the language of your choice.
          </Typography>

          <Box sx={{ mt: "3vh" }}>
            <Typography variant="h6" sx={{ mb: "5vh" }}>
              Linked accounts
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1vw" }}>
              {labels.map((label, i) => (
                <Label key={i} image={label.image} />
              ))}
              <Box
                sx={{
                  pl: "2vw",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2vh",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: "0.8",
                  },
                }}
              >
                <AddCircleOutlineIcon sx={{ fontSize: 60, height: "11vh" }} />
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Edit
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ mt: "3vh" }}>
            <Typography variant="h6" sx={{ mb: "1vh" }}>
              Add more accounts
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: "0.7", mb: "5vh" }}>
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
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1vw" }}>
              {labels.map((label, i) => (
                <Label key={i} image={label.image} />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThirdPartyAccounts;
