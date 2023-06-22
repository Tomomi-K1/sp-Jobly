import React, {useState, useEffect, useContext} from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from './api'
import JobCard from "./JobCard";
import UserContext from "./UserContext";
import Loader from "./Loader";

const CompanyDetail = () => {
    const {currUser} = useContext(UserContext);
    const {companyName} = useParams();
    const [company, setCompany] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        console.log(`useEffect in CompanyDetail ran`);
        async function getCompanyInfo(){
        const resCompanies = await JoblyApi.getCompany(companyName);
        setCompany(c=>resCompanies);
        setIsLoading(isLoading => !isLoading);
        }    
        getCompanyInfo();
    }, [])

    if(isLoading){
       return <Loader />
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