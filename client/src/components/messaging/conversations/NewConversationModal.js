import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect, useState } from "react";
import { Button, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { fetchUsers } from "../../../managers/userManager";

export default function NewConversationModal({ modal, setModal }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [input, setInput] = useState("");
    const [checked, setChecked] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setInput(query);

        const filteredResults = users.filter((u) => {
            return u.name.toLowerCase().includes(e.target.value.toLowerCase());
        })

        setFilteredUsers(filteredResults);
    }

    const handleUserSelect = (u) => {

    }

    const handleUserRemove = (e) => {

    }

    const handleMessage = () => {

    }

    useEffect(() => {
     fetchUsers().then(setUsers);
    }, []);

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} fade={false} centered>
                <div className="newMessageHeader">
                    <ModalHeader toggle={toggle}>
                        <span>New Message</span>
                    </ModalHeader>
                </div>
                <ModalBody>
                    <div className="newMessageTo">
                        <span><b>To:</b></span>
                        <div className="newMessageToSearch">
                            <Input 
                                name="search"
                                type="search" 
                                placeholder="Search.."
                                onChange={handleSearch}>

                            </Input>
                        </div>
                    </div>
                    <div className="hl"></div>
                    <div className="searchResults">
                        {
                            input !== ""
                            ?
                            <ListGroup flush>
                                {filteredUsers.map((u) => (
                                    <div className='searchItem' key={u.name}>
                                        <ListGroupItem>
                                            <AccountCircleIcon />
                                            <span>{u.name}</span>
                                        </ListGroupItem>
                                        <RadioButtonUncheckedIcon 
                                            className='checkButton'
                                            onClick={() => {
                                                handleUserSelect(u);
                                            }}/>
                                    </div>
                                ))}
                            </ListGroup>
                            :
                            <span className="noResults">No user found.</span>
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    {
                        selectedUsers.length !== 0
                        ?
                        <Button
                            block
                            onClick={handleMessage}
                        >
                            Message
                        </Button>
                        :
                        <Button 
                            block
                            outline
                            disabled
                        >
                            Message
                        </Button>
                    }
                </ModalFooter>
            </Modal>
        </div>
    )
}