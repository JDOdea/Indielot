import "./messaging.css";
import ConversationList from "./conversations/ConversationList";

export default function Inbox({ loggedInUser }) {


    return (
        <div className="inboxContainer">
            <div className="conversationListContainer">
                <ConversationList loggedInUser={loggedInUser}/>
            </div>
            <div className="messageListContainer">

            </div>
        </div>
    )
}