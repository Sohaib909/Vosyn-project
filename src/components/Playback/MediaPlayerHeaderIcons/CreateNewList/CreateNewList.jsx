import React, { useState } from "react";

import { AddBoxRounded, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import styles from "./CreateNewModal.module.css";

const CreateNewList = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState("Public");

  /**
   * A method called when user clicks the create button. It calls the parent onCreate() method and resets the input fields and closes the modal.
   */
  const handleCreate = () => {
    onCreate({
      name: value,
      is_public: selectValue === "Public" ? true : false,
    });
    handleClose();
  };

  const handleClose = () => {
    setValue("");
    setOpen(false);
  };

  return (
    <>
      {/** Open modal button */}
      <Button
        variant="text"
        className={styles.openModalBtn}
        onClick={() => setOpen(true)}
      >
        <AddBoxRounded />
        Create New Playlist
      </Button>

      {/** Create folder modal */}
      <Modal open={open} onClose={handleClose} className={styles.modal}>
        <Box className={styles.container}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Create new folder
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            placeholder="Playlist name.."
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <FormControl size="small">
            <Select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreate}
            sx={{ textTransform: "none" }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewList;
