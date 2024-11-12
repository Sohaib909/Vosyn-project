import React from "react";

import Playback from "@/components/Playback/Playback";

const VideoPage = ({ params }) => {
  const { videoId } = params;

  return <Playback id={videoId} type="video" />;
};

export default VideoPage;
