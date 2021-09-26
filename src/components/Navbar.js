import { useAuth0 } from "@auth0/auth0-react";
import { StyledNavbar, StyledNavBrand, StyledNavItems, StyledLink, StyledButtonLink } from "../styled/Navbar";
import { Accent } from "../styled/Random";
import UseTheme from "../hooks/UseTheme";
import { StyledButton } from "../styled/Buttons";

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
                        <StyledButtonLink onClick={loginWithRedirect}>Sign in</StyledButtonLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <StyledButtonLink onClick={logout}>Log out</StyledButtonLink>
                    </li>
                )}
                <StyledButton onClick={toggleTheme}>
                    Toggle Theme
                </StyledButton>
            </StyledNavItems>
        </StyledNavbar>
     );
}
 
export default Navbar;