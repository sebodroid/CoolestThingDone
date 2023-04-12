import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const SentMessage = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      backgroundColor={colors.blueAccent[500]}
      height="fit-content"
      width="fit-content"
      p="10px"
      borderRadius="10px 10px 0 10px"
      color="#fff"
      m="10px"
    >
      {props.message}
    </Box>
  );
};

export default SentMessage;
