import { Grid2, Skeleton } from "@mui/material";

const SkeletonLoader = () => (
  <Grid2 container spacing={2} size={12}>
    <Skeleton variant="text" width="100%" height={40} />
    <Skeleton variant="rectangular" width="100%" height={100} />
    <Skeleton variant="text" width="100%" height={40} />
  </Grid2>
);

export default SkeletonLoader;
