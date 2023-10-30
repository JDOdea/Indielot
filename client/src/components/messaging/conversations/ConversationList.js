import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from 'react';
import NewConversationModal from './NewConversationModal';
import { fetchConversationsByUserId } from '../../../managers/conversationManager';

export default function ConversationList({ loggedInUser, setCurrentConversation }) {
    const [conversations, setConversations] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchConversationsByUserId(loggedInUser.id).then(setConversations);
    }, []);

    if (!conversations) return;
    return (
        <>
            <div className='conversationList'>
                <div className='conversationListHeader'>
                    <span className='headerUserName'>{loggedInUser.userName}</span>
                    <AddCircleIcon 
                        className='newMessageIcon'
                        onClick={() => {
                            setModal(!modal);
                        }}
                    />
                </div>
                <div className='conversationListBody'>
                    {conversations.map((c) => (
                        <div key={`${c.id}`}>Conversation</div>
                    ))}
                </div>
            </div>
            {modal && (
                <NewConversationModal loggedInUser={loggedInUser} modal={modal} setModal={setModal} setCurrentConversation={setCurrentConversation}/>
            )}
        </>
    )
}