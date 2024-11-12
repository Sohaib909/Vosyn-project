import { Box, Card, CardContent, Grid2 } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

// Skeleton card to mimic the VideoCard layout
const SkeletonCard = () => (
  <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ minHeight: "20rem" }}>
    <Card
      sx={{
        borderRadius: "12px",
        position: "relative",
        height: "100%",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: "12px", width: "100%", height: "100%" }}
      />
      <CardContent
        sx={{
          width: "100%",
          height: "4rem",
          position: "absolute",
          bottom: "0",
          padding: "0.5rem",
          borderRadius: "0 0px 12px 12px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Skeleton variant="text" width="80%" />
        <Box sx={{ display: "flex", columnGap: "1rem" }}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </CardContent>
    </Card>
  </Grid2>
);

export default SkeletonCard;
