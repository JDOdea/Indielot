import { 
    Button, 
    Card, 
    CardBody, 
    CardSubtitle, 
    CardText,
    CardTitle } from "reactstrap";

export default function ProductionCard({ production, setProductionDetailsId }) {
    return (
        <Card color="dark" outline style={{ marginBottom: "4px" }}>
            <CardBody>
                <CardTitle tag="h5">{production.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {production.description}
                </CardSubtitle>
                <CardText>Lead by: {production.productionLead}</CardText>
                <Button
                    color="dark"
                    onClick={() => {
                        setProductionDetailsId(production.id);
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        })
                    }}
                >
                    Show Details
                </Button>
            </CardBody>
        </Card>
    )
}