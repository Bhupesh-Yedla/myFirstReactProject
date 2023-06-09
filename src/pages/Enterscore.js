import React, { useState } from "react";

function Enterscore(props) {
    const [rowCount, setRowCount] = useState(1);
    const [scores, setScores] = useState([{ runs: 0, balls: 0, wkts: 0, showPlus: true }]);
    const [rowCountBowling, setRowCountBowling] = useState(1);
    const [scoresBowling, setScoresBowling] = useState([{ runs: 0, balls: 0, wkts: 0, showPlus: true }]);
    const [currentRow, setCurrentRow] = useState(0);

    const handleClick = (data, index) => {
        setScores((prevScores) => {
            const updatedScores = [...prevScores];
            const updatedPlayer = { ...updatedScores[index] };

            if (data !== "+") {
                updatedPlayer.runs += parseInt(data);
                updatedPlayer.balls += 1;
            }

            updatedScores[index] = updatedPlayer; // Update the specific player in the scores array

            if (data === "+") {
                if (rowCount < 11) {
                    setRowCount(rowCount + 1);
                    updatedScores[index].showPlus = false; // Remove the "+" symbol from the newly created row
                    updatedScores.push({ runs: 0, balls: 0, wkts: 0, showPlus: true }); // Add a new player with initial values and show "+" symbol to the scores array
                }
            }

            return updatedScores;
        });
    };


    const handleClickBowling = (data, index) => {
        setScoresBowling((prevScoresBowling) => {
            const updatedScores = [...prevScoresBowling];
            const updatedPlayer = { ...updatedScores[index] };

            if (!isNaN(data)) {
                updatedPlayer.runs += parseInt(data);
                updatedPlayer.balls += 1;
            } else if (data === "WD" || data === "NB") {
                updatedPlayer.runs += 1;
            } else if (data === "Wkt") {
                updatedPlayer.wkts += 1;
                updatedPlayer.balls += 1;
            }



            updatedScores[index] = updatedPlayer; // Update the specific player in the scores array

            if (data === "+") {
                if (rowCountBowling < 5) {
                    setRowCountBowling(rowCountBowling + 1);
                    updatedScores[index].showPlus = false; // Remove the "+" symbol from the newly created row
                    updatedScores.push({ runs: 0, balls: 0, wkts: 0, showPlus: true }); // Add a new player with initial values and show "+" symbol to the scores array
                }
            }

            return updatedScores;
        });
    };

    const handleInputChange = (event, index, key) => {
        const { value } = event.target;
        setScores((prevScores) => {
            const updatedScores = [...prevScores];
            updatedScores[index][key] = value;
            return updatedScores;
        });
    };

    const handleInputChangeBowling = (event, index, key) => {
        const { value } = event.target;
        setScoresBowling((prevScoresBowling) => {
            const updatedScores = [...prevScoresBowling];
            updatedScores[index][key] = parseInt(value);
            return updatedScores;
        });
    };

    return (
        <>
            <h1>BATTING</h1>
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
                        <th>Total Runs</th>
                        <th>Balls Faced</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td style={styles.cell}>
                                {score.showPlus && (
                                    <button onClick={() => handleClick("+", index)}>+</button>
                                )}
                            </td>
                            <td style={styles.cell}>
                                <input
                                    type="text"
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
                                <text>{score.runs}</text>
                            </td>
                            <td style={styles.cell}>
                                <text>{score.balls}</text>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h1>BOWLING</h1>
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
                                <text>{(score.balls % 6 == 0) ? (score.balls / 6 + "." + score.balls % 6) : ((score.balls > 6 ? parseInt(score.balls / 6) + "." + score.balls % 6 : score.balls / 10))}</text>
                            </td>
                            <td style={styles.cell}>
                                <text>{score.runs}</text>
                            </td>
                            <td style={styles.cell}>
                                <text>{score.wkts}</text>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button type="submit">End Innings</button>
        </>
    );
}

const styles = {
    cell: {
        textAlign: "center",
    },
};

export default Enterscore;
