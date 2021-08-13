import {Link} from "react-router-dom"

const Navbar = () => {
    return ( 
        <nav>
            <div>
                <Link to="/">
                    Learn.Build.<span>Type.</span>
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/highScores">High Scores</Link>
                </li>
            </ul>
        </nav>
     );
}
 
export default Navbar;