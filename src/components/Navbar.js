import { StyledNavbar, StyledNavBrand, StyledNavItems, StyledLink } from "../styled/Navbar";
import { Accent } from "../styled/Random";

const Navbar = () => {
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
            </StyledNavItems>
        </StyledNavbar>
     );
}
 
export default Navbar;