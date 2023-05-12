import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import UserContext from './UserContext';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

/* context provider : 
      -holds current User information 
      -funtions: 
            login - make api call for login
            signup - make api call for register new user
            logout - remove currUser
      
*/ 
const ContextProvider = ({children}) => {
    const initialState = null;
    const [currUser, setCurrUser] = useState(() => {
        let value;
        value = localStorage.getItem('username') || initialState;
        return value;
    });
    const [token, setToken] = useState(() => {
        let value;
        value = localStorage.getItem('token') || null
        return value;
    });
    const [isLoading, setIsLoading] = useState(true);
    const [applications, setApplications] = useState();

    useEffect(() => {
        console.debug('useEffect in Context run after token change')
        // funtion to make API call to get userinfomation
        async function getUserInfo(currUser){
            try{
                const user= await JoblyApi.getUser(currUser);
                setApplications(new Set(user.applications));
                setCurrUser(currUser => user);                
            } catch(e){
                console.log(e);
            }
        }
        
        //JoblyApi will be removed when a page is refreshed.so reassign token here.
        JoblyApi.token = token;
        // put token info in local storage
        if(!localStorage.getItem('token')){
            localStorage.setItem('token', token);
        }
        // get username from localstorage to make API call to get user.
        let user =JSON.parse(localStorage.getItem('username')); 
        getUserInfo(user);
        setIsLoading(false);
        console.log( `JoblyApi token:${JoblyApi.token}, currentUser:${currUser}, token:${token}`);

    }, [token])
  
    if (isLoading) {
      return <p>Loading &hellip;</p>;
    }

    const login = async (username, password) => {
        const token= await JoblyApi.loginUser(username, password);
        window.localStorage.setItem('username', JSON.stringify(username));
        JoblyApi.token = token;
        setToken(t => token);
        setCurrUser(user=> username)
    }
    const logout =() => {
        JoblyApi.token='';
        setCurrUser(null);
        setToken(t=>"");
        window.localStorage.clear();
    }
    const signup = async (data) => {
        const token=await JoblyApi.registerUser(data);
        window.localStorage.setItem('username', JSON.stringify(data.username));
        JoblyApi.token = token;
        setToken(token);
        setCurrUser(data.username);
    }

    const updateUserInfo = async (username, data) => {
        const user =await JoblyApi.updateUser(username, data);
        user.applications = [...applications];
        setCurrUser(u=>user);
        alert('your profile is updated');
    }

    const applyJob = async (username, jobId) =>{
        const appliedJobId = await JoblyApi.userApplyJob(username, jobId);
        console.log(`appliedjobId: ${appliedJobId}`);
        currUser.applications.push(appliedJobId);
        setApplications(new Set([...applications, appliedJobId]));
        setCurrUser(user=>({
            ...currUser
        }))
    }
      
    return(
        <UserContext.Provider value={{currUser, login, logout, signup, updateUserInfo, applyJob}}>
            {children}
        </UserContext.Provider>
    ) 
}

export default ContextProvider;