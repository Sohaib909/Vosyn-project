import { Box, Typography } from "@mui/material";

import styles from "./page.module.css";

export default function Page() {
  return (
    <Box className={styles.pageContainer}>
      <Typography variant="p">Landing page</Typography>
    </Box>
  );
}
