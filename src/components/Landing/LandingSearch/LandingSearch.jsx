"use client";

import { useState } from "react";

import { Divider, Grid2 } from "@mui/material";

import SearchBar from "@/components/Landing/LandingSearch/SearchBar/SearchBar";
import VosynAssistChatContainer from "@/components/Landing/LandingSearch/VosynAssist/VosynAssistChatContainer";

import DragAndDrap from "../DragAndDrop/DragAndDrap";
import UploadInteractions from "../UploadInteractions/UploadInteractions";

const dummyResponse = {
  summary: "User wants to find TED Talk videos with less than 5 million views.",
  text_response:
    "Here are some TED Talk videos with less than 5 million views.Here are some TED Talk videos with less than 5 million views.Here are some TED Talk videos with less than 5 million views.Here are some TED Talk videos with less than 5 million views.Here are some TED Talk videos with less than 5 million views.Here are some TED Talk videos with less than 5 million views.",
  video_results: [
    {
      description:
        "Communication is the most important skill for personal and professional success. In this talk, Danish Dhamani discusses how overcoming your fear of public speaking is key to leading a fulfilling life and unlocking your true potential.  Danish’s vision is to empower everyone around the world to overcome their fear of public speaking and to become a better communicator. As a first generation immigrant, for whom English is a second language, the fear of public speaking haunted Danish throughout his early life. By constant practicing and coaching, he soon realized that people are not born public speakers; instead public speaking is a learn-able skill. This is what inspired Danish to create Orai, a mobile app that uses artificial intelligence to improve your speaking ability. This talk was given at a TEDx event using the TED conference format but independently organized by a local community. Learn more at https://www.ted.com/tedx",
      id: "b98f6344-0466-4958-b328-c20591a24fba",
      released_date: 1712192012,
      thumbnail_height: 360,
      thumbnail_url: "https://i.ytimg.com/vi/80UVjkcxGmA/hqdefault.jpg",
      thumbnail_width: 480,
      titles: [
        "How I Overcame My Fear of Public Speaking | Danish Dhamani | TEDxKids@SMU",
      ],
      view_count: 4761397,
    },
    {
      description:
        "NOTE FROM TED: Please do not look to this talk for medical advice. While some viewers might find advice provided in this talk to be helpful as a complementary approach, several claims around brain size and lifestyle are not corroborated by sufficient scientific evidence. TEDx events are independently organized by volunteers. The guidelines we give organizers are described in more detail here: http://storage.ted.com/tedx/manuals/tedx_content_guidelines.pdf\n\n\nChronic stress is devastating for your brain. It ruins your memory, your attention and concentration and your emotional resilience. The brain areas that help execute these functions literally deteriorate. \n\nLuckily, brain science has revealed many ways to prevent or counteract this. In her talk Niki Korteweg shares the four most important things you can do to keep your brain healthy and working at its very best.\n\nNiki Korteweg is a Dutch science journalist with a PhD in neurobiology, and she has been writing about health and brain science for almost 20 years. Ironically, after experiencing a burnout about 10 years ago, her own brain started to let her down. It was the start of a quest in the scientific literature to discover what actually helps to guard our brain against stress and make it work better than ever.  As a science journalist at NRC Handelsblad with a PhD in neurobiology, Niki is very knowledgeable about brain research, medical science, and psychology. She is a versatile journalist: she writes features, interviews, news articles, and books, gives lectures and teaches about science writing. After experiencing burnout in 2010, Niki published the book ‘Een beter brein’ (A better brain) in 2017. In this book, she discusses the fast-moving developments in neuroscience and all the ways in which we can use those insights to take good care of our brains. This talk was given at a TEDx event using the TED conference format but independently organized by a local community. Learn more at https://www.ted.com/tedx",
      id: "bd90f0cb-57ae-4da1-aa61-3c785180d5dc",
      released_date: 1712193511,
      thumbnail_height: 360,
      thumbnail_url: "https://i.ytimg.com/vi/Nz9eAaXRzGg/hqdefault.jpg",
      thumbnail_width: 480,
      titles: [
        "How to protect your brain from stress | Niki Korteweg | TEDxAmsterdamWomen",
      ],
      view_count: 2340668,
    },
    {
      description:
        "A quantum computer isn't just a more powerful version of the computers we use today; it's something else entirely, based on emerging scientific understanding -- and more than a bit of uncertainty. Enter the quantum wonderland with TED Fellow Shohini Ghose and learn how this technology holds the potential to transform medicine, create unbreakable encryption and even teleport information.\n\nCheck out more TED Talks: http://www.ted.com\n\nThe TED Talks channel features the best talks and performances from the TED Conference, where the world's leading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and more.\n\nFollow TED on Twitter: http://www.twitter.com/TEDTalks\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: https://www.youtube.com/TED",
      id: "0b682269-9ef2-4313-a9d1-373705ff6f94",
      released_date: 1712193951,
      thumbnail_height: 360,
      thumbnail_url: "https://i.ytimg.com/vi/QuR969uMICM/hqdefault.jpg",
      thumbnail_width: 480,
      titles: ["A beginner's guide to quantum computing | Shohini Ghose"],
      view_count: 2259107,
    },
  ],
};

