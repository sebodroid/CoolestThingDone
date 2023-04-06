import React from "react";
import { Box, Typography } from "@mui/material";

const Profile = (props) => {
  return (
    <Box display="flex" flexDirection="column" gap="10px" marginBottom="20px">
      <img
        src={props.img}
        alt={`${props.username} PFP`}
        style={{
          height: !props.collapsed ? "80px" : "60px",
          width: !props.collapsed ? "80px" : "60px",
          borderRadius: "50%",
          marginInline: "auto",
          cursor: "pointer",
        }}
      />
      {!props.collapsed && (
        <Typography variant="h6" textAlign="center" maxWidth="100px">
          {props.username}
        </Typography>
      )}
    </Box>
  );
};

export default Profile;
