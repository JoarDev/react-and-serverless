import { useCallback, useEffect, useState } from "react";
import { useScore } from "../context/ScoreContent";
import { StyledCharacter, StyledGame, StyledScore, StyledTimer } from "../styled/Game";
import { Strong } from "../styled/Random";

const Game = ({history}) => {
    const MAX_SECONDS = 7
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    
    const [currentCharacter, setCurrentCharacter] = useState("")
    const [score, setScore] = useScore()
    const [ms, setMs] = useState(0)
    const [seconds, setSeconds] = useState(MAX_SECONDS)

    useEffect(() => {
        setRandomCharacter()

        setScore(0)

        const currentTime = new Date()
        const interval = setInterval( () => updateTime(currentTime),1)
        return () => clearInterval(interval)
        
    }, [setScore])

    const setRandomCharacter = () => {
        const randomInt = Math.floor(Math.random() * 36)
        setCurrentCharacter(characters[randomInt])
    }

    const updateTime = (startTime) => {
        const endTime = new Date()
        const msPassedStr = (
            endTime.getTime() - startTime.getTime()
        ).toString()
        const formattedMSString = ('0000' + msPassedStr).slice(-5) //format so always have 5 digits
        // the first two digits are the seconds, while the last 3 are the ms
        const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0,2)) - 1
        const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3))
        //console.log(updatedSeconds.toString().padStart(2,"0") + ": " + updatedMs.toString().padStart(3,"0"))
        setSeconds(updatedSeconds.toString().padStart(2,"0"))
        setMs(updatedMs.toString().padStart(3,"0"))
    }

    useEffect(()=>{
        if(seconds <= -1){
            //save the score
            history.push("/gameOver")
        }
    }, [seconds, ms, history])

    const keyUpHandler = useCallback((e) => {
        console.log(e.key)
        if(e.key === currentCharacter){
            setScore(prevScore => prevScore + 1)
        }else{
            if(score > 0){
                setScore(prevScore => prevScore - 1)
            }
        }
        setRandomCharacter()
    }, [score,setScore, currentCharacter])

    useEffect(() => {
        document.addEventListener('keyup',keyUpHandler)
        return () => {
            document.removeEventListener('keyup',keyUpHandler)
        }
    },[keyUpHandler])

    return ( 
        <StyledGame>
            <StyledScore>Score: <Strong>{score}</Strong></StyledScore>
            <StyledCharacter>{currentCharacter}</StyledCharacter>
            <StyledTimer>
                Time: <Strong>{seconds}: {ms}</Strong>
            </StyledTimer>
        </StyledGame>
     );
}
 
export default Game;