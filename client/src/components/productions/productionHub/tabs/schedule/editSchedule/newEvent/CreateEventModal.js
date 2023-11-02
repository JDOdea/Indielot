import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import LocationSearchDropdown from './LocationSearchDropdown';
import { createEvent } from '../../../../../../../managers/calendarEventManager';
import { fetchProductionById } from '../../../../../../../managers/productionManager';

export default function CreateEventModal({ loggedInUser, production, setProduction }) {
    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [locationInput, setLocationInput] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [date, setDate] = useState(null);

    const toggle = () => {
        setModal(!modal);
    }

    const reset = () => {
        setTitle("");
        setDescription("");
        setLocationInput(null);
        setSelectedLocation(null);
        setDate(null);
    }

    const handleSaveButton = () => {
        const newEvent = {
            productionId: production.id,
            title,
            description,
            locationId: selectedLocation.id,
            startDate: date,
            endDate: date,
        }

        createEvent(newEvent).then(() => {
            fetchProductionById(production.id).then((res) => {
                setProduction(res);
            });

            toggle();
            reset();
        })
    }


    return (
        <div className='createBtnContainer'>
            <button className='newEventBtn' onClick={toggle}>
                <AddIcon />
                Create
            </button>
            <div>
                <Modal isOpen={modal} toggle={toggle} fade={false} centered backdrop={false} className='newEventModal'>
                    <div className='newEventHeader'>
                        <ModalHeader toggle={toggle}>
                            <span>New Event</span>
                        </ModalHeader>
                    </div>
                    <ModalBody>
                        <div className='newEventTitle'>
                            <Input 
                                name='title'
                                type='text'
                                placeholder='Add title'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                                />
                        </div>
                        <div className='newEventDateTime'>
                            <AccessTimeIcon />
                            <div className='newEventDateTimeInput'>
                                <Input 
                                    name='date'
                                    type='date'
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                    }}/>
                                <Input
                                    name='time'
                                    type='time'
                                    className='newEventTime'/>
                            </div>
                        </div>
                        <div className='newEventDescription'>
                            <Input 
                                name='description'
                                type='textarea'
                                placeholder='Add description'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                        <LocationSearchDropdown locationInput={locationInput} setLocationInput={setLocationInput} setSelectedLocation={setSelectedLocation} production={production} />
                        <Button className='saveBtn' onClick={handleSaveButton}>
                            Save
                        </Button>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}