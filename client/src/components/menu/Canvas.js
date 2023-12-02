import MenuIcon from '@mui/icons-material/Menu';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

export default function Canvas({ menu, setMenu }) {

    const toggle = () => setMenu(!menu);

    return (
        <>
            <div className='navbar-menu'>
                <MenuIcon 
                    className="navbar-icon" 
                    fontSize="large"
                    onClick={() => {
                        setMenu(true);
                    }}/>
                <span className='menu-text'>Menu</span>
            </div>
            <Offcanvas isOpen={menu} toggle={toggle}>
                {/* <OffcanvasHeader toggle={toggle}></OffcanvasHeader>
                <OffcanvasBody>
                    Test
                </OffcanvasBody> */}
            </Offcanvas>
        </>
    )
}