import AddIcon from '@mui/icons-material/Add';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "../../assets/logo600.png"
import { useContext, useState } from "react"
import { NavLink as RRNavLink} from "react-router-dom";
import { Button, Collapse, Nav, NavLink, NavItem, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import Canvas from '../menu/Canvas';
import "./navBar.css";
import ProfileButton from './ProfileButton';
import NavSearchBar from './NavSearchBar';
import { logout } from '../../managers/authManager';
import { AuthContext } from '../../context/AuthContext';

export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    const authContext = useContext(AuthContext);

    return (
        <header>
            <Navbar className="navbar" fixed="true" expand="lg">
                <NavbarBrand className="navbarBrand" tag={RRNavLink} to="/">
                    <img  
                        className="navLogo"
                        src={Logo}
                        alt="logo"
                    />
                </NavbarBrand>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        logout().then(() => {
                            setOpen(false);
                            authContext.setUser("");
                            authContext.setToken("");
                            authContext.setAuthenticated(false);
                        })
                    }}
                >Logout</button>
            </Navbar>
        </header>
    )

    /* return (
        <div>
            <Navbar className='navbar' fixed="true" expand="lg">
                <NavbarBrand className='navbar-brand' tag={RRNavLink} to="/">
                    <img 
                        className={`logo`}
                        src={Logo}
                        alt='logo'

                    />
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav className='navbar-nav' navbar>
                                <NavItem className='navItem' onClick={() => setOpen(false)}>
                                    <Canvas menu={menu} setMenu={setMenu}/>
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
    ) */
}