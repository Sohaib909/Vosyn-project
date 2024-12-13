import ReplyIcon from "@mui/icons-material/Reply";
import { Box, Icon, Typography } from "@mui/material";

const UserMessage = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "15px",
        backgroundColor: "var(--mui-palette-neutral-600)",
        mb: 3,
        py: "6px",
        pl: "15px",
        pr: "10px",
        borderRadius: 4,
      }}
    >
      <Typography>{user.message}</Typography>
      <Icon component={ReplyIcon}></Icon>
    </Box>
  );
};

export default UserMessage;
