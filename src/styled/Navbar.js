import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledNavbar = styled.nav`
    display:grid;
    grid-template-columns: 1fr auto;
    /* The first column will take the rest*/
    padding: 20px;
`

export const StyledNavBrand = styled.div`
    font-size: 1.4rem;
    text-align: left;

    & > a {
        text-decoration: none;
    }
`

export const StyledNavItems = styled.ul`
    list-style:none;
    padding-left: 0;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 200ms;

    &:hover {
        color: #e16365;
    }
`