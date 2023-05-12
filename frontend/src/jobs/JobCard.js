import React, {useContext} from "react";
import UserContext from '../context/UserContext';
import { Card, CardBody, CardTitle, CardText, Button} from "reactstrap";


const JobCard = ({job}) => {
    const {currUser, applyJob} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        applyJob(job.id)
    }

    return(
        <Card className="my-2 text-start">
        <CardBody>
        <CardTitle tag="h5">{job.title}</CardTitle>
        <CardText>Company : {job.companyName}</CardText>
        <CardText>Salary : {job.salary}</CardText>
        <CardText>Equity : {job.equity}</CardText>
        {currUser.applications.includes(job.id)?
            <Button className="btn btn-danger" disabled >Applied</Button>:
            <Button className="btn btn-danger" onClick={handleSubmit}>Apply</Button>
        } 
        </CardBody>
    </Card> 
    ) 
}

export default JobCard;