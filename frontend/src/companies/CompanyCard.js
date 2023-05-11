import React from "react";
import { Card, CardBody, CardTitle, CardText} from "reactstrap";

const CompanyCard = ({company}) => {
    return(
        <Card className="my-2 text-start">
            <CardBody>
            <CardTitle tag="h5">{company.name}</CardTitle>
            <CardText>{company.description}</CardText>
            </CardBody>
        </Card>
    ) 
}

export default CompanyCard;