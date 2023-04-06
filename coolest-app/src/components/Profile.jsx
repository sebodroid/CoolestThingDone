import React from "react";
import { Box, Typography } from "@mui/material";

const Profile = (props) => {
  return (
    <Box display="flex" flexDirection="column" gap="10px">
      <img
        src={props.img}
        alt={`${props.username} PFP`}
        style={{
          height: "80px",
          width: "80px",
          borderRadius: "50%",
          marginInline: "auto",
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
