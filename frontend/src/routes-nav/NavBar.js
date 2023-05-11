import './NavBar.css';
import React, { useContext }from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from './UserContext';


const NavBar =() => {
    const {currUser, logout} = useContext(UserContext);
    const links = currUser?
                <Nav className="ml-auto" navbar>
                    <NavItem><NavLink to="/companies">Companies</NavLink></NavItem>
                    <NavItem><NavLink to="/jobs">Jobs</NavLink></NavItem>
                    <NavItem><NavLink to="/profile">Profile</NavLink></NavItem>
                    <NavItem><NavLink to="/" onClick={logout}>Log out {currUser.username}</NavLink></NavItem>
                </Nav>:
                <Nav className="ml-auto" navbar>
                    <NavItem><NavLink to="/login">Login</NavLink></NavItem>
                    <NavItem><NavLink to="/signup">Signup</NavLink></NavItem>
                </Nav>                  
    return(
            <div>
            <Navbar expand="md">
            <NavLink exact to="/" className="navbar-brand">
                Jobly
            </NavLink>
                {links}
            </Navbar>
            </div>
    ) 
}

export default NavBar;