import { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContent";
import { StyledCharacter } from "../styled/Game";
import { StyledLink } from "../styled/Navbar";
import { StyledTitle } from "../styled/Random";
import { useAuth0 } from "@auth0/auth0-react";

const GameOver = (history) => {
    const [score] = useScore()
    const [scoreMessage, setScoreMessage] = useState("")
    const {getAccessTokenSilently, isAuthenticated} = useAuth0()

    if(score === -1){
        history.push("/")
    }

    useEffect(()=>{
        const saveHighScore = async()=>{
            try {
                const token = await getAccessTokenSilently({
                    audience: "https://learnbuildtypeapi/",
                    score: ""
                })
                const options = {
                    method: "POST",
                    body: JSON.stringify({name: "hardcoded name", score}),
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const res = await fetch("/.netlify/functions/saveHighScore",options)
                const data = await res.json()
                console.log(data)

                if(data.id){
                    setScoreMessage("Congrats! You got a high score. Check the Highscore tab")
                }else{
                    setScoreMessage("Not really a high score. Gotta try again !!")
                }
            } catch (error) {
                console.error(error)
            }
        }
        if(isAuthenticated){
            saveHighScore()
        }

    },[score,isAuthenticated,getAccessTokenSilently])

    return ( 
        <div>
            <StyledTitle>GameOver</StyledTitle>
            <h2>{scoreMessage}</h2>
            {!isAuthenticated && (<h2>You should log in or sign up to compete for high scores</h2>)}
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