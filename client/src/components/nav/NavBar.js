import AddIcon from '@mui/icons-material/Add';
import { useState } from "react"
import { NavLink as RRNavLink} from "react-router-dom";
import { Button, Collapse, Nav, NavLink, NavItem, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import Canvas from '../menu/Canvas';
import "./navBar.css";
import ProfileButton from './ProfileButton';
import NavSearchBar from './NavSearchBar';

export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div>
            <Navbar className='navbar' fixed="true" expand="lg">
                <NavbarBrand style={{color: "white" }} className="mr-auto" tag={RRNavLink} to="/">
                    Indielot
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav className='navbar-nav' navbar>
                                <NavItem className='navItem' onClick={() => setOpen(false)}>
                                    <Canvas menu={menu} setMenu={setMenu}/>
                                </NavItem>
                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink style={{color: "white" }} tag={RRNavLink} to="productions">
                                        Productions
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink style={{color: "white" }} tag={RRNavLink} to={`${loggedInUser.userName}/productions`}>
                                        My Productions
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <div className='navSearchBar'>
                            <NavItem>
                                <NavSearchBar />
                            </NavItem>
                        </div>
                        <div>
                            <NavItem className='navItem' onClick={() => setOpen(false)}>
                                <NavLink className='icon-button' onClick={() => setOpen(false)} tag={RRNavLink} to="productions/new">
                                    <AddIcon className='navbar-icon' fontSize='medium'/>
                                </NavLink>
                            </NavItem>
                        </div>
                        <div>
                            <ProfileButton loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
                        </div>
                    </>
                ) : (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    )
}