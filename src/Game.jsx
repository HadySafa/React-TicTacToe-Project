import { useState, useEffect } from "react"
import { VscDebugRestart } from "react-icons/vsc";


function Game() {

    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const [turn, setTurn] = useState("X")
    const [array, setArray] = useState([...new Array(9)])
    const [winner, setWinner] = useState(null)
    const [draw, setDraw] = useState(false);
    const [winnerArray,setWinnerArray] = useState([-1,-1,-1]);

    function toggleTurn() {
        turn === "X" ? setTurn("O") : setTurn("X")
    }

    function pushToArray(index) {
        const copiedArray = [...array]
        copiedArray[index] = turn;
        setArray(copiedArray)
    }

    function isGameOver() {
        for (let element of array) {
            if (!element)
                return false
        }
        return true
    }

    function handleClick(e) {
        let index = e.target.value;
        if (array[index] || winner) return;
        pushToArray(index);
        toggleTurn()
    }

    function handleRestart() {
        const initialArray = [...new Array(9).fill(undefined)];
        setArray(initialArray);
        setTurn("X");
        setWinner(null)
        setDraw(false)
        setWinnerArray([-1,-1,-1])
    }

    function checkWinner() {
        console.log("Checking winner")
        winCombinations.map((element) => {
            const [i1, i2, i3] = element;
            if (array[i1]) {
                if (array[i1] === array[i2] && array[i1] === array[i3]) {
                    setWinner(array[i1])
                    setWinnerArray(element)
                }
            }
        })
    }

    useEffect(() => {
        checkWinner();
        if (isGameOver() && !winner) setDraw(true)
    }, [array])

    return (
        <div className="wrapper">

            <div className="info">
                <p>
                    {
                        winner ? `The winner is" ${winner}"!`
                            : draw ? `Game ended as a tie!` : `The next turn is "${turn}"`
                    }
                </p>
                <span className="restart" onClick={handleRestart}><VscDebugRestart /></span>
            </div>

            <div className="grid">
                {
                    array.map((_, index) => <button className={`cell ${array[index] ? array[index] === "X" ? "X" : "O" : null} 
                    ${index === winnerArray[0] || index === winnerArray[1] || index === winnerArray[2] ? "win" : null }`}
                        onClick={handleClick} value={index} key={index}>{array[index]}</button>)
                }
            </div>

        </div>
    );

}

export default Game