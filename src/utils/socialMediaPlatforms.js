import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const socialMediaPlatforms = [
  {
    name: "WhatsApp",
    iconClass: <WhatsAppIcon />,
    testID: "WhatsAppTest",
    shareUrl: "https://wa.me/?text=",
  },
  {
    name: "Facebook", //NOTE: This will only work when trying to share a public link. Meaning that trying to share a localhost link will not work because it is a private link
    iconClass: <FacebookIcon />,
    testID: "FacebookTest",
    shareUrl: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "Twitter",
    iconClass: <TwitterIcon />,
    testID: "TwitterTest",
    shareUrl: "https://twitter.com/share?url=",
  },
  {
    name: "Telegram",
    iconClass: <TelegramIcon />,
    testID: "TelegramTest",
    shareUrl: "https://telegram.me/share/url?url=",
  },
  {
    name: "Email", //NOTE: For email to work you need default email set in Windows and if its still won't work you need to grant your email of choice handler permission in your browser setting
    iconClass: <EmailIcon />, //NOTE 2: When using this on a macOS product you might get a warning, nothing is wrong and the email will send propertly
    testID: "EmailTest",
    shareUrl: "mailto:? &subject=VosynVerse%20Video &body=",
  },
];
