import { Box, Typography } from "@mui/material";

const ComingSoon = () => {
  return (
    // <Image
    //   className={styles["background"]}
    //   src="/mediaFiles/ComingSoon/Coming_soon_overlay.png"
    //   width={1920}
    //   height={1080}
    // ></Image>
    <Box
      sx={{
        background:
          "linear-gradient(135deg, rgba(37, 35, 49, 0.8), rgba(63, 60, 85, 0.8), rgba(89, 85, 119, 0.8))",
        height: "100%",
        width: "100%",
        textAlign: "center",
        position: "absolute",
        zIndex: "5",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: "75px",
          paddingTop: "20%",
          fontStyle: "italic",
        }}
      >
        Coming Soon
      </Typography>
    </Box>
  );
};

export default ComingSoon;
