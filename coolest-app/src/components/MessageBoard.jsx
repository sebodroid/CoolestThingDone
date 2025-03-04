import React, { useState, useRef, useEffect } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import {
  Box,
  TextField,
  Button,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { decodeToken } from "react-jwt";
import { tokens } from "../theme";
import SendIcon from "@mui/icons-material/Send";

const MessageBoard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const messagesEndRef = useRef(null);

  const handleSubmit = async (values) => {
    try {
      await createMessage({
        variables: {
          input: {
            createdBy: decodedToken.userName + " :UNAME:" + props.friendUname,
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

  useEffect(() => {
    // Scroll to the bottom of the message board after rendering
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, []);

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  //Decode token and grabUsername
  const decodedToken = decodeToken(localStorage.getItem("token"));

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
      padding="16px 0"
      position="relative"
      sx={{
        filter: !props.profileSearch ? "blur(6px)" : "none",
      }}
    >
      <Box
        flex="1 1 auto"
        overflowY="auto"
        padding="16px"
        position="relative"
        ref={messagesEndRef}
        style={{ overflowY: "auto" }}
      >
        {props.messages.map((item) => {
          let display,
            message = "";

          if (item.createdBy === decodedToken.userName) {
            display = "flex-end";
            message = <SentMessage message={item.message} />;
          } else {
            display = "flex-start";
            message = <ReceivedMessage message={item.message} />;
          }
          return (
            <Box display="flex" flexDirection="column">
              <Box
                alignSelf={display}
                sx={{ maxWidth: props.smallScreen ? "70%" : "50%" }}
              >
                {message}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        alignSelf="flex-end"
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
          style={{ width: "min(90%, 40rem)", margin: "0", fontSize: "1.2rem" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default MessageBoard;
