import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Box, TextField, Button} from "@mui/material";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { decodeToken } from "react-jwt";
import Sidebar from "../../components/Sidebar";

const Chat = () => {
  const [error, setError] = useState("");
  // const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  }

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

  const SEND_MESSAGE = gql `
  mutation CreateMessage($input: MessageInput!){
    createMessage(input: $input){
      createdBy
      createdAt
      message
    }
  }
  `
  const [createMessage] = useMutation(SEND_MESSAGE);

  //Function to add current date when user sends new msg
  function createDateTime(){
    let date = new Date();

    let dateTime = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + ":" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return dateTime.toString()
  }

  const handleSubmit = async (values) => {
    try {
      await createMessage({
        variables: {
          input: {
            createdBy: decodedToken.userName,
            createdAt: createDateTime(),
            message: inputMessage,
          },
        },
      });
      console.log("Meassage created on handleSubmit")
    } catch (error) {
      //setError(error.graphQLErrors[0].message);
      console.log("Error on handle submit when creating message", error)
    }  }

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
    <div>
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
      {/* {messages.chats.withWho[0].messages.map((chat, index) => 
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
      )} */}
      </List>

      <TextField id="outlined-basic" label="Outlined" variant="outlined" 
      onChange={handleChange}
      />
    <Button onClick={handleSubmit} variant="contained">send</Button>

    </Box>
      
    </div>
  );
};

export default Chat;
