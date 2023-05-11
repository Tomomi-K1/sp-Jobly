import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import UserContext from './UserContext';
import useLocalStorage from "../hooks/useLocalStorage";
import jwt from "jsonwebtoken";


/* context provider : 
      -holds current User information 
      -funtions: 
            login - make api call for login
            signup - make api call for register new user
            logout - remove currUser
      
*/ 
const ContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const initialState = null;
    const [currUser, setCurrUser] = useState(() => {
        let value;
        value =JSON.parse(
            window.localStorage.getItem('username')) || initialState;
        return value;
    });
    const [token, setToken] = useState(() => {
        let value;
        value =JSON.parse(
            window.localStorage.getItem('token')) || null
        return value;
    });
    

    useEffect(function loadUserInfo(){
        console.debug('ContextProvider useEffect to loadUserInfo', "token=", token)
        async function getUserInfo(){
            if(token){
                try{
                    let {username} = jwt.decode(token);
                    // need username to make API call to get a specific user's information
                    const user= await JoblyApi.getUser(username);
                    setCurrUser(user);
                    //JoblyApi will be removed when a page is refreshed.so reassign token here.
                    JoblyApi.token = token;
                } catch(e){
                    console.error("App loadUserInfo: problem loading",e);
                    setCurrUser(null);
                }
            }
        }
        
        // put token info in local storage
        // window.localStorage.setItem('token', JSON.stringify(token));
        // get username from localstorage to make API call to get user.
        // let user =JSON.parse(window.localStorage.getItem('username'));   
        getUserInfo();
        setIsLoading(false);
        console.log( `JoblyApi token:${JoblyApi.token}, currentUser:${currUser}, token:${token}`);
    }, [token])
  
    

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
        setToken(null);
        window.localStorage.clear();
        
    }
    const signup = async (data) => {
        const token=await JoblyApi.registerUser(data);
        JoblyApi.token = token;
        setToken(t => token);
        setCurrUser(user=> data.username )
    }

    const updateUserInfo = async (username, data) => {
        const user =await JoblyApi.updateUser(username, data);
        setCurrUser(u=>user);
    }

    const applyJob = async (username, jobId) =>{
        const appliedJobId = await JoblyApi.userApplyJob(username, jobId);
        console.log(`appliedjobId: ${appliedJobId}`);
        currUser.applications.push(appliedJobId);
        setCurrUser(user=>({
            ...currUser
        }))
    }

    if (isLoading) {
        return <p>Loading &hellip;</p>;
      //   I could create "<LoadingSpinner /> component "
      }
     
    return(
        <UserContext.Provider value={{currUser, login, logout, signup, updateUserInfo, applyJob}}>
            {children}
        </UserContext.Provider>
    ) 
}

export default ContextProvider;