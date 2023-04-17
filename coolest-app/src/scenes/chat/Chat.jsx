import {React, useState} from "react";
import { Box, useTheme } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import MessageBoard from "../../components/MessageBoard";
import { tokens } from "../../theme";
const Chat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showMessageBoard, setShowMessageBoard] = useState(false);
  const [messages, setMessages] = useState({});
  const [friendUname, setFriendUname] = useState();

  const getMsgBoardData = (data) => {
    setShowMessageBoard(data.TrueFalse)
    setMessages(data.chats);
    setFriendUname(data.friendUname);
  }



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
        height="80vh"
        width="min(90%, 80rem)"
        backgroundColor={colors.grey[900]}
        borderRadius="10px"
        pt="20px"
      >
        <Sidebar func={getMsgBoardData}/>
        {showMessageBoard && <MessageBoard messages={messages} friendUname={friendUname}/> }
      </Box>
    </Box>
  );
};

export default Chat;
