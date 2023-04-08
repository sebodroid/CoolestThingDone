import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { gql, useLazyQuery } from "@apollo/client";
import { decodeToken } from "react-jwt";
import Sidebar from "../../components/Sidebar";

const Chat = () => {
  const [error, setError] = useState("");
  const [messages, setMessages] = useState({})
  //Decode token and grabUsername
  const decodedToken = decodeToken(localStorage.getItem("token"));

  const GET_MESSAGES = gql`
    query MsgBoardd($input: userName!) {
      msgBoard(input: $input) {
        userName
        chats {
          withWho {
            friendUname
            messages {
              createdBy
              createdAt
              message
              messageId
            }
          }
        }
      }
    }
  `;

  const [userMessages] = useLazyQuery(GET_MESSAGES, {
    onCompleted: (data) => {
      // handle the successful response here
      return data.msgBoard
    },
    onError: (err) => {
      // handle the error here
      console.log("ERROR: ", err);
    },
  });

  const getMessages = async () => {
    let msg = {}
    try {
      await userMessages({
        variables: {
          input: {
            userName: decodedToken.userName,
          },
        },
      }).then((e) => {
        msg = e.data.msgBoard
      });
    } catch (error) {
      console.log(error);
    }
    return msg
  };

  useEffect(() => {
    getMessages().then((e) => setMessages(e))

  }, [messages]);

  if (Object.keys(messages).length === 0) return <div>Loading...</div>;

  return (
    <Box display="flex">
      <Sidebar />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          height: "fit-content",
        }}
      >
      {messages.chats.withWho[0].messages.map((chat, index) => 
        <ListItem key={index} alignItems="flex-start">
            <ListItemText
            primary={chat.createdBy}
            secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {chat.message}
            </React.Fragment>
          }
        />
        
      </ListItem>
      )}
      </List>
    </Box>
  );
};

export default Chat;
