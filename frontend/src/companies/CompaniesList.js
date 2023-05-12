import React, {useState, useEffect, useContext} from "react";
import { Link, Redirect} from "react-router-dom";
import CompanyCard from './CompanyCard';
import JoblyApi from '../api/api'
import { Form, Row, Col, Label, Input, Button} from "reactstrap";
import './CompaniesList.css';
import UserContext from "../context/UserContext";

const CompaniesList =() => {
    const {currUser} = useContext(UserContext);
    const [companies, setCompanies] = useState(null);
    const initialState = { name : "" }
    const [searchTerm, setSearchTerm] = useState(initialState);
    
    useEffect(() => {
        console.log(`useEffect in CompaniesList ran`);
        
        async function getCompaniesList(){
            const resCompanies = await JoblyApi.getCompanies();
            setCompanies(c=>resCompanies);
        }
        
        getCompaniesList();
        
    }, [])

    if(!companies){
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
        let resCompanies =await JoblyApi.getCompanies(searchTerm);
        setCompanies(c=>resCompanies);

    }

    if(!currUser){
        alert('Please Login or Signup');
        return <Redirect to="/"/>
    } else{
        return (
            <div className="CompaniesList-container">
                <Form>
                    <Row className="justify-content-md-center align-items-center">
                        <Col md={9}>
                            <Label className="visually-hidden" for="searchTerm">
                                SearchItem
                            </Label>
                            <Input 
                                id="searchTerm" 
                                name="name" 
                                placeholder="Enter Search Term..."
                                value = {searchTerm.name} 
                                onChange={handleChange}>
                            </Input>
                        </Col>
                        <Col md={3}>
                            <Button onClick={handleSubmit}>Search by Company Name</Button>
                        </Col>
                    </Row>
                </Form> 
                <div>
                    {companies.map(c =>(
                    <Link to={`/companies/${c.handle}`} key={c.handle}>
                        <CompanyCard company={c} key={c.handle}/>
                    </Link>
                    )
                    )}
                </div>
            </div>
        )
    }
}

export default CompaniesList;