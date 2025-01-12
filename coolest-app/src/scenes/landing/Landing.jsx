import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Landing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          alignItems: "center",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          height: { xs: "650px", sm: "850px" },
          marginInline: {
            xs: "10px",
            lg: "100px",
          },
          textAlign: { xs: "center", lg: "left" },
        }}
      >
        <Box
          sx={{
            marginBlock: {
              xs: "60px",
              lg: "0",
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
            KEBO Live Chat
          </Typography>
          <Typography
            variant="h3"
            pl="7px"
            sx={{
              fontSize: {
                xs: "16px",
                lg: "20px",
                xl: "24px",
              },
            }}
          >
            Start{" "}
            {
              <TypeAnimation
                sequence={[
                  1000,
                  "chatting",
                  2000,
                  "connecting",
                  2000,
                  "sharing",
                  2000,
                  "meeting",
                  2000,
                  "engaging",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            }{" "}
            with your friends today!
          </Typography>
          {!!localStorage.getItem("token") ? (
            <Box
              display="flex"
              mt="50px"
              gap="30px"
              sx={{
                justifyContent: {
                  xs: "center",
                  lg: "flex-start",
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
                  lg: "flex-start",
                },
                flexDirection: {
                  xs: "column",
                  lg: "row",
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
        <Box>
          <Box className="blob-img"></Box>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
