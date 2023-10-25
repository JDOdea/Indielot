import {AdvancedImage} from '@cloudinary/react';
import { ListGroupItem, ListGroupItemText } from 'reactstrap';

export default function Asset({ asset }) {

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <ListGroupItem className='asset-card' style={{ display: "flex", justifyContent: "center" }}>
            <ListGroupItemText
                role='link'
                onClick={() => {
                    openInNewTab(`${asset.fileLocation}`)
                }}>
                {asset.assetName}
            </ListGroupItemText>
        </ListGroupItem>
    )
}