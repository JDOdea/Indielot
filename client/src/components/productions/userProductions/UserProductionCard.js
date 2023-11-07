import { useContext } from "react";
import { ProductionContext } from "../../views/ApplicationViews";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";

export default function UserProductionCard({ productionObject }) {

    const { production, setProduction } = useContext(ProductionContext);

    return (
        <ListGroupItem
            className="userProductionListItem"
            onClick={() => {
                setProduction(productionObject);
            }}
        >
            <div className="userProductionListItemContent">
                <ListGroupItemHeading>
                    <h6 className="userProductionListItemHeader">
                        <span className="productionLink" onClick={() => {
                            setProduction(productionObject);
                        }}>{productionObject.title}</span>
                    </h6>
                </ListGroupItemHeading>
                <ListGroupItemText>Lead by: {productionObject.productionLead}</ListGroupItemText>
            </div>
        </ListGroupItem>
    )
}