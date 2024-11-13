"use client";

import React, { useEffect, useState } from "react";

import useQueryParam from "@/hooks/useQueryParam";
import { Box } from "@mui/material";

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
    if (params.tab === "video") {
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
    } else if (params.tab === "audio") {
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
          />
        );
      }
    } else if (params.tab === "text") {
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
          />
        );
      }
    }
  };

  return <Box>{getTab()}</Box>;
};

export default GeneralTab;
