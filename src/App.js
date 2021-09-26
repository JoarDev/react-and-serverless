import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Game from "./pages/Game"
import GameOver from "./pages/GameOver"
import HighScores from "./pages/HighScores"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import {Container} from "./styled/Container"
import {Main} from "./styled/Main"
import Global from './styled/Global';
import { useAuth0 } from '@auth0/auth0-react';
import {ThemeProvider} from "styled-components"
import {LightTheme, DarkTheme} from "./styled/Themes"
import UseTheme from './hooks/UseTheme';
import Loader from './styled/Loader';

function App() {

  const {isLoading} = useAuth0();

  const [theme, toggleTheme] = UseTheme()
  const currentTheme = theme === "light" ? LightTheme: DarkTheme

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <Global/>
        <Main>
          {isLoading && <Loader>Loading screen...</Loader>}
          {!isLoading &&
          <Container>
            <Navbar toggleTheme={toggleTheme}/>
            <Switch>
              <Route path="/game" component={Game}/>
              <Route path="/highScores" component={HighScores}/>
              <Route path="/gameOver" component={GameOver}/>
              <Route path="/" component={Home}/>
              {/* Left intentionally last because react finds the first match with slash*/}
            </Switch>
          </Container>
          }
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
