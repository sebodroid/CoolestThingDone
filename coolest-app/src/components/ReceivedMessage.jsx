import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ReceivedMessage = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      backgroundColor={colors.grey[400]}
      height="fit-content"
      width="fit-content"
      p="10px"
      borderRadius="0 10px 10px 10px"
      color="#fff"
      m="10px"
    >
      {props.message}
    </Box>
  );
};

export default ReceivedMessage;
