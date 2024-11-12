import CallIcon from "@mui/icons-material/Call";
import ChatIcon from "@mui/icons-material/Chat";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box, Button, Tab, Tabs } from "@mui/material";

const ChatBoxNav = ({ chatNav, toggleChatNav, toggleWatchPartyModal }) => {
  const handleTab = (_, value) => {
    toggleChatNav(value);
  };

  const handleAddFriends = () => {
    toggleWatchPartyModal();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Tabs
        value={chatNav}
        onChange={handleTab}
        sx={{
          "& .Mui-selected": {
            color: "var(--mui-palette-neutral-100) !important",
            "& .Mui-focusVisible": {
              background: "var(--mui-palette-neutral-100) !important",
            },
          },
          "& .mui-f6507k-MuiTabs-indicator": {
            backgroundColor: "var(--mui-palette-neutral-100)",
          },
        }}
      >
        <Tab
          sx={{
            minWidth: "fit-content",
          }}
          icon={<ChatIcon />}
          aria-label="chat"
        />
        <Tab
          sx={{
            minWidth: "fit-content",
          }}
          icon={<CallIcon />}
          aria-label="call"
        />
      </Tabs>

      <Button
        variant="contained"
        className="watch-party-chat-add-friends-box"
        onClick={handleAddFriends}
        sx={{
          display: "flex",
          columnGap: "1rem",
          alignItems: "center",
          backgroundColor: "var(--mui-palette-neutral-700)",
        }}
      >
        Invite
        <GroupAddIcon sx={{ fontSize: "1.2rem" }} />
      </Button>
    </Box>
  );
};

export default ChatBoxNav;
