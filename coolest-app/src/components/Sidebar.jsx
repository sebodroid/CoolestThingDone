import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import Profile from "./Profile";

const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      paddingInline="20px"
      height={`calc(100vh - 78px)`}
      borderRight={`1px solid ${colors.greenAccent[800]}`}
      marginRight="20px"
      position="relative"
    >
      {/* Example of how we could utilize props for sidebar */}
      <Profile
        img={props.img}
        username={props.username}
        collapsed={collapsed}
      />

      {/* Collapse and uncollapse sidebar */}
      {/* On collapse, text should be hidden */}
      <IconButton
        onClick={handleCollapse}
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          textAlign: "center",
          padding: "10px",
          borderRadius: "0",
        }}
      >
        {collapsed ? (
          <KeyboardTabIcon sx={{ fontSize: "30px" }} />
        ) : (
          <KeyboardReturnIcon sx={{ fontSize: "30px" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default Sidebar;
