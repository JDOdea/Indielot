import "./messaging.css";
import ConversationList from "./conversations/ConversationList";
import Conversation from "./conversations/Conversation";
import { useState } from "react";

export default function Inbox({ loggedInUser }) {
    const [currentConversation, setCurrentConversation] = useState(null);

    return (
        <div className="pageContainer">
            <div className="inboxContainer">
                <div className="conversationListContainer">
                    <ConversationList loggedInUser={loggedInUser} setCurrentConversation={setCurrentConversation}/>
                </div>
                <div className="conversationContainer">
                    <Conversation loggedInUser={loggedInUser} conversationObject={currentConversation}/>
                </div>
            </div>
        </div>
    )
}