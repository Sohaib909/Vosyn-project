import React from "react";

import Playback from "@/components/Playback/Playback";

const VideoPage = ({ params }) => {
  const { audioId } = params;

  return <Playback id={audioId} type="audio" />;
};

export default VideoPage;
