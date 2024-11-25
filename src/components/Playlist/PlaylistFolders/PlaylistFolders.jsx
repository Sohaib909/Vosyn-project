"use client";

import React, { useState } from "react";

import useQueryParam from "@/hooks/useQueryParam";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Box, Typography } from "@mui/material";

import AddFromSavedModal from "../AddFromSvedModal/AddFromSavedModal";
import SinglePlaylist from "../SinglePlaylist/SinglePlaylist";
import Folder from "./Folder/Folder";
import NewFolderModal from "./NewFolderModal/NewFolderModal";

const playlistFolders = [
  { id: 1, name: "Folder 1" },
  { id: 2, name: "Folder 2" },
  { id: 3, name: "Folder 3" },
  { id: 4, name: "Folder 4" },
  { id: 5, name: "Folder 5" },
  { id: 6, name: "Folder 6" },
];

const videos = [
  {
    id: 1,
    title: "Money heist",
    type: "Article",
    description: "Netflix | Spanish",
    date: "Saved in July 1, 2018",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
  {
    id: 2,
    title: "Money heist",
    type: "MP4 Video",
    description: "Netflix | Spanish",
    date: "Saved in December 1, 2019",
    image:
      "https://i.pinimg.com/originals/89/3e/5b/893e5bdf0499d714ddf77def68510bf2.jpg",
  },
];

const PlaylistFolders = () => {
  const [currentFolder, setCurrentFolder] = useState("Folder 1");
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [isAddFromSavedOpen, setIsAddFromSavedOpen] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const { getAllParams } = useQueryParam();
  const filters = getAllParams();

  const handleOpenNewFolder = () => setIsNewFolderOpen(true);
  const handleCloseNewFolder = () => setIsNewFolderOpen(false);

  const handleNext = () => {
    setIsNewFolderOpen(false);
    setIsAddFromSavedOpen(true);
  };
  const handleCloseAddFromSaved = () => setIsAddFromSavedOpen(false);
  const handleDone = () => {
    setIsAddFromSavedOpen(false);
    setOpenFolder(true);
  };

  return (
    <Box>
      {openFolder ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mb: "4vh",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              sx={{ cursor: "pointer", pr: "0.5vw" }}
              onClick={() => {
                setOpenFolder(false);
              }}
            >
              All
            </Typography>
            ›
            <Typography variant="h5" sx={{ pl: "0.5vw" }}>
              {" "}
              {currentFolder}
            </Typography>
          </Box>
          <SinglePlaylist data={videos} />
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "2vw",
              mb: "4vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{}}>
              All folders
            </Typography>
            <Typography variant="h6" color="primary" sx={{ cursor: "pointer" }}>
              See More
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1vw",
              mb: "3vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                bgcolor: "var(--mui-palette-neutral-800)",
                py: "2vh",
                px: "0.5vw",
                borderRadius: "15px",
                cursor: "pointer",
              }}
              onClick={handleOpenNewFolder}
            >
              <ControlPointIcon />
              <Typography sx={{ px: "0.5vw" }}>Create new folder</Typography>
            </Box>
            {playlistFolders.map((item, i) => {
              return (
                <Folder
                  key={i}
                  data={item}
                  open={() => {
                    setCurrentFolder(item.name);
                    setOpenFolder(true);
                  }}
                />
              );
            })}
          </Box>
          <SinglePlaylist filters={filters} />
          <NewFolderModal
            open={isNewFolderOpen}
            onClose={handleCloseNewFolder}
            onNext={handleNext}
          />
          <AddFromSavedModal
            open={isAddFromSavedOpen}
            onClose={handleCloseAddFromSaved}
            onDone={handleDone}
          />
        </Box>
      )}
    </Box>
  );
};

export default PlaylistFolders;
