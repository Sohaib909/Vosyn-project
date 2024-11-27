import { Box, Typography } from "@mui/material";

const UserMessage = ({ user }) => {
  return (
    <Box
      sx={{
        display: "inline",
        backgroundColor: "var(--mui-palette-neutral-600)",
        mb: 3,
        padding: "4px 24px",
        borderRadius: 4,
      }}
    >
      <Typography>{user.message}</Typography>
    </Box>
  );
};

export default UserMessage;
