import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const Chat = () => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} >
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="UserName"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
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
                sx={{ display: 'inline' }}
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
                sx={{ display: 'inline' }}
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
