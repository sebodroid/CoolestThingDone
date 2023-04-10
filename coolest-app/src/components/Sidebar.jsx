import React, { useState, useEffect} from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
import { tokens } from "../theme";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import SearchIcon from "@mui/icons-material/Search";
import Profile from "./Profile";
import robot from "../assets/robot.jpg";
import pfp from "../assets/pfp-placeholder.jpg";
import kebo from "../assets/logo-color.png";

import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { decodeToken } from "react-jwt";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //let profileData = []
  const [profileData, setProfileData] = useState([]);

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

  const [messages, setMessages] = useState({});

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

  function setProfiles(messageChats) {
    let profiles = [];
    messageChats.map((user, index) => {
      profiles[index] = {img: robot, userName: user.friendUname, message: user.messages[user.messages.length - 1]}
    });
    setProfileData(profiles)
  }

  useEffect(() => {
    getMessages().then((e) => setMessages(e))
    
    //This breaks at the moment, will fix later
    //console.log("Messages", messages.chats.withWho)
    //setProfiles(messages.chats.withWho);
    console.log(profileData)
  }, [messages]);


  //   For Testing Purposes
  // const profileData = [
  //   {
  //     img: robot,
  //     username: "Billy Bob Joe",
  //     message: "Hey there bro",
  //   },
  //   {
  //     img: pfp,
  //     username: "Mr. Savage",
  //     message: "You're such a Savage",
  //   },
  //   {
  //     img: kebo,
  //     username: "Lil Peep",
  //     message: "I'm not dead mother fucker",
  //   },
  // ];

  const filteredProfileData = profileData.filter(
    (item) =>
      item.username.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  );

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      height={`calc(100vh - 78px)`}
      borderRight={`1px solid ${colors.greenAccent[800]}`}
      marginRight="20px"
      position="relative"
    >
      {!collapsed && (
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          m="0 20px 20px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}
      {/* Example of how we could utilize props for sidebar */}
      {!collapsed ? (
        filteredProfileData.length === 0 ? (
          <Typography variant="h5" textAlign="center">
            "User Not Found"
          </Typography>
        ) : (
          filteredProfileData.map((item) => {
            return (
              <Profile
                key={item.username}
                img={item.img}
                username={item.username}
                message={item.message}
                collapsed={collapsed}
              />
            );
          })
        )
      ) : (
        profileData.map((item) => {
          return (
            <Profile
              img={item.img}
              username={item.username}
              message={item.message}
              collapsed={collapsed}
            />
          );
        })
      )}

      {/* Collapse and uncollapse sidebar */}
      {/* On collapse, text should be hidden */}
      <IconButton
        onClick={handleCollapse}
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          textAlign: "center",
          padding: "10px",
          borderRadius: "0",
        }}
      >
        {collapsed ? (
          <KeyboardTabIcon sx={{ fontSize: "30px" }} />
        ) : (
          <KeyboardReturnIcon sx={{ fontSize: "30px" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default Sidebar;
