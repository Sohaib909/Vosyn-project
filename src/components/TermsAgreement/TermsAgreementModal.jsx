import React from "react";

import { termsAndConditions } from "@/data/termsAgreement";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";

import styles from "./TermsAgreementModal.module.css";

/**
 *
 * @param {*} isModalVisible - A boolean determining whether or not the modal is currently visible
 * @param {*} hideModal - A function that when called, sets isModalVisible to false
 *
 * @returns - A modal component containing the VosynVerse Terms & Conditions and Privacy Policy
 */
const TermsAgreementModal = ({ isModalOpen, closeModal }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="terms-agreement-modal-title"
    >
      <Box className={styles.modalContainer}>
        <Box className={styles.modalHeader}>
          <Typography
            id="terms-agreement-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
            }}
          >
            Terms and Conditions
          </Typography>
          <IconButton
            aria-label="close terms and conditions modal"
            onClick={closeModal}
            size="large"
            color="inherit"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box className={styles.modalBody}>
          {termsAndConditions.split("\n\n").map((paragraphText, index) => (
            <Typography key={index} variant="p" component="p">
              {paragraphText.trim()}
            </Typography>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsAgreementModal;
