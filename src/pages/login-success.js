import React from "react";
import Enterscore from "./Enterscore";
import { useNavigate } from "react-router-dom";


function Teams(props) {

    const navigate = useNavigate();

    const callEnterscore = () => {
        navigate("/enterscore");
    }

    return (
        <div>
            <label>Batting Team</label>
            <input type="text" />
            <label>Bowling Team</label>
            <input type="text" />
            <button type="submit" onClick={callEnterscore}>Submit</button>
        </div>
    );
}

class LoginSuccess extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showTeam: false,
        };
    }
    render() {
        return (
            <div>
                <h2>
                    Welcome to my new react app, login successful.
                </h2>
                <button type="button" onClick={this.inputTeams}>Create Team</button>
                {this.state.showTeam && <Teams />}
            </div>
        );
    }

    inputTeams = () => {
        this.setState((pS) => ({
            showTeam: !pS.showTeam,
        }));
    };
}

export default LoginSuccess;