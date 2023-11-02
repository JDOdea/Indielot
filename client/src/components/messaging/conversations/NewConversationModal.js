import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect, useState } from "react";
import { Button, Input, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { fetchUsers } from "../../../managers/userManager";
import { createConversation, fetchConversationById } from '../../../managers/conversationManager';

export default function NewConversationModal({ loggedInUser, modal, setModal, setCurrentConversation }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [input, setInput] = useState("");

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
        let selected = structuredClone(selectedUsers);

        if (selected.find((su) => (su.id === u.id))) {
            selected = selected.filter((su) => (su.id !== u.id));
        } else {
            selected.push(u);
        }

        setSelectedUsers(selected);
        setInput("");
    }

    const handleMessage = () => {
        let userIds = selectedUsers.map((su) => (
            su.id
        ));

        userIds.push(loggedInUser.id);

        const newConversation = {
            userProfileIds: userIds
        }

        createConversation(newConversation).then((res) => {
            fetchConversationById(res.id).then(setCurrentConversation);
            toggle();
        })
    }

    useEffect(() => {
     fetchUsers().then((res) => {
        setUsers(res.filter((u) => u.id !== loggedInUser.id))
     });
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
                        {selectedUsers && (
                            selectedUsers.map((u) => (
                                <div 
                                    className='selectedChip'
                                    key={`${u.name}-selected`}>
                                        {u.name.substring(0, u.name.indexOf(" "))}
                                        <span className='closebtn' onClick={() => {handleUserSelect(u)}}>&times;</span>
                                </div>
                            ))
                        )}
                        <div className="newMessageToSearch">
                            <Input 
                                name="search"
                                type="search" 
                                placeholder="Search.."
                                value={input}
                                onChange={handleSearch}/>
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
                                        {
                                            selectedUsers.find((su) => su.id === u.id)
                                            ?
                                                <CheckCircleOutlineIcon 
                                                className='checkButton'
                                                onClick={() => {
                                                    handleUserSelect(u);
                                                }}/>
                                            :
                                                <RadioButtonUncheckedIcon 
                                                className='checkButton'
                                                onClick={() => {
                                                    handleUserSelect(u);
                                                }}/>
                                        }
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