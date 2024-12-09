"use client";

import React, { useEffect, useState } from "react";

import useQueryParam from "@/hooks/useQueryParam";
import read from "@/Images/ReadPage.svg";
import { Box } from "@mui/material";
import Image from "next/image";

import ComingSoon from "@/components/ComingSoon/ComingSoon";

import GeneralLayout from "./GeneralLayout/GeneralLayout";
import Selection from "./Watch/Selection/Selection";

const GeneralTab = ({ data, Component, OptionalComponent }) => {
  const { getAllParams } = useQueryParam();
  const params = getAllParams();
  const [selection, setSelection] = useState(false);
  const [built, setBuilt] = useState(false);
  const [recomend, setRecomend] = useState(false);

  const handleSelection = () => {
    setSelection(!selection);
  };
  const handleBuilt = () => {
    setBuilt(!built);
  };
  const handleRecomend = () => {
    setRecomend(!recomend);
  };

  // switch back to main tab if user switches tabs from inside a nested tab
  useEffect(() => {
    setSelection(false);
    setBuilt(false);
    setRecomend(false);
  }, [params.tab]);

  const getTab = () => {
    if (params.tab === "watch") {
      if (selection) {
        return <Selection data={data} handleCloseMore={handleSelection} />;
      } else if (built) {
        return <></>;
      } else if (recomend) {
        return <></>;
      } else {
        return (
          <GeneralLayout
            data={data}
            Component={Component}
            OptionalComponent={OptionalComponent}
            handleSelection={handleSelection}
            handleBuilt={handleBuilt}
            handleRecomend={handleRecomend}
          />
        );
      }
    } else if (params.tab === "listen") {
      if (selection) {
        return <></>;
      } else if (built) {
        return <></>;
      } else if (recomend) {
        return <></>;
      } else {
        return (
          <GeneralLayout
            data={data}
            Component={Component}
            OptionalComponent={OptionalComponent}
            handleSelection={handleSelection}
            handleBuilt={handleBuilt}
            handleRecomend={handleRecomend}
            tab="listen"
          />
        );
      }
    } else if (params.tab === "read") {
      if (selection) {
        return <></>;
      } else if (built) {
        return <></>;
      } else if (recomend) {
        return <></>;
      } else {
        return (
          <div
            style={{
              maxWidth: "100vw",
              height: "1200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              maxHeight: "1000px",
              overflow: "hidden",
            }}
          >
            <Image
              style={{
                marginTop: "400px",
                maxWidth: "100vw",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                maxHeight: "1330px",
                scale: "1.3",
              }}
              src={read}
              alt="figma read image"
            />
          </div>
        );
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        textAlign: "center",
      }}
    >
      {params.tab !== "watch" && <ComingSoon />}
      {getTab()}
    </Box>
  );
};

export default GeneralTab;
