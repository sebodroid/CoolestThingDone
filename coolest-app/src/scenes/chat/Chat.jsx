import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { gql, useLazyQuery } from "@apollo/client";
import { decodeToken } from "react-jwt";

const Chat = () => {
  const [error, setError] = useState("");

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
    },
    onError: (err) => {
      // handle the error here
      console.log("ERROR: ", err);
    },
  });

  const getMessages = async () => {
    try {
      await userMessages({
        variables: {
          input: {
            userName: decodedToken.userName,
          },
        },
      }).then((e) => e.error && setError(e));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="UserName"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Who sent the message
              </Typography>
              {": Hey how are you, this is the latest message"}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="UserName"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Who sent the message
              </Typography>
              {": Hey how are you, this is the latest message"}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="UserName"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Who sent the message
              </Typography>
              {": Hey how are you, this is the latest message"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
};

export default Chat;
