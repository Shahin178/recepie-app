import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../utils/APIRoutes";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Register() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, name, email } = values;
      try {
        const { data } = await axios.post(registerUser, {
          name,
          email,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem("app-user", JSON.stringify(data.user));
          navigate("/");
        } else {
          toast.error("Unexpected response from server", toastOptions);
        }
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Failed to register user", toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, email, name } = values;

    if (name.trim().length === 0) {
      toast.error("Name is required", toastOptions);
      return false;
    } else if (email.trim().length === 0) {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than or equal to 8 characters",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be the same",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form} onSubmit={(event) => handleSubmit(event)}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <img src={Logo} alt="Logo" className={classes.logo} />
            <Typography variant="h4" component="h1" gutterBottom>
              delightful
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              value={values.name}
              onChange={(e) => handleChange(e)}
              fullWidth
              className={classes.textField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange(e)}
              fullWidth
              className={classes.textField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={(e) => handleChange(e)}
              fullWidth
              className={classes.textField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => handleChange(e)}
              fullWidth
              className={classes.textField}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
            >
              Create User
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default Register;
