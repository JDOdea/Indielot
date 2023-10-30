import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';
import { Modal } from 'reactstrap';
import NewConversationModal from './NewConversationModal';

export default function ConversationList({ loggedInUser }) {
    const [modal, setModal] = useState(false);

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
            </div>
            {modal && (
                <NewConversationModal modal={modal} setModal={setModal}/>
            )}
        </>
    )
}