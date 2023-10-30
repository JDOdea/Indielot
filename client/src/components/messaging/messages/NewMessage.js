import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";

export default function NewMessage({ loggedInUser, conversationObject }) {
    const [input, setInput] = useState("");
    const [recipientIds, setRecipientIds] = useState([]);

    const handleNewMessage = () => {
        const newMessage = {
            senderId: loggedInUser.id,
            recipientIds: conversationObject,

        };
    }

    useEffect(() => {
        if (conversationObject) {
            const recipientIds = conversationObject.userProfiles.map((r) => {
                
            })
            setRecipientIds(recipientIds);
        }
    }, [conversationObject]);

    if (!conversationObject) return;
    return (
        <div>
            <div className="newMessage">
                <div className="newMessageContent">
                    <div className="newMessageInput">
                        <div className="message">
                            <Input 
                            className="messageInput"
                            placeholder="Message..."
                            type="text"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}/>
                        </div>
                    </div>
                    {input !== "" && (
                        <Button 
                        className='sendBtn'
                        color='link'>
                            <SendIcon />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}