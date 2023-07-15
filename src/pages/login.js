import 'react-toastify/dist/ReactToastify.css';

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
    <div>
      <h2>Login to my first React app</h2>
      <form onSubmit={submitForm}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Key in your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h5>
        If you don't have existing account, sign up here
        <a href="signup"> Sign up</a>
      </h5>
      <UserService data={{ username, password }} />
    </div>
  );
};

export default Login;
