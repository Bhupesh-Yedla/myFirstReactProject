import React, { useState } from "react";

function Enterscore(props) {
    const [rowCount, setRowCount] = useState(1);
    const [rowCountBowling, setRowCountBowling] = useState(1);

    const handleClick = (data) => {
        console.log("Clicked:", data);
        // Handle the click event for the respective data
        if (data === "+" && rowCount < 11) {
            setRowCount(rowCount + 1); // Increment row count on "+" button click
        }
    };

    const handleClickBowling = (data) => {
        console.log("Clicked:", data);
        // Handle the click event for the respective data
        if (data === "+" && rowCountBowling < 5) {
            setRowCountBowling(rowCountBowling + 1); // Increment row count on "+" button click
        }
    };

    return (
        <>
            <h1>
                BATTING
            </h1>
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
                    </tr>
                </thead>
                <tbody>

                    {Array.from({ length: rowCount }).map((_, index) => (
                        <tr key={index}>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("+")}>+</button>
                            </td>
                            <td style={styles.cell}>
                                <input type="text" />
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick(".")}>.</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("1")}>1</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("2")}>2</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("3")}>3</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("4")}>4</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("5")}>5</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClick("6")}>6</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>
                BOWLING
            </h1>
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
                        <th>Wide </th>
                        <th>No Ball </th>
                        <th>Wicket </th>
                        <th>Bye's</th>
                    </tr>
                </thead>
                <tbody>

                    {Array.from({ length: rowCountBowling }).map((_, index) => (
                        <tr key={index}>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("+")}>+</button>
                            </td>
                            <td style={styles.cell}>
                                <input type="text" />
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling(".")}>.</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("1")}>1</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("2")}>2</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("3")}>3</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("4")}>4</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("5")}>5</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("6")}>6</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("7")}>Wide</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("8")}>NB</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("9")}>Wkt</button>
                            </td>
                            <td style={styles.cell}>
                                <button onClick={() => handleClickBowling("9")}>Bye</button>
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