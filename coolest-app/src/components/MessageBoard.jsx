import React, { useState } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { Box, TextField, Button, useTheme } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { decodeToken } from "react-jwt";
import { tokens } from "../theme";

const MessageBoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit = async (values) => {
    try {
      await createMessage({
        variables: {
          input: {
            createdBy: decodedToken.userName,
            createdAt: createDateTime(),
            message: inputMessage !== "" && inputMessage,
          },
        },
      });
      console.log("Message created on handleSubmit");
      setInputMessage("");
    } catch (error) {
      //setError(error.graphQLErrors[0].message);
      console.log(
        "Error caught when sending message: Message cannot be empty."
      );
    }
  };

  const [inputMessage, setInputMessage] = useState("");

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  //Decode token and grabUsername
  const decodedToken = decodeToken(localStorage.getItem("token"));

  // const GET_MESSAGES = gql`
  //   query MsgBoardd($input: userName!) {
  //     msgBoard(input: $input) {
  //       userName
  //       chats {
  //         withWho {
  //           friendUname
  //           messages {
  //             createdBy
  //             createdAt
  //             message
  //             messageId
  //           }
  //         }
  //       }
  //     }
  //   }
  // `;

  const SEND_MESSAGE = gql`
    mutation CreateMessage($input: MessageInput!) {
      createMessage(input: $input) {
        createdBy
        createdAt
        message
      }
    }
  `;
  const [createMessage] = useMutation(SEND_MESSAGE);

  //Function to add current date when user sends new msg
  function createDateTime() {
    let date = new Date();

    let dateTime =
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      ":" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return dateTime.toString();
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      justifyContent="space-between"
      paddingBottom="16px"
      position="relative"
    >
      <Box flex="1 1 auto" overflowY="auto" padding="16px" position="relative">
        <Box display="flex" flexDirection="column">
          <Box alignSelf="flex-end">
            <SentMessage message="Hello world" />
          </Box>
          <Box alignSelf="flex-start">
            <ReceivedMessage message="Well hello there" />
          </Box>
        </Box>
      </Box>

      <Box
        position="absolute"
        bottom="0"
        left="0"
        padding="16px"
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={inputMessage}
          onChange={handleChange}
          style={{ width: "60%", margin: "0", fontSize: "1.2rem" }}
        />
        <Button onClick={handleSubmit} variant="contained" ml={2}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default MessageBoard;
