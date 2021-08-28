import { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContent";
import { StyledCharacter } from "../styled/Game";
import { StyledLink } from "../styled/Navbar";
import { StyledTitle } from "../styled/Random";

const GameOver = (history) => {
    const [score] = useScore()
    const [scoreMessage, setScoreMessage] = useState("")

    if(score === -1){
        history.push("/")
    }

    useEffect(()=>{
        const saveHighScore = async()=>{
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify({name: "hardcoded name", score})
                }
                const res = await fetch("/.netlify/functions/saveHighScore",options)
                const data = await res.json()
                console.log(data)

                if(data.id){
                    setScoreMessage("Congrats! You got a high score !!")
                }else{
                    setScoreMessage("Not really a high score. Gotta try again !!")
                }
            } catch (error) {
                console.error(error)
            }
        }
        saveHighScore()

    },[score])

    return ( 
        <div>
            <StyledTitle>GameOver</StyledTitle>
            <h2>{scoreMessage}</h2>
            <StyledCharacter>{score}</StyledCharacter>
            <div>
                <StyledLink to="/">Go Home</StyledLink>
                </div>
            <div>
            <StyledLink to="/game">Play Again?</StyledLink>
            </div>
        </div>
     );
}
 
export default GameOver;