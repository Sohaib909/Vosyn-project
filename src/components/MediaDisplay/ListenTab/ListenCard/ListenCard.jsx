import React from "react";

import PodcastsIcon from "@mui/icons-material/Podcasts";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./ListenCard.module.css";

const ListenCard = ({ item, section }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/audio/${item.document.id}`);
  };

  return (
    <>
      {/*Jump In Section and Built For you Section*/}
      {(section === "jump-in" || section === "builtForYou") && (
        <Card
          sx={{
            borderRadius: "16px",
            maxWidth: "100%",
            cursor: "pointer",

            display: "flex",
            // minWidth: "15rem",
            width: "100%",
            alignItems: "center",
            height: "7.125rem",
            gap: "1rem",
          }}
          onClick={handleCardClick}
        >
          <CardMedia
            className={styles.cardPic}
            component="img"
            image={item.document.thumbnail_url}
            sx={{
              borderRadius: "4px",
              padding: "0",
              width: "7.125rem",
              minWidth: "7.125rem",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              rowGap: "1rem",
              width: "100%",
              height: "fit-content",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "content",
              }}
            >
              <Typography variant="p" sx={{ fontWeight: "bold" }}>
                {`${item.document.titles[0].slice(0, 20)}...`}
              </Typography>
              <PodcastsIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "content",
              }}
            >
              <Typography variant="caption" sx={{ opacity: "0.7" }}>
                Secondary Information
              </Typography>
              <Typography variant="caption" sx={{ opacity: "0.7" }}>
                Amount of time left
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {/*You Might Like Section */}
      {section === "youMightLike" && (
        <Card
          sx={{
            borderRadius: "10px",
            maxWidth: "12.5rem",
            width: "12.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: "12.5rem",
            position: "relative",
          }}
          onClick={handleCardClick}
        >
          <CardMedia
            component="img"
            image={item.document.thumbnail_url}
            sx={{
              padding: "0",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              height: "115%",
            }}
          />

          <CardContent
            sx={{
              display: "flex",
              width: "100%",
              height: "2.88rem",
              position: "absolute",
              bottom: "0",
              backgroundColor: "rgba(101, 101, 101, 1)",
              justifyContent: "space-between",
              gap: "0.5rem",
              paddingTop: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "3px",
              }}
            >
              <Typography
                variant="p"
                sx={{ fontWeight: "600", fontSize: "11px" }}
              >
                {`${item.document.titles[0].slice(0, 20)}...`}
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: "0.7", fontWeight: "400", fontSize: "10px" }}
              >
                Secondary Information
              </Typography>
            </Box>
            <PodcastsIcon />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ListenCard;
