import React, { useContext } from "react"
import { ProductionContext } from "../../../../ApplicationViews"
import { Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

export default function ProductionCrewList({}) {

    const { production, setProduction } = useContext(ProductionContext);

    if (!production) return;
    return (
        <ListGroup>
            {production.crew.map((c) => (
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
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}