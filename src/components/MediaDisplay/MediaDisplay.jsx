"use client";

import React, { useEffect, useState } from "react";

import useQueryParam from "@/hooks/useQueryParam";
import useStatusNotification from "@/hooks/useStatusNotification";
import axios from "axios";
import useSWR from "swr";

import ListenCard from "@/components/MediaDisplay/ListenTab/ListenCard/ListenCard";
import Spinner from "@/components/Spinner/Spinner.jsx";

import FeaturedTab from "./Featured/Featured";
import GeneralTab from "./GeneralTab/GeneralTab";
import TextCard from "./GeneralTab/TextCard/TextCard";
import ShortSection from "./GeneralTab/Watch/Shorts/Shorts";
import WatchCard from "./GeneralTab/Watch/WatchCard/WatchCard";
import TabNavbar from "./TabNavbar/TabNavbar";

const MediaDisplay = () => {
  const { updateQueryParam, getAllParams } = useQueryParam();
  const params = getAllParams();
  const fetcher = (url) => axios.get(url).then((res) => res?.data);
  const [videoListData, setVideoListData] = useState([]);
  const { setStatus } = useStatusNotification();
  const [currentTab, setCurrentTab] = useState(params.tab || "");
  const [isSwitchingTabs, setIsSwitchingTabs] = useState(false);

  // Using SWR to fetch videos
  const { error: videoListsError, isLoading: isFetchingVideo } = useSWR(
    `/api/video?sort_by=view_count&limit=15&page=1`,
    fetcher,
    {
      onSuccess: (newData) => {
        setVideoListData((prevData) => [...prevData, ...newData]);
      },
    },
  );

  if (videoListsError) {
    setStatus(`${videoListsError?.message}. Please try again later.`, "error");
  }

  const getMediaDisplay = () => {
    if (params.tab === "featured") {
      return <FeaturedTab />;
    } else if (params.tab === "watch") {
      return (
        <GeneralTab
          data={videoListData}
          Component={WatchCard}
          OptionalComponent={ShortSection}
        />
      );
    } else if (params.tab === "listen") {
      return <GeneralTab data={videoListData} Component={ListenCard} />; // Replace with audio data when we have the end point
    } else if (params.tab === "read") {
      return <GeneralTab data={videoListData} Component={TextCard} />; // Replace with text data when we have the end point
    }
  };

  useEffect(() => {
    updateQueryParam("tab", params.tab);
  }, [updateQueryParam, params]);

  useEffect(() => {
    let timeoutId;

    if (currentTab !== params.tab) {
      setIsSwitchingTabs(true);
      timeoutId = setTimeout(() => {
        setCurrentTab(params.tab);
        setIsSwitchingTabs(false);
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [params.tab, currentTab]);

  return (
    <>
      <TabNavbar />
      {isSwitchingTabs || isFetchingVideo ? <Spinner /> : getMediaDisplay()}
    </>
  );
};

export default MediaDisplay;
