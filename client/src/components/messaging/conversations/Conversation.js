import MessageList from "../messages/MessageList";
import NewMessage from "../messages/NewMessage";
import ConversationHeader from "./ConversationHeader";

export default function Conversation({ loggedInUser, conversationObject }) {

    return (
        <>
            {conversationObject && (
                <div>
                    <div className="conversationHeaderContainer">
                        <ConversationHeader conversationObject={conversationObject}/>
                    </div>
                    <div className="MessageListContainer">
                        <MessageList />
                    </div>
                    <div>
                        <NewMessage loggedInUser={loggedInUser} conversationObject={conversationObject}/>
                    </div>
                </div>
            )}
        </>
    )
}