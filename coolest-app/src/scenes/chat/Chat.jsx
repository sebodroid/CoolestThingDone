import { React, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import MobileSidebar from "../../components/MobileSidebar";
import MessageBoard from "../../components/MessageBoard";
import { tokens } from "../../theme";
const Chat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showMessageBoard, setShowMessageBoard] = useState(false);
  const [messages, setMessages] = useState({});
  const [friendUname, setFriendUname] = useState();
  const [profileSearch, setProfileSearch] = useState(false);


  const updateSearchState = () => {
    setProfileSearch(!profileSearch);
  }

  const getMsgBoardData = (data) => {
    setShowMessageBoard(data.TrueFalse);
    setMessages(data.chats);
    setFriendUname(data.friendUname);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      height={`calc(100vh - 78px)`}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        height="87vh"
        width="min(95%, 80rem)"
        backgroundColor={colors.grey[900]}
        borderRadius="10px"
        pt="20px"
      >
        {!isSmallScreen ? (
          <Sidebar func={getMsgBoardData} profileSearch={profileSearch} updateSearchState={updateSearchState} />
        ) : (
          <MobileSidebar profileSearch={profileSearch} updateSearchState={updateSearchState} func={getMsgBoardData} />
        )}
        {showMessageBoard && (
          <MessageBoard
            messages={messages}
            friendUname={friendUname}
            smallScreen={isSmallScreen}
            profileSearch={profileSearch}
          />
        )}
      </Box>
    </Box>
  );
};

export default Chat;