const LandingSearch = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);
  const [chatMessageIDToScroll, setChatMessageIDToScroll] = useState(undefined);

  const sendMessageToGemini = () => {
    setIsProcessingMessage(true);
    const placeholderId = Date.now();
    addUserMessageToChatHistory(searchInput);
    createResponseObject(placeholderId);
    setSearchInput("");

    // call Chat API to get response from Gemini
    setTimeout(() => {
      // id of the message set to function so that if user scrolls up, it
      setChatMessageIDToScroll(placeholderId);
      addGeminiResponseToChatHistory(dummyResponse, placeholderId);
    }, 2000);
  };

  const addUserMessageToChatHistory = (searchInput) => {
    setChatHistory((prev) => [
      ...prev,
      {
        isUser: true,
        message: searchInput,
      },
    ]);
  };

  const createResponseObject = (placeholderId) => {
    setChatHistory((prev) => [
      ...prev,
      {
        isUser: false,
        summary: "",
        text_response: "",
        video_results: [],
        isLoading: true,
        id: placeholderId,
      },
    ]);
  };

  const addGeminiResponseToChatHistory = (response, placeholderId) => {
    setChatHistory((prev) =>
      prev.map((msg) => {
        if (msg.id === placeholderId) {
          return {
            ...msg,
            isLoading: false,
            summary: response.summary,
            text_response: response.text_response,
            video_results: response.video_results,
          };
        }
        return msg;
      }),
    );
  };

  return (
    <Grid2
      container
      item
      size={12}
      spacing={2}
      sx={{
        backgroundColor: "var(--mui-palette-neutral-800)",
        padding: 4,
        borderRadius: 3,
        marginBottom: chatHistory.length ? 2 : 0,
      }}
    >
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isProcessingMessage={isProcessingMessage}
        sendMessageToGemini={sendMessageToGemini}
      />

      <Divider sx={{ width: "100%" }} />

      {chatHistory.length != 0 ? (
        <VosynAssistChatContainer
          chatHistory={chatHistory}
          setIsProcessingMessage={setIsProcessingMessage}
          chatMessageIDToScroll={chatMessageIDToScroll}
          setChatMessageIDToScroll={setChatMessageIDToScroll}
        />
      ) : (
        <Grid2
          container
          item
          size={12}
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid2 item size={{ xs: 12, sm: 8, md: 8, lg: 9, xl: 9 }}>
            <DragAndDrap />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 4, md: 4, lg: 3, xl: 3 }}>
            <UploadInteractions />
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};

export default LandingSearch;
