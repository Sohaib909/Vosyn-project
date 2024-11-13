import React from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";

import ListenCard from "../../ListenCard/ListenCard";
import CreatorCard from "./CreatorCard/CreatorCard";
import PrimaryComponent from "./PrimaryComponent/PrimaryComponent";
import ScrollTab from "./ScrollTab/ScrollTab";
import UpNextCard from "./UpNextCard/UpNextCard";

const trending = {
  id: 1,
  image:
    "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  title: "No Stupid Question",
  subtitle: "214. How to recover from a Scandal?",
  description:
    'How to come back from being "cancelled"? Are we likely to forgive someone if they cry? And what makes a successful public apology?',
  date: "10.06 - 38 mins 9 sec.",
};

const built = {
  id: 1,
  image:
    "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  title: "No Stupid Question",
};

const creators = [
  {
    name: " The happniess lab with Dr. Laurie Santos",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    name: " Creator 2",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    name: " Creator 3",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    name: " Creator 4",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
];

const card = {
  image:
    "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  text: "Molly Wright: How every child can thrive by five",
};

const Selection = ({ data, handleCloseMore }) => {
  return (
    <Box sx={{ px: "3vw", py: "5vh", display: "flex", flexDirection: "row" }}>
      <Box sx={{ flex: 7, width: "70%", py: "1vh", pl: "2vw" }}>
        <Button
          startIcon={<ArrowBackIosIcon />}
          onClick={handleCloseMore}
          disableRipple
          disableFocusRipple
          sx={{ my: "1vh" }}
        >
          Back
        </Button>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            py: "5px",
          }}
        >
          VosynVerse Selection
        </Typography>
        <Typography
          component="p"
          sx={{
            mb: "5vh",
          }}
        >
          Daily selection powered by Vosynverse
        </Typography>
        <PrimaryComponent trending={trending} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            pt: "5vh",
          }}
        >
          More Creators Similar to &quot;{trending.title}&quot;
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", mt: "3vh", gap: "2vw" }}
        >
          {creators.map((creator, i) => {
            return <CreatorCard key={i} creator={creator} />;
          })}
        </Box>
      </Box>
      <Box sx={{ flex: 3, width: "30%" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            pt: "5vh",
          }}
        >
          Streaming other trending content
        </Typography>
        <Box sx={{ width: "100%" }}>
          <ScrollTab />
          <UpNextCard card={card} />
          <Box
            sx={{
              maxHeight: "50vh",
              overflow: "auto",
              pr: "1vw",
            }}
          >
            {data.map((item, i) => (
              <Box key={i} sx={{ mb: "1vh" }}>
                <ListenCard item={item} />
              </Box>
            ))}
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              pt: "5vh",
            }}
          >
            Built for You
          </Typography>
          <ScrollTab />
          <Card
            sx={{
              width: "100%",
              borderRadius: "20px",
              position: "relative",
              backgroundColor: "transparent",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              mt: "2vh",
            }}
          >
            <CardActionArea sx={{ height: "100%" }}>
              <Box sx={{ position: "relative", height: "100%" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    bgcolor: "var(--mui-palette-neutral-800)",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    textAlign: "center",
                    py: "3px",
                    borderTopLeftRadius: "20px",
                    borderTopRighttRadius: "20px",
                    position: "absolute",
                    top: "0",
                    width: "100%",
                  }}
                >
                  Built for You
                </Typography>
                <CardMedia
                  component="img"
                  height="100%"
                  image={built.image}
                  alt={built.title}
                  sx={{ objectFit: "cover", height: "100%" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    maxHeight: "100%",
                    color: "white",
                    padding: "16px",
                    py: "10px",
                    boxSizing: "border-box",
                    background:
                      "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) , rgba(0, 0, 0, 0.7))",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {built.title}
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Selection;
