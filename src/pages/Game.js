import { StyledCharacter, StyledGame, StyledScore, StyledTimer } from "../styled/Game";
import { Strong } from "../styled/Random";

const Game = () => {
    return ( 
        <StyledGame>
            <StyledScore>Score: <Strong>0</Strong></StyledScore>
            <StyledCharacter>A</StyledCharacter>
            <StyledTimer>Time: x</StyledTimer>
        </StyledGame>
     );
}
 
export default Game;