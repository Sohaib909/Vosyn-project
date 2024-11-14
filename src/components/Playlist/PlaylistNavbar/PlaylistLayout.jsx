import React from "react";

import PlaylistNavbar from "./PlaylistNavbar";

const PlaylistLayout = ({ children }) => {
  return (
    <div>
      <PlaylistNavbar />
      <main>{children}</main>
    </div>
  );
};

export default PlaylistLayout;
