import React from "react";

import { Box } from "@mui/material";

const ComingSoon = ({ ht = true }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: ht ? "100%" : "83.5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle, rgba(37, 35, 49, 1) 0%, rgba(37, 35, 49, 0.7) 50%, rgba(37, 35, 49, 0.2) 100%)",
        fontFamily: "'Oswald', sans-serif",
        position: "absolute",
        zIndex: 5,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          display: "grid",
          fontSize: "100px",
          fontWeight: "bold",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: "1",
          position: "relative",
        }}
      >
        {/* Top Half */}
        <Box
          component="p"
          sx={{
            gridArea: "1/1/-1/-1",
            color: "white",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 48%, 0% 48%)",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Coming Soon
        </Box>

        {/* Bottom Half */}
        <Box
          component="p"
          sx={{
            gridArea: "1/1/-1/-1",
            margin: 0,
            color: "transparent",
            background: "linear-gradient(180deg, black 45%, white 60%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            clipPath: "polygon(0% 48%, 100% 48%, 100% 100%, 0% 100%)",
            transform: "translateX(-0.022em) translateY(0.018em) ",
          }}
        >
          Coming Soon
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;

// const ComingSoon = () => {
//   return (
// <Image
//   className={styles["background"]}
//   src="/mediaFiles/ComingSoon/Coming_soon_overlay.png"
//   width={1920}
//   height={1080}
// ></Image>
//     <Box
//       sx={{
//         background:
//           "linear-gradient(135deg, rgba(37, 35, 49, 0.8), rgba(63, 60, 85, 0.8), rgba(89, 85, 119, 0.8))",
//         height: "100%",
//         width: "100%",
//         textAlign: "center",
//         position: "absolute",
//         zIndex: "5",
//       }}
//     >
//       <Typography
//         sx={{
//           color: "white",
//           fontWeight: "bold",
//           fontSize: "75px",
//           paddingTop: "20%",
//           fontStyle: "italic",
//         }}
//       >
//         Coming Soon
//       </Typography>
//     </Box>
//   );
// };
//
// export default ComingSoon;
