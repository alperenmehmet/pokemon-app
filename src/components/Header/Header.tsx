import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavContainer=styled.nav`
display: flex;
justify-content: end;
align-items: center;
padding: 1rem;
font-size: 1.5rem;
`
const NavLink=styled(Link)`
text-decoration: none;
color: black;
&:hover{
    color:blue;
}
`

const Header = () => {
    return (
        <NavContainer>
            <NavLink to="favourites">
                Favourites
            </NavLink>
        </NavContainer>
    )
}

export default Header