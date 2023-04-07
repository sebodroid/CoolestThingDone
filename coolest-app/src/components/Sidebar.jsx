import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
import { tokens } from "../theme";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import SearchIcon from "@mui/icons-material/Search";
import Profile from "./Profile";
import robot from "../assets/robot.jpg";
import pfp from "../assets/pfp-placeholder.jpg";
import kebo from "../assets/logo-color.png";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //   For Testing Purposes
  const profileData = [
    {
      img: robot,
      username: "Billy Bob Joe",
      message: "Hey there bro",
    },
    {
      img: pfp,
      username: "Mr. Savage",
      message: "You're such a Savage",
    },
    {
      img: kebo,
      username: "Lil Peep",
      message: "I'm not dead mother fucker",
    },
  ];

  const filteredProfileData = profileData.filter(
    (item) =>
      item.username.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  );

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      height={`calc(100vh - 78px)`}
      borderRight={`1px solid ${colors.greenAccent[800]}`}
      marginRight="20px"
      position="relative"
    >
      {!collapsed && (
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          m="0 20px 20px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}
      {/* Example of how we could utilize props for sidebar */}

      {filteredProfileData.length === 0 ? (
        <Typography variant="h5" textAlign="center">
          User Not Found
        </Typography>
      ) : (
        filteredProfileData.map((item) => {
          return (
            <Profile
              key={item.username}
              img={item.img}
              username={item.username}
              message={item.message}
              collapsed={collapsed}
            />
          );
        })
      )}

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
