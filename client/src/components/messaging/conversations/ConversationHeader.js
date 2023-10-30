import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ConversationHeader({ conversationObject }) {


    if (!conversationObject) return;
    return (
        
        <div className="conversationHeader">
            <div className='headerUsers'>
                {conversationObject.userProfiles.map((r) => (
                    <div key={`${r.name}`} className='headerUser'>
                        <div className='headerPicture'><AccountCircleIcon/></div>
                        <div className='recipientNames'>{r.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}