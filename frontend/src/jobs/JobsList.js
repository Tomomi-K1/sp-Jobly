import React, {useState, useEffect, useContext} from "react";
import JoblyApi from './api/api';
import { Redirect } from "react-router-dom";
import { Form, Row, Col, Label, Input, Button} from "reactstrap";
import JobCard from "./JobCard";
import UserContext from './UserContext';

const JobsList = () => {
    const {currUser} = useContext(UserContext);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const initialState = { title : "" }
    const [searchTerm, setSearchTerm] = useState(initialState);
    
    useEffect(() => {
        console.log(`useEffect in JobsList ran`);
        async function getJobsList(){
        const resCompanies = await JoblyApi.getJobs();
        setJobs(c=>resCompanies);
        setIsLoading(isLoading => !isLoading);
        }
        
        getJobsList();
        
    }, [])

    if(isLoading){
        return <h1>Loading...</h1>
    }

    const handleChange =(e) => {
        const {name, value} = e.target;
        setSearchTerm(searchTerm=>({
            ...searchTerm,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let resJobs =await JoblyApi.getJobs(searchTerm);
        setJobs(c=>resJobs);
    }

    if(!currUser){
        alert('Please Login or Signup');
        return <Redirect to="/"/>
    } else{

        return(
            <div>
            <Form>
                <Row>
                    <Col md={9} >
                        <Label className="visually-hidden" for="searchTerm">
                            SearchItem
                        </Label>
                        <Input 
                            id="searchTerm" 
                            name="title" 
                            placeholder="Enter Search Term..."
                            value = {searchTerm.title} 
                            onChange={handleChange}>
                        </Input>
                    </Col>
                    <Col md={3}>
                        <Button onClick={handleSubmit}>Search by Job Title</Button>
                    </Col>
                </Row>
            </Form> 
            <div className="JobsList-container">
                {jobs.map(j =>(<JobCard job={j} key={j.id}/>))}
            </div>
        </div>
        )
    } 
}

export default JobsList;