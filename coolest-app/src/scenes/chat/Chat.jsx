import React from "react";
import { Box, useTheme } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import MessageBoard from "../../components/MessageBoard";
import { tokens } from "../../theme";
const Chat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [messages, setMessages] = useState({});

  // const [userMessages] = useLazyQuery(GET_MESSAGES, {
  //   onCompleted: (data) => {
  //     // handle the successful response here
  //     return data.msgBoard
  //   },
  //   onError: (err) => {
  //     // handle the error here
  //     console.log("ERROR: ", err);
  //   },
  // });

  // const getMessages = async () => {
  //   let msg = {}
  //   try {
  //     await userMessages({
  //       variables: {
  //         input: {
  //           userName: decodedToken.userName,
  //         },
  //       },
  //     }).then((e) => {
  //       msg = e.data.msgBoard
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return msg
  // };

  // useEffect(() => {
  //   getMessages().then((e) => setMessages(e))

  // }, [messages]);

  // if (Object.keys(messages).length === 0) return <div>Loading...</div>;

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
        <Sidebar />
        <MessageBoard />
      </Box>
    </Box>
  );
};

export default Chat;
