import { Box } from "@mui/material";

import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Box component="main">{children}</Box>
    </>
  );
}
