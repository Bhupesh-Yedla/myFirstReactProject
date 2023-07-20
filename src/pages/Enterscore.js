import { Box, Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { endInnings } from "../services/user-service";

function Enterscore(props) {
    const [rowCount, setRowCount] = useState(1);
    const [scores, setScores] = useState([{ runs: 0, balls: 0, wkts: 0, extras: 0, showPlus: true, name: "" }]);
    const [rowCountBowling, setRowCountBowling] = useState(1);
    const [scoresBowling, setScoresBowling] = useState([{ runs: 0, balls: 0, wkts: 0, extras: 0, showPlus: true, name: "" }]);
    const [battingTotal, setBattingTotal] = useState({ runs: 0, balls: 0, wkts: 0, extras: 0 });
    const [serialNumbers, setSerialNumbers] = useState([1]);
    const [teams, setTeams] = useState({ team1: "", team2: "" });

    useEffect(() => {
        const team1 = localStorage.getItem("team1");
        const team2 = localStorage.getItem("team2");
        console.log(team1 + " " + team2);
        if (team1 && team2)
            setTeams({ team1, team2 })
    }, []);


    const resetData = (innings) => {
        setRowCount(1);
        setScores([{ runs: 0, balls: 0, wkts: 0, extras: 0, showPlus: true, name: "" }]);
        setRowCountBowling(1);
        setScoresBowling([{ runs: 0, balls: 0, wkts: 0, extras: 0, showPlus: true, name: "" }]);
        setBattingTotal({ runs: 0, balls: 0, wkts: 0, extras: 0 });
        setSerialNumbers(1);
        if (innings === "endInnings")
            setTeams({ team1: "", team2: "" });
        else
            setTeams({ team1: teams.team2, team2: teams.team1 });
    }

    const sendRequest = (innings) => {

        const data = {
            teams: teams,
            batting: scores,
            bowling: scoresBowling,
            battingTotal: battingTotal
        };

        endInnings(data)
            .then((response) => {
                console.log("Data sent successfully:", response);
                if (innings === "endInnings")
                    resetData("endInnings");
                else
                    resetData("nextInnings");
            })
            .catch((error) => {
                console.error("Error sending data", error)
            });

    }

    const handleClick = (data, index) => {
        setScores((prevScores) => {
            const updatedScores = [...prevScores];
            const updatedPlayer = { ...updatedScores[index] };

            if (data !== "+") {
                if (data !== "WD" && data !== "NB") {
                    updatedPlayer.runs += parseInt(data);
                    updatedPlayer.balls += 1;
                }
            }

            updatedScores[index] = updatedPlayer;
            // Update the specific player in the scores array

            if (data === "+") {
                if (rowCount < 11) {
                    setRowCount(rowCount + 1);
                    updatedScores[index].showPlus = false; // Remove the "+" symbol from the current row
                    updatedScores.push({ runs: 0, balls: 0, wkts: 0, showPlus: true });

                }
            }
            else {
                // Set showPlus to true for all rows except the last row
                updatedScores.forEach((score, i) => {
                    score.showPlus = i === updatedScores.length - 1;
                });
            }
            //setScores(updatedScores);

            // Recalculate battingTotal
            const totalRuns = updatedScores.reduce((total, score) => total + score.runs, 0);
            const totalBalls = updatedScores.reduce((total, score) => total + score.balls, 0);


            // setBattingTotal({ runs: totalRuns, balls: totalBalls, wkts: totalWkts });

            setBattingTotal((prevBattingTotal) => ({
                ...prevBattingTotal,
                runs: totalRuns,
                balls: totalBalls,
            }));



            return updatedScores;
        });
        if (data === "+") {
            setSerialNumbers(true); // Display serial numbers in previous row's "Add" column
        }
    };


    const handleClickBowling = (data, index) => {
        setScoresBowling((prevScoresBowling) => {
            const updatedScoresBowling = [...prevScoresBowling];
            const updatedPlayerBowling = { ...updatedScoresBowling[index] };

            if (!isNaN(data)) {
                updatedPlayerBowling.runs += parseInt(data);
                updatedPlayerBowling.balls += 1;
            } else if (data === "WD" || data === "NB") {
                updatedPlayerBowling.runs += 1;
                updatedPlayerBowling.balls += 0;
                setBattingTotal((prevBattingTotal) => ({
                    ...prevBattingTotal,
                    extras: prevBattingTotal.extras + 1,
                }));
            } else if (data === "Wkt") {
                updatedPlayerBowling.wkts += 1;
                updatedPlayerBowling.balls += 1;

                setBattingTotal((prevBattingTotal) => ({
                    ...prevBattingTotal,
                    wkts: prevBattingTotal.wkts + 1,
                }));

            }

            updatedScoresBowling[index] = updatedPlayerBowling; // Update the specific player in the scores array

            if (data === "+") {
                if (rowCountBowling < 5) {
                    setRowCountBowling(rowCountBowling + 1);
                    updatedScoresBowling[index].showPlus = false; // Remove the "+" symbol from the newly created row
                    updatedScoresBowling.push({ runs: 0, balls: 0, wkts: 0, showPlus: true }); // Add a new player with initial values and show "+" symbol to the scores array
                }
            }



            return updatedScoresBowling;
        });


    };

    const handleInputChange = (event, index, key) => {
        const { value } = event.target;
        const inputValue = value.trim() === '' ? '0' : value;

        setScores((prevScores) => {
            const updatedScores = prevScores.map((score, i) => {
                if (i === index) {
                    return { ...score, [key]: inputValue };
                } else {
                    return score;
                }
            });

            return updatedScores;
        });
    };



    const handleInputChangeBowling = (event, index, key) => {

        const { value } = event.target;
        const inputValue = value.trim() === '' ? '0' : value;

        setScoresBowling((prevScoresBowling) => {
            const updatedScores = prevScoresBowling.map((score, i) => {
                if (i === index) {
                    return { ...score, [key]: inputValue };
                } else {
                    return score;
                }
            });

            return updatedScores;
        });
    };

    return (
        <>
            <Typography variant="h3">BATTING: {teams.team1}</Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Add</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Names</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Dots</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Single</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Double</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Three </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Four </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Five </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Six </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Out </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Total Runs</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Balls Faced</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores.map((score, index) => (
                        <TableRow key={index}>
                            <TableCell style={styles.cell}>
                                {serialNumbers && index + 1} {/* Serial number */}
                                {score.showPlus && (
                                    <Button variant="contained" onClick={() => handleClick("+", index)}>+</Button>
                                )}
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <TextField
                                    type="text"
                                    value={score.name}
                                    onChange={(e) => handleInputChange(e, index, "name")}
                                />
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("0", index)}>.</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("1", index)}>1</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("2", index)}>2</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("3", index)}>3</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("4", index)}>4</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("5", index)}>5</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("6", index)}>6</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClick("0", index)}>O</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                {score.runs}
                            </TableCell>
                            <TableCell style={styles.cell}>
                                {score.balls}
                            </TableCell>

                        </TableRow>

                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan="2"></TableCell>
                        <TableCell colSpan="8"></TableCell>
                        <TableCell style={styles.cell}><strong>Total: {battingTotal.runs}/{battingTotal.wkts}</strong></TableCell>
                        <TableCell style={styles.cell}><strong>Overs: {(battingTotal.balls % 6 === 0) ? (battingTotal.balls / 6 + "." + battingTotal.balls % 6) : ((battingTotal.balls > 6 ? parseInt(battingTotal.balls / 6) + "." + battingTotal.balls % 6 : battingTotal.balls / 10))}</strong></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="2"></TableCell>
                        <TableCell colSpan="8"></TableCell>
                        <TableCell style={styles.cell}><strong>Extras: {battingTotal.extras}</strong></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="2"></TableCell>
                        <TableCell colSpan="8"></TableCell>
                        <TableCell style={styles.cell}><strong>Grand Total: {battingTotal.extras + battingTotal.runs}/{battingTotal.wkts}</strong></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <br />
            <Typography variant="h3">BOWLING: {teams.team2}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Add</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Names</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Dots</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Single</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Double</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Three </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Four </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Five </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Six </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Wickets</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Wides</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>No Balls</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Balls bowled</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Runs Conceded</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Total Wkts</TableCell>
                    </TableRow>  
                </TableHead>
                <TableBody>
                    {scoresBowling.map((score, index) => (
                        <TableRow key={index}>
                            <TableCell style={styles.cell}>
                                {score.showPlus && (
                                    <Button variant="contained" onClick={() => handleClickBowling("+", index)}>+</Button>
                                )}
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <TextField
                                    type="text"
                                    value={score.name}
                                    onChange={(e) => handleInputChangeBowling(e, index, "name")}
                                />
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("0", index)}>.</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("1", index)}>1</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("2", index)}>2</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("3", index)}>3</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("4", index)}>4</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("5", index)}>5</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("6", index)}>6</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("Wkt", index)}>Wkt</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("WD", index)}>WD</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                <Button variant="contained" onClick={() => handleClickBowling("NB", index)}>NB</Button>
                            </TableCell>
                            <TableCell style={styles.cell}>
                                {(score.balls % 6 === 0) ? (score.balls / 6 + "." + score.balls % 6) : ((score.balls > 6 ? parseInt(score.balls / 6) + "." + score.balls % 6 : score.balls / 10))}
                            </TableCell>
                            <TableCell style={styles.cell}>
                                {score.runs}
                            </TableCell>
                            <TableCell style={styles.cell}>
                                {score.wkts}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />
            <Box sx={{display:'flex', justifyContent: 'left', gap:'16px'}}>
                <Button variant="contained" type="submit" onClick={() => sendRequest("nextInnings")}>Next Innings</Button>
                <Button variant="contained" type="submit" onClick={() => sendRequest("endInnings")}>End Innings</Button>
            </Box>

        </>
    );
}

const styles = {
    cell: {
        textAlign: "center",
    },
};

export default Enterscore;
