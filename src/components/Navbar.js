import { useAuth0 } from "@auth0/auth0-react";
import { StyledNavbar, StyledNavBrand, StyledNavItems, StyledLink } from "../styled/Navbar";
import { Accent } from "../styled/Random";
import UseTheme from "../hooks/UseTheme";

const Navbar = ({toggleTheme}) => {

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    return ( 
        <StyledNavbar>
            <StyledNavBrand>
                <StyledLink to="/">
                    Learn.Build.<Accent>Type.</Accent>
                </StyledLink>
            </StyledNavBrand>
            <StyledNavItems>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                <li>
                    <StyledLink to="/highScores">High Scores</StyledLink>
                </li>
                {!isAuthenticated && (
                    <li>
                        <button onClick={loginWithRedirect}>Sign in</button>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <button onClick={logout}>Log out</button>
                    </li>
                )}
                <button onClick={toggleTheme}>
                    Toggle Theme
                </button>
            </StyledNavItems>
        </StyledNavbar>
     );
}
 
export default Navbar;