import React, { useContext, useEffect, useState } from "react"
import { ProductionContext } from "../../../../ApplicationViews"
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { fetchCrewMembersByProductionId } from "../../../../../managers/crewManager";

export default function ProductionCrewList({ loggedInUser }) {
    const [productionCrew, setProductionCrew] = useState([]);

    const { production, setProduction } = useContext(ProductionContext);

    const getProductionCrew = () => {
        fetchCrewMembersByProductionId(production.id).then(setProductionCrew);
    }

    useEffect(() => {
        getProductionCrew();
    }, []);

    useEffect(() => {
        getProductionCrew();
    }, [production]);

    if (!production || !productionCrew) return;
    return (
        <ListGroup>
            {productionCrew.map((c) => (
                <ListGroupItem
                    style={{ display: "flex", justifyContent: "space-between"}}
                    key={`${c.name}`}
                >
                    <div>
                        {c.name} 
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between"}}>
                        {c.roles.map((r) => (
                            <div
                                style={{ marginLeft: "25px"}}
                                key={`${c.name}-${r}`}>
                                {r} 
                            </div>
                        ))}
                    </div>
                    {
                        /* production.productionLead === loggedInUser.fullName  */
                    }
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}