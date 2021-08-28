import { useEffect, useState } from "react";
import { ScoreLi, ScoresList } from "../styled/HighScores";
import { StyledTitle } from "../styled/Random";

const HighScores = () => {
    //use the fetch API to call getHighScores function and display them
    const [highScores, setHighScores] = useState([])

    useEffect(()=>{
        const loadHighScores = async () =>{
            try {
                const res = await fetch('/.netlify/functions/getHighScores')
                const scores = await res.json()
                console.log(scores)
                setHighScores(scores)
            } catch (error) {
                console.warn(error)
            }
        }
        loadHighScores()
    },[])

    return ( 
        <div>
            <StyledTitle>HighScores</StyledTitle>
            <ScoresList>
                {highScores.map((score, index)=>(
                    <ScoreLi key={score.id}>
                        {index + 1} | {score.fields.name} - {score.fields.score}
                    </ScoreLi>
                ))}
            </ScoresList>
        </div>
     );
}
 
export default HighScores;