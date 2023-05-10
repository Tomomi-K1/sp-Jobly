import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import UserContext from './UserContext';
import './Home.css';

const Home = () => {
    const {currUser} = useContext(UserContext);
    const content = currUser?
                <div>
                    <h1>Hi {currUser.username}</h1>
                    <p>Search your future jobs here!</p>
                </div>:
                <div>
                    <p>All the jobs in one, convenient place.</p>
                    <Button color="secondary" className="mx-2"><Link to="/login">Login</Link></Button>
                    <Button color="secondary" className="mx-2"><Link to="/Signup">Signup</Link></Button>
                </div>
    return(
        <div>
            <h1>Welcome to Jobly!</h1>
            {content}
        </div>
    ) 
}

export default Home;