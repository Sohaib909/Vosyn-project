"use client";

import React, { useEffect, useState } from "react";

import useQueryParam from "@/hooks/useQueryParam";
import useStatusNotification from "@/hooks/useStatusNotification";
import axios from "axios";
import useSWR from "swr";

import FeaturedTab from "./Featured/Featured";
import GeneralTab from "./GeneralTab/GeneralTab";
import ListenCard from "./GeneralTab/ListenCard/ListenCard";
import TextCard from "./GeneralTab/TextCard/TextCard";
import ShortSection from "./GeneralTab/Watch/Shorts/Shorts";
import WatchCard from "./GeneralTab/Watch/WatchCard/WatchCard";
import TabNavbar from "./TabNavbar/TabNavbar";

const MediaDisplay = () => {
  const fetcher = (url) => axios.get(url).then((res) => res?.data);
  const [videoListData, setVideoListData] = useState([]);
  const { setStatus } = useStatusNotification();

  // Using SWR to fetch videos
  const { error: videoListsError } = useSWR(
    `/api/video?sort_by=view_count&limit=15&page=1`,
    fetcher,
    {
      onSuccess: (newData) => {
        setVideoListData((prevData) => [...prevData, ...newData]);
        console.log(videoListData);
      },
    },
  );

  if (videoListsError) {
    setStatus(`${videoListsError?.message}. Please try again later.`, "error");
  }

  const { updateQueryParam, getAllParams } = useQueryParam();
  const params = getAllParams();

  const getMediaDisplay = () => {
    if (params.tab === "featured") {
      return <FeaturedTab />;
    } else if (params.tab === "video") {
      return (
        <GeneralTab
          data={videoListData}
          Component={WatchCard}
          OptionalComponent={ShortSection}
        />
      );
    } else if (params.tab === "audio") {
      return <GeneralTab data={videoListData} Component={ListenCard} />; // Replace with audio data when we have the end point
    } else if (params.tab === "text") {
      return <GeneralTab data={videoListData} Component={TextCard} />; // Replace with text data when we have the end point
    }
  };

  useEffect(() => {
    updateQueryParam("tab", params.tab);
  }, [updateQueryParam, params]);

  return (
    <>
      <TabNavbar />
      {getMediaDisplay()}
    </>
  );
};

export default MediaDisplay;
