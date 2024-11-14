import React from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Typography } from "@mui/material";

import ListenCard from "@/components/MediaDisplay/ListenTab/ListenCard/ListenCard";

import CreatorCard from "./CreatorCard/CreatorCard";
import ScrollTab from "./ScrollTab/ScrollTab";
import TrendingCard from "./TrendingCard/TrendingCard";
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
  heading: "Trending",
};

const built = {
  id: 1,
  image:
    "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  title: "No Stupid Question",
  heading: "Built for you",
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
        <Box>
          <Box
            sx={{
              width: "90%",
              overflow: "hidden",
            }}
          >
            <TrendingCard data={trending} />
          </Box>

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              pt: "5vh",
            }}
          >
            About this episode
          </Typography>
          <Typography component="p">{trending.subtitle}</Typography>
          <Typography
            component="p"
            sx={{
              mt: "5px",
              opacity: "0.8",
            }}
          >
            {trending.title}
          </Typography>
          <Typography
            component="p"
            sx={{
              mt: "2vh",
              maxWidth: "60%",
            }}
          >
            {trending.description}
          </Typography>
          <Typography
            component="p"
            sx={{
              mt: "2vh",
              opacity: "0.8",
            }}
          >
            {trending.date}
          </Typography>
        </Box>
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
        </Box>
        <TrendingCard data={built} />
      </Box>
    </Box>
  );
};

export default Selection;
