import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { Nav, NavItem } from 'reactstrap';
import DropdownMenu from './dropdown/DropdownMenu';

export default function ProfileButton({ loggedInUser }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Nav>
                <NavItem>
                    <div className='profile-button' onClick={() => setOpen(!open)}>
                        <AccountCircleIcon className='navbar-icon' fontSize='large'/>
                        <span className='profile-icon'>{loggedInUser.firstName}</span>
                        <ArrowDropDownIcon className='navbar-icon'/>
                    </div>
                    {open && (
                        <DropdownMenu loggedInUser={loggedInUser} setOpen={setOpen}/>
                    )}
                </NavItem>
            </Nav>
        </>
    )
}