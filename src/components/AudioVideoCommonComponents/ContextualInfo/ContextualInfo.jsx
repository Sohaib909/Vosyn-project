"use client";

import { ArrowsInSimple } from "phosphor-react";
import React, { useState } from "react";

import MicNone from "@mui/icons-material/MicNone";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import styled from "styled-components";

import "./ContextualInfo.module.css";

const sampleData = {
  recap:
    "Quick Recap: One of the key patient cases involves a kidney transplant between two patients. A man is supposed to donate his kidney to his friend, but it turns out that he didn’t quit smoking as he claimed, which complicates the surgery. This causes tension as the doctors work to figure out a solution, while also dealing with the ethical dilemma surrounding his dishonesty.",
  ethicalDilemma:
    "Ethical Dilemma: The ethical issue involves organ donation from a patient who is not fully honest...",
  medicalTerm:
    "Medical Term (Aneurysm): An aneurysm is an abnormal bulge in the wall of a blood vessel...",
};

const MyButton = styled(Button)({
  width: "185px",
  margin: "4px",
  padding: "4px 8px",
  fontSize: "0.675rem",
  fontFamily: "Inter, sans-serif",
  color: "white",
  borderRadius: 28,
  textTransform: "none",
  boxShadow: "none",
  border: "1px solid #A3A3A8",
  whiteSpace: "nowrap",
  backgroundColor: "#1F1E1E",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: "none",
  },
});

const ContextualInfo = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [displayContent, setDisplayContent] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleButtonClick = (contentKey) => {
    setDisplayContent(sampleData[contentKey]);
    setTimeout(() => {
      setDisplayContent("");
    }, 5000);
  };

  const handleAssistQuery = async () => {
    if (question.trim()) {
      setIsLoading(true);
      try {
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve(
                "AI Assist: Here is some information related to your query...",
              ),
            1000,
          ),
        );
        setResponse(response);
      } catch (error) {
        setResponse("Error fetching response. Please try again later.");
      } finally {
        setIsLoading(false);
        setQuestion("");
      }
    }
  };

  return (
    <Box className="contextual-info-section">
      <Accordion
        expanded={isAccordionOpen}
        onChange={handleAccordionToggle}
        className="contextual-info-accordion"
        sx={{
          boxShadow: "none",
          bgcolor: "background.paper",
          "& .MuiAccordionSummary-content": {
            margin: 0,
            display: "flex",
            flexDirection: "column",
          },
          "& .MuiAccordionDetails-root": {
            padding: "8px 16px",
            "& > :not(style)": {
              marginTop: 0,
              marginBottom: "8px",
            },
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowsInSimple
              size={35}
              style={{
                width: "24px",
                height: "24px",
                top: "18.97px",
                left: "282.74px",
                transform: "rotate(135deg)",
              }}
            />
          }
          aria-controls="panel1-content"
          id="panel1-header"
          aria-expanded={isAccordionOpen}
          sx={{
            padding: "0 1.5rem",
            textAlign: isAccordionOpen ? "left" : "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            "& .MuiAccordionSummary-expandIconWrapper": {
              marginLeft: "auto",
            },
          }}
        >
          <Typography
            className="accordion-summary-text"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              marginRight: "8px",
            }}
          >
            Contextual Info
          </Typography>
          {isAccordionOpen && (
            <Typography
              variant="body2"
              sx={{ color: "white", fontSize: "0.75rem", textAlign: "left" }}
            >
              Powered by VosynAssist
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            sx={{ color: "white", marginBottom: "3px", fontSize: "0.75rem" }}
          >
            {`Watching Video "Grey's Anatomy S5 E7 at 25:11"`}
          </Typography>

          <Box
            className="buttonContainer"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.12px",
            }}
          >
            {Object.keys(sampleData).map((key) => (
              <MyButton
                sx={{ color: "primary" }}
                key={key}
                variant="contained"
                onClick={() => handleButtonClick(key)}
              >
                {key === "recap"
                  ? "A quick recap of this case"
                  : key === "ethicalDilemma"
                    ? "What is Ethical Dilemma?"
                    : "Explain Medical term “aneurysm”."}
              </MyButton>
            ))}

            <Box
              className="displayArea"
              sx={{ mt: "15px", color: "#F7F9FF", fontSize: "0.675rem" }}
            >
              <Typography variant="body2" className="displayText">
                {displayContent}
              </Typography>
            </Box>
          </Box>

          <Box className="inputContainer" sx={{ mt: "8px" }}>
            <TextField
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "gray",
                  fontFamily: "Inter, sans-serif",
                },
              }}
              fullWidth
              variant="outlined"
              placeholder="Ask me anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() => console.log("Microphone clicked")}
                      sx={{ color: "white" }}
                    >
                      <MicNone />
                    </IconButton>
                    <IconButton
                      onClick={handleAssistQuery}
                      sx={{ color: "white" }}
                    >
                      <SendOutlinedIcon />
                    </IconButton>
                  </Box>
                ),
                sx: { pr: 0 },
              }}
            />
          </Box>

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: "8px" }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {response && (
            <Typography
              variant="body2"
              className="response"
              sx={{ mt: "8px", color: "white" }}
            >
              {response}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ContextualInfo;
