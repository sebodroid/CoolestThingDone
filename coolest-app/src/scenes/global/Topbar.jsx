import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Logo from "../../assets/kebo-nobackground.svg";
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const logoutUser = () => {
    localStorage.setItem("token", "");
    window.location.href = "/login"; // Redirect to login route
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        <Link to="/">
          <img style={{ height: "40px" }} src={Logo} alt="Kebo Logo" />
        </Link>
      </Box>

      <Box display="flex" alignItems="center" gap="10px">
        {!!localStorage.getItem("token") && (
          <p style={{ cursor: "pointer" }} onClick={logoutUser}>
            Logout
          </p>
        )}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
