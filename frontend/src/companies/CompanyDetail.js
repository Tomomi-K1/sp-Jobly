import React, {useState, useEffect, useContext} from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from '../api/api'
import JobCard from "../jobs/JobCard";
import UserContext from "../context/UserContext";

const CompanyDetail = () => {
    const {currUser} = useContext(UserContext);
    const {companyName} = useParams();
    const [company, setCompany] = useState(null);

    
    useEffect(() => {
        console.log(`useEffect in CompanyDetail ran`);
        async function getCompanyInfo(){
            const resCompanies = await JoblyApi.getCompany(companyName);
            setCompany(c=>resCompanies);

        }    
        getCompanyInfo();
    }, [])

    if(!company){
        return <h1>Loading...</h1>
    }

    if(!currUser){
        alert('Please Login or Signup');
        return <Redirect to="/"/>
    } else{

        return (
            <div>
                <h3>{`${company.name}'s job list.`}</h3>
                <div>
                    {company.jobs.map(job =>(
                        <JobCard job={job} key={job.id}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default CompanyDetail;