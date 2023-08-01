import 'react-toastify/dist/ReactToastify.css';

import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from "react";
import UserService, { login } from "../services/user-service.js";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    login()
      .then((resp) => {
        console.log(resp);
        if (resp) {
          navigate('/welcome');
          toast.success("Logged in successfully", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
        else {
          console.log("No user exists");
          toast.error("User does not exist, please check your username and password.", {
            position: "bottom-center",
            autoClose: 3000
          });
        }

      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      })
      .finally(() => {
        setUsername("");
        setPassword("");
      });

    props.detailsHandler({ setUsername, setPassword });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <Container>
          <Typography variant='h2'>Login to my first React app</Typography>
          <form onSubmit={submitForm}>
            <div>
              <TextField
                label='Username:'
                name="username"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label='Password:'
                name="password"
                type="password"
                placeholder="Key in your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </div>
            <Button type="submit" variant='contained'>Submit</Button>
          </form>
          <Typography variant='h5'>
            If you don't have an existing account, sign up here
            <a href="signup"> Sign up</a>
          </Typography>
          <UserService data={{ username, password }} />
        </Container>
      </Grid>
    </Grid>

  );
};

export default Login;
