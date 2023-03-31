import React, { useState } from "react";
import {
  Box,
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
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const Register = () => {
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
            color="secondary"
            size="small"
            onClick={onClose}
            sx={{
              wordBreak: "break-word",
            }}
          >
            Close
          </Button>
        }
      />
    );
  };

  const REGISTER_USER = gql`
    mutation RegisterUser($input: UserInput!) {
      registerUser(input: $input) {
        userName
        email
        pwd
      }
    }
  `;

  const [registerUser] = useMutation(REGISTER_USER);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const { data } = await registerUser({
        variables: {
          input: {
            userName: values.userName,
            email: values.email,
            pwd: values.pwd,
          },
        },
      });
      console.log("User created:", data.registerUser);
    } catch (error) {
      setError(error.graphQLErrors[0].message);
    }
  };

  const handleCloseError = () => {
    setError("");
  };

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
        boxShadow={`0px 0px 30px ${colors.greenAccent[500]}`}
        borderRadius="10px"
        color="neutral"
        p={3}
      >
        <Typography variant="h2" fontWeight="600" textAlign="center" mb="30px">
          Register
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
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  error={!!touched.userName && !!errors.userName}
                  helperText={touched.userName && errors.userName}
                  sx={{ gridColumn: "span 4" }}
                />

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
                  value={values.pwd}
                  name="pwd"
                  error={!!touched.pwd && !!errors.pwd}
                  helperText={touched.pwd && errors.pwd}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPass}
                  name="confirmPass"
                  error={!!touched.confirmPass && !!errors.confirmPass}
                  helperText={touched.confirmPass && errors.confirmPass}
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
                  Create Account
                </Button>
              </Box>

              <Typography variant="h6" mt="20px" textAlign="center">
                Already registered?{" "}
                <Link
                  to="/login"
                  style={{
                    color: colors.grey[100],
                    textDecoration: "underline",
                    fontWeight: "600",
                  }}
                >
                  Login
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
  userName: yup
    .string()
    .min(3, "Username needs to be at least 3 characters")
    .max(25, "Username is too long")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  pwd: yup
    .string()
    .required("Required")
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),

  confirmPass: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("pwd"), null], "Passwords must match"),
});
const initialValues = {
  userName: "",
  email: "",
  pwd: "",
  confirmPass: "",
};

export default Register;
