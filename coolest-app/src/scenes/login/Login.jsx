import React, { useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation, gql } from "@apollo/client";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");

  const ErrorSnackbar = ({ message, onClose }) => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={true}
        autoHideDuration={5000}
        onClose={onClose}
        message={message}
        action={
          <Button
            backgroundColor={colors.redAccent[500]}
            color="secondary"
            size="small"
            onClick={onClose}
          >
            Close
          </Button>
        }
      />
    );
  };

  const LOGIN_USER = gql`
    mutation LoginUser($input: UserInput!) {
      loginUser(input: $input) {
        email
        pwd
      }
    }
  `;

  const [loginUser] = useMutation(LOGIN_USER);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const { data } = await loginUser({
        variables: {
          input: {
            email: values.email,
            pwd: values.pwd,
          },
        },
      });
      console.log("Successfully logged in:", data.loginUser);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Box
      m="20px"
      height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="min(90%, 30rem)"
        borderRadius="10px"
        color="neutral"
        boxShadow={`0px 0px 30px ${colors.greenAccent[500]}`}
        p={3}
      >
        <Typography variant="h2" fontWeight="600" textAlign="center" mb="30px">
          Login
        </Typography>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="30px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{
                    color: "#fff",
                    minWidth: "100%",
                    fontWeight: "600",
                  }}
                >
                  Sign in
                </Button>
              </Box>
              <Typography variant="h6" marginBlock="20px" textAlign="center">
                Or Sign In Using
              </Typography>
              <Box display="flex" justifyContent="center" gap="10px">
                <IconButton
                  sx={{
                    backgroundColor: "#DB4437",
                  }}
                  onClick={() => login()}
                >
                  <GoogleIcon sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "#333",
                  }}
                >
                  <GitHubIcon sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "#3b5998",
                  }}
                >
                  <FacebookIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
              <Typography variant="h6" mt="20px" textAlign="center">
                Not registered yet?{" "}
                <Link
                  to="/register"
                  style={{
                    color: colors.grey[100],
                    textDecoration: "underline",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Box>
      {error && <ErrorSnackbar message={error} onClose={handleCloseError} />}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
