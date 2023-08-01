import { Button, Container, Grid, TextField, Typography } from '@mui/material';

import React from "react";
import { useNavigate } from "react-router-dom";

function Teams(props) {

    const navigate = useNavigate();

    const callEnterscore = () => {
        navigate("/enterscore");
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'team1')
            localStorage.setItem('team1', value);
        else
            localStorage.setItem('team2', value);
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
            <Grid item>
                <Container>
                    <Typography variant="h2">Enter Team Details</Typography>
                    <TextField
                        label="Batting Team"
                        name="team1"
                        onChange={handleInput}
                        variant="outlined"
                        fullWidth
                        margin="normal" />
                    <TextField
                        label="Bowling Team"
                        name="team2"
                        onChange={handleInput}
                        variant="outlined"
                        fullWidth
                        margin="normal" />
                    <Button
                        onClick={callEnterscore}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >Submit</Button>
                </Container>
            </Grid>
        </Grid>
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
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item>
                    <Container>
                        <Typography variant='h2'>
                            Welcome to Cricket Scoring Board
                        </Typography>
                        <Button onClick={this.inputTeams} variant='contained' color='primary' fullWidth>Create Teams</Button>
                        {this.state.showTeam && <Teams />}
                    </Container>
                </Grid>
            </Grid>
        );
    }

    inputTeams = () => {
        this.setState((pS) => ({
            showTeam: !pS.showTeam,
        }));
    };
}

export default LoginSuccess;