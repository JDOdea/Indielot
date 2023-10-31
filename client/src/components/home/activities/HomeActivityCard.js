import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

export default function HomeActivityCard({ activityObject }) {


    return (
        <Card color="dark" outline>
            <CardBody>
                <CardTitle tag="h5">
                    {activityObject.updatedBy.fullName} {activityObject.description}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    "{activityObject.production.title}"
                </CardSubtitle>
                {/* <CardText></CardText> */}
            </CardBody>
        </Card>
    )
}