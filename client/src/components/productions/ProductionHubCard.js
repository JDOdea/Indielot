import { Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import { ReactComponent as EmptyPoster } from "../../svgs/emptyPoster.svg"

export default function ProductionHubCard({ productionObject }) {

    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                <div style={{ display: "flex" }}>
                    <EmptyPoster style={{ width: "100px", height: "100px"}}/>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {productionObject.description}
                    </CardSubtitle>
                </div>
                <CardText>
                    <b>Director</b><br/>
                    <b>Writer</b>
                </CardText>
            </CardBody>
        </Card>
    )
}