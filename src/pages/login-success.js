import Enterscore from "./Enterscore";
import React from "react";
import { useNavigate } from "react-router-dom";

function Teams(props) {

    const navigate = useNavigate();

    const callEnterscore = () => {
        navigate("/enterscore");
    }

    const handleInput = (e) =>{
        const {name, value} = e.target;
        if(name==='team1')
            localStorage.setItem('team1',value);
        else
            localStorage.setItem('team2',value);
    }

    return (
        <div>
            <label>Batting Team</label>
            <input type="text" name="team1" onChange={handleInput}/>
            <label>Bowling Team</label>
            <input type="text" name="team2" onChange={handleInput}/>
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