import React, { useState } from "react";
import UserService, { signup } from "../services/user-service.js";
import { toast } from "react-toastify";

const SignUp = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [cpassword, setCPassword] = useState("");

    const submitSignupForm = (e) => {
        e.preventDefault();

        if (cpassword !== password) {
            toast.error("Password do not match", {
                position: "bottom-center",
                autoClose: 3000
            })
        }
        else {
            signup()
                .then((resp) => {
                    console.log("Success Signup");
                    toast.success("Signed up successfully.", {
                        position: "bottom-center",
                        autoClose: 3000,
                    });
                    console.log(resp);
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Error");
                })
                .finally(() => {
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    setCPassword("");
                })

            props.detailsHandler({ username, email, password });
        }

    };

    return (
        <div>
            <h3>Sign Up</h3>
            <form onSubmit={submitSignupForm}>
                <div>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter you name" name="username" value={username}
                        onChange={(e) => setUsername(e.target.value)}></input></div>

                <div>
                    <label>Email:</label>
                    <input type="text" placeholder="Enter you email" name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}></input></div>

                <div>
                    <label>Enter Password:</label>
                    <input type="password" placeholder="Enter password" name="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}></input></div>

                <div>
                    <label>Confirm Password:</label>
                    <input type="password" placeholder="Re-Enter password" name="cpassword" value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}></input></div>
                <br />
                <button type="submit">Submit</button>
            </form>
            <UserService data={{ username, email, password }} />
        </div>
    );
}

export default SignUp;