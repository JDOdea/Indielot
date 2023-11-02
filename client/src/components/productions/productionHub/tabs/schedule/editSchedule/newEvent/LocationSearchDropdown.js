import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import { fetchLocationsByProductionId } from '../../../../../../../managers/locationManager';

export default function LocationSearchDropdown({ locationInput, setLocationInput, setSelectedLocation, production }) {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [results, setResults] = useState([]);
    const [dropdown, setDropdown] = useState(false);

    const dropdownStyle = {
        display: dropdown ? "block" : "none",
    };

    const handleLocationSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setLocationInput(query);

        const filteredResults = locations.filter((l) => {
            return l.address.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setFilteredLocations(filteredResults);
        setDropdown(filteredResults.length > 0);
    };

    const handleSelectResult = (result) => {
        setLocationInput(result.address);
        setSelectedLocation(result);
        setDropdown(false);
    };
    
    const clearInput = () => {
        setFilteredLocations([]);
        setLocationInput("");
    }

    useEffect(() => {
        fetchLocationsByProductionId(production.id).then(setLocations);
    }, []);

    if (!locations) return;
    return (
        <>
            <div className="newEventLocation">
                <LocationOnIcon/>
                <Input
                    name='location'
                    type='text'
                    placeholder='Add location'
                    value={locationInput}
                    onChange={(e) => {handleLocationSearch(e)}}
                    onBlur={() => setTimeout(() => setDropdown(false), 200)}
                />
                <div className='searchIcon'>
                    {locationInput === "" ? (
                        <SearchIcon/>
                        ) : (
                            <CloseIcon className='clearBtn' onClick={clearInput}/>
                        )}
                </div>
            </div>
            <div className='locationSearchResults' style={dropdownStyle}>
                {
                    dropdown && (
                        <ListGroup flush>
                            {filteredLocations.map((l) => (
                                    <ListGroupItem 
                                        className='searchItem' 
                                        key={l.name}
                                        onClick={() => handleSelectResult(l)}
                                    >
                                        <LocationOnIcon/>
                                        {l.address}
                                    </ListGroupItem>
                            ))}
                        </ListGroup>
                    )
                }
            </div>
        </>
    )
}