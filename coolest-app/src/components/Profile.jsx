import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Profile = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const hover = {
    "&:hover": {
      backgroundColor: `${colors.primary[900]}`,
      cursor: "pointer",
    },
  };

  return (
    <Box
      display="flex"
      gap="10px"
      alignItems="center"
      padding="20px"
      sx={hover}
    >
      <img
        src={props.img}
        alt={`${props.username} PFP`}
        style={{
          height: !props.collapsed ? "70px" : "60px",
          width: !props.collapsed ? "70px" : "60px",
          borderRadius: "50%",
          textAlign: "center",
        }}
      />
      {!props.collapsed && (
        <Box lineHeight="1.6">
          <Typography
            variant="h6"
            maxWidth="100px"
            color={colors.blueAccent[500]}
          >
            {props.username}
          </Typography>
          <p style={{ fontSize: "12px" }}>{props.message}</p>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
