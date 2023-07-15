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
                    extras: prevBattingTotal.extras++,
                }));
            } else if (data === "Wkt") {
                updatedPlayerBowling.wkts += 1;
                updatedPlayerBowling.balls += 1;

                setBattingTotal((prevBattingTotal) => ({
                    ...prevBattingTotal,
                    wkts: prevBattingTotal.wkts++,
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
            <h1>BATTING: {teams.team1}</h1>

            <table>
                <thead>
                    <tr>
                        <th>Add</th>
                        <th>Names</th>
                        <th>Dots</th>
                        <th>Single</th>
                        <th>Double</th>
                        <th>Three </th>
                        <th>Four </th>
                        <th>Five </th>
                        <th>Six </th>
                        <th>Out </th>
                        <th>Total Runs</th>
                        <th>Balls Faced</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td style={styles.cell}>
                                {serialNumbers && index + 1} {/* Serial number */}
                                {score.showPlus && (
                                    <button onClick={() => handleClick("+", index)}>+</button>
                                )}
                            </td>
                            <td style={styles.cell}>
                                <input
                                    type="text"
                                    value={score.name}
                                    onChange={(e) => handleInputChange(e, index, "name")}
                                />
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("0", index)}>.</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("1", index)}>1</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("2", index)}>2</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("3", index)}>3</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("4", index)}>4</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("5", index)}>5</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("6", index)}>6</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("0", index)}>O</button>
                            </td>
                            <td style={styles.cell}>
                                {score.runs}
                            </td>
                            <td style={styles.cell}>
                                {score.balls}
                            </td>

                        </tr>

                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2"></td>
                        <td colSpan="8"></td>
                        <td style={styles.cell}><strong>Total: {battingTotal.runs}/{battingTotal.wkts}</strong></td>
                        <td style={styles.cell}><strong>Overs: {(battingTotal.balls % 6 === 0) ? (battingTotal.balls / 6 + "." + battingTotal.balls % 6) : ((battingTotal.balls > 6 ? parseInt(battingTotal.balls / 6) + "." + battingTotal.balls % 6 : battingTotal.balls / 10))}</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                        <td colSpan="8"></td>
                        <td style={styles.cell}><strong>Extras: {battingTotal.extras}</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                        <td colSpan="8"></td>
                        <td style={styles.cell}><strong>Grand Total: {battingTotal.extras + battingTotal.runs}/{battingTotal.wkts}</strong></td>
                    </tr>
                </tfoot>
            </table>
            <br />
            <h1>BOWLING: {teams.team2}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Add</th>
                        <th>Names</th>
                        <th>Dots</th>
                        <th>Single</th>
                        <th>Double</th>
                        <th>Three </th>
                        <th>Four </th>
                        <th>Five </th>
                        <th>Six </th>
                        <th>Wickets</th>
                        <th>Wides</th>
                        <th>No Balls</th>
                        <th>Balls bowled</th>
                        <th>Runs Conceded</th>
                        <th>Total Wkts</th>
                    </tr>
                </thead>
                <tbody>
                    {scoresBowling.map((score, index) => (
                        <tr key={index}>
                            <td style={styles.cell}>
                                {score.showPlus && (
                                    <button onClick={() => handleClickBowling("+", index)}>+</button>
                                )}
                            </td>
                            <td style={styles.cell}>
                                <input
                                    type="text"
                                    value={score.name}
                                    onChange={(e) => handleInputChangeBowling(e, index, "name")}
                                />
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("0", index)}>.</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("1", index)}>1</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("2", index)}>2</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("3", index)}>3</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("4", index)}>4</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("5", index)}>5</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("6", index)}>6</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("Wkt", index)}>Wkt</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("WD", index)}>WD</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("NB", index)}>NB</button>
                            </td>
                            <td style={styles.cell}>
                                {(score.balls % 6 === 0) ? (score.balls / 6 + "." + score.balls % 6) : ((score.balls > 6 ? parseInt(score.balls / 6) + "." + score.balls % 6 : score.balls / 10))}
                            </td>
                            <td style={styles.cell}>
                                {score.runs}
                            </td>
                            <td style={styles.cell}>
                                {score.wkts}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button type="submit" onClick={() => sendRequest("nextInnings")}>Next Innings</button>
            <button type="submit" onClick={() => sendRequest("endInnings")}>End Innings</button>
        </>
    );
}

const styles = {
    cell: {
        textAlign: "center",
    },
};

export default Enterscore;
