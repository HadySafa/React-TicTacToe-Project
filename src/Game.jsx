import { useState, useEffect } from "react"

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
    const [draw, setDraw] = useState(false)

    function toggleTurn() {
        turn === "X" ? setTurn("O") : setTurn("X")
    }

    function pushToArray(index) {
        const copiedArray = [...array]
        copiedArray[index] = turn;
        setArray(copiedArray)
    }

    function isGameOver(){
        for(let element of array){
            if(!element)
                return false
        } 
        return true
    }

    function handleClick(e) {
        let index = e.target.value;
        if(array[index] || winner) return;
        pushToArray(index);
        toggleTurn()
    }

    function handleRestart() {
        const initialArray = [...new Array(9).fill(undefined)];
        setArray(initialArray);
        setTurn("X");
        setWinner(null)
        setDraw(false)
    }

    function checkWinner() {
        console.log("Checking winner")
        winCombinations.map((element) => {
            console.log(element)
            const [i1, i2, i3] = element;
            if (array[i1]) {
                if (array[i1] === array[i2] && array[i1] === array[i3]) {
                    console.log("Condition Passed", array[i1])
                    setWinner(array[i1])
                }
            }
        })
    }

    useEffect(() => {
        checkWinner();
        if( isGameOver() && !winner) setDraw(true)
    }, [array])
    

    return (
        <div className="wrapper">
            <div className="grid">
                {
                    array.map((_, index) => <button onClick={handleClick} value={index} key={index}>{array[index]}</button>)
                }
            </div>
            <div className="controls">
                <p>{winner ? `The winner is ${winner}! Please Restart.` 
                : draw ? `Draw, Game Over! Please Restart.` : `The next turn is ${turn}` }</p>
                <button onClick={handleRestart}>Restart</button>
            </div>
        </div>
    );

}

export default Game