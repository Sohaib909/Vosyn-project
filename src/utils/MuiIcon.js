import * as Icons from "@mui/icons-material";

const MuiIcon = ({ name, ...props }) => {
  const Component = Icons[name];
  if (!Component) return null;
  return <Component {...props} />;
};

export default MuiIcon;
