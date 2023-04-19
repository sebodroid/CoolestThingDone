import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Slide,
} from "@mui/material";
import { tokens } from "../theme";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";
import robot from "../assets/robot.jpg";
// import pfp from "../assets/pfp-placeholder.jpg";
// import kebo from "../assets/logo-color.png";

import { gql, useLazyQuery } from "@apollo/client";
import { decodeToken } from "react-jwt";

const MobileSidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [visible, setVisible] = useState(false);

  //Setting profiles on profileData value
  const [profileData, setProfileData] = useState([]);

  //Using token to get userName
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
      return data.msgBoard;
    },
    onError: (err) => {
      console.log("Error fetching user messages:", err);
    },
  });

  const getMessages = async () => {
    try {
      const result = await userMessages({
        variables: {
          input: {
            userName: decodedToken.userName,
          },
        },
      });
      return result.data.msgBoard || {};
    } catch (error) {
      console.log("Error fetching user messages:", error);
      return {};
    }
  };

  function setProfiles(messageChats) {
    if (
      !messageChats ||
      !messageChats.chats ||
      messageChats.chats.withWho.length === 0
    ) {
      return;
    }

    let profiles = messageChats.chats.withWho.map((user, index) => ({
      img: robot,
      username: user.friendUname,
      message: user.messages[user.messages.length - 1].message,
      chats: user.messages,
    }));

    setProfileData(profiles);
  }

  useEffect(() => {
    getMessages().then((e) => {
      if (Object.keys(e).length !== 0) {
        setProfiles(e);
      }
    });
  }, []);

  const filteredProfileData = profileData.filter(
    (item) =>
      item.username.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  );

  function showMessageBoard(item) {
    props.func({
      TrueFalse: true,
      chats: item.chats,
      friendUname: item.username,
    });
  }

  return (
    <Box sx={{ position: visible ? "relative" : "absolute" }} zIndex="100">
      {visible ? (
        <Box
          height="100%"
          borderRight={`1px solid ${colors.greenAccent[800]}`}
          marginRight="20px"
          position="absolute"
          zIndex="100"
          backgroundColor={colors.grey[900]}
        >
          <Box m="-10px 10px 20px">
            <IconButton
              onClick={() => {
                setVisible(!visible);
              }}
            >
              <MenuIcon sx={{ color: `${colors.greenAccent[500]}` }} />
            </IconButton>
          </Box>
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="5px"
            borderBottom="1px solid #fff"
            m="10px"
          >
            Start new chat
            <IconButton>
              <PersonAddIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
          {/* Example of how we could utilize props for sidebar */}
          {!collapsed ? (
            filteredProfileData.length === 0 ? (
              <Typography variant="h5" textAlign="center">
                "No Chats Found"
              </Typography>
            ) : (
              filteredProfileData.map((item) => {
                return (
                  //Uing div to add onClick functionality for each Profile component
                  <div
                    onClick={() => {
                      showMessageBoard(item);
                      setVisible(false);
                    }}
                  >
                    <Profile
                      key={item.username}
                      img={item.img}
                      username={item.username}
                      message={item.message}
                      collapsed={collapsed}
                    />
                  </div>
                );
              })
            )
          ) : (
            profileData.map((item) => {
              return (
                //Uing div to add onClick functionality for each Profile component
                <div
                  onClick={() => {
                    showMessageBoard(item);
                    setVisible(false);
                  }}
                >
                  <Profile
                    img={item.img}
                    username={item.username}
                    message={item.message}
                    collapsed={collapsed}
                  />
                </div>
              );
            })
          )}
        </Box>
      ) : (
        <Box m="-10px 10px 20px">
          <IconButton
            onClick={() => {
              setVisible(!visible);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default MobileSidebar;
