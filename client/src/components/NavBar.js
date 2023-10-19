import { useState } from "react"
import { NavLink as RRNavLink} from "react-router-dom";
import { Button, Collapse, Nav, NavLink, NavItem, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { logout } from "../managers/authManager";
import { ReactComponent as PlusIcon } from "../svgs/plusIcon.svg"

export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div>
            <Navbar color="light" light fixed="true" expand="lg">
                <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
                    Indielot
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav navbar>
                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink tag={RRNavLink} to="productions">
                                        Productions
                                    </NavLink>
                                </NavItem>
                                <NavItem onClick={() => setOpen(false)}>
                                    <NavLink tag={RRNavLink} to={`${loggedInUser.userName}/productions`}>
                                        My Productions
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <div>
                            <NavLink onClick={() => setOpen(false)} tag={RRNavLink} to="productions/new">
                                <PlusIcon style={{ width: "35px", height: "35px"}}/>
                            </NavLink>
                        </div>
                        <Button
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                                logout().then(() => {
                                    setLoggedInUser(null);
                                    setOpen(false);
                                })
                            }}>
                                Logout
                            </Button>
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