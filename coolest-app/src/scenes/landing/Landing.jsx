import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";

const Landing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: {
            md: "160px",
          },
          top: {
            xs: "50%",
          },
          left: {
            xs: "50%",
            md: "80px",
          },
          transform: {
            xs: "translate(-50%, -50%)",
            md: "translate(0, 0)",
          },
          textAlign: {
            xs: "center",
            md: "left",
          },
        }}
      >
        <Typography
          variant="h1"
          fontWeight="600"
          mb="15px"
          sx={{
            fontSize: {
              xs: "50px",
              md: "70px",
              lg: "90px",
            },
          }}
        >
          Kebo Chat App
        </Typography>
        <Typography
          variant="h3"
          fontWeight="600"
          pl="7px"
          sx={{
            fontSize: {
              xs: "16px",
              lg: "20px",
              xl: "24px",
            },
          }}
        >
          Start connecting with your friends today!
        </Typography>
        {!!localStorage.getItem("token") ? (
          <Box
            display="flex"
            mt="50px"
            gap="30px"
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            <Link to="/chat">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{
                  color: "#fff",
                  fontWeight: "600",
                  padding: "15px 60px",
                  borderRadius: "30px",
                }}
              >
                Start Chatting
              </Button>
            </Link>
          </Box>
        ) : (
          <Box
            display="flex"
            mt="50px"
            gap="30px"
            sx={{
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Link to="/login">
              <Button
                type="submit"
                variant="contained"
                border="1px solid secondary"
                sx={{
                  fontWeight: "600",
                  padding: "15px 60px",
                  borderRadius: "30px",
                  backgroundColor: "transparent",
                  border: `1px solid ${colors.greenAccent[500]}`,
                  color: colors.greenAccent[500],
                }}
              >
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{
                  color: "#fff",
                  fontWeight: "600",
                  padding: "15px 60px",
                  borderRadius: "30px",
                  margin: {
                    xs: "0 auto",
                    md: "0",
                  },
                }}
              >
                Register
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Landing;
