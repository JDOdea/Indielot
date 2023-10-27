import MenuIcon from '@mui/icons-material/Menu';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

export default function Canvas({ menu, setMenu }) {

    const toggle = () => setMenu(!menu);

    return (
        <>
            <MenuIcon 
                className="navbar-icon" 
                fontSize="large"
                onClick={() => {
                    setMenu(true);
                }}/>
            <Offcanvas isOpen={menu} toggle={toggle}>
                {/* <OffcanvasHeader toggle={toggle}></OffcanvasHeader>
                <OffcanvasBody>
                    Test
                </OffcanvasBody> */}
            </Offcanvas>
        </>
    )
}