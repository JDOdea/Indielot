import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useContext, useEffect, useState } from "react";
import { ProductionContext } from "../../../../ApplicationViews";
import { fetchLocationsByProductionId } from "../../../../../managers/locationManager";
import { Card, CardGroup, CardText, CardTitle } from "reactstrap";
import EditLocationModal from './editLocations/EditLocationModal';

export default function ProductionLocationList({ loggedInUser }) {
    const [productionLocations, setProductionLocations] = useState([]);
    const [editLocation, setEditLocation] = useState(false);

    const { production, setProduction } = useContext(ProductionContext);

    const getProductionLocations = () => {
        fetchLocationsByProductionId(production.id).then(setProductionLocations);
    };

    useEffect(() => {
        getProductionLocations();
    }, []);
    
    useEffect(() => {
        getProductionLocations();
    }, [production]);

    if (!production || !productionLocations) return;
    return (
        <>
            <CardGroup>
                {productionLocations.map((l) => (
                    <Card 
                        key={l.id}
                        style={{ display: "flex", alignItems: "center"}}
                    >
                        <CardTitle><b><u>{l.name}</u></b></CardTitle>
                        <CardText>{l.description}</CardText>
                        {
                            production.productionLead === loggedInUser.fullName && (
                                <>
                                    <ModeEditIcon 
                                        title=""
                                        style={{ marginLeft: "10px" }}
                                        className='hov'
                                        id="editLocation"
                                        onClick={() => {
                                            setEditLocation(true);
                                        }}
                                    />
                                    {editLocation && (
                                        <EditLocationModal location={l} editLocation={editLocation} setEditLocation={setEditLocation}/>
                                    )}
                                </>
                            )
                        }
                    </Card>
                ))}
            </CardGroup>
            {editLocation && (
                <></>
            )}
        </>
    )
}