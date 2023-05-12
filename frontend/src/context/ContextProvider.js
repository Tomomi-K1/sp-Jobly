import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import UserContext from './UserContext';
import useLocalStorage from "../hooks/useLocalStorage";
import { useJwt } from "react-jwt";
// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "token";

/* context provider : 
      -holds current User information 
      -funtions: 
            login - make api call for login
            signup - make api call for register new user
            logout - remove currUser
      
*/ 
const ContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currUser, setCurrUser] = useState(null);
    // created set to avoid duplicate jobId being added to users application property
    const [applicationIds, setApplicationIds] = useState(new Set([]));
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
    const { decodedToken } = useJwt(token);
    

    useEffect(function loadUserInfo(){
        console.debug('ContextProvider useEffect to loadUserInfo', "token=", token)
        async function getUserInfo(){
            if(token){
                try{
                    let {username} = decodedToken;
                    console.log(`decoded from token username: ${username}`)
                    // need username to make API call to get a specific user's information
                    const user= await JoblyApi.getUser(username);
                    setCurrUser(user);
                    setApplicationIds(new Set(user.applications))
                    //JoblyApi will be removed when a page is refreshed.so reassign token here.
                    JoblyApi.token = token;
                } catch(e){
                    console.error("App loadUserInfo: problem loading",e);
                    setCurrUser(null);
                }
            }
        }
        getUserInfo();
        setIsLoading(false);

    }, [token])
  
    /* LOGIN site-wide 
    * Make sure you await this function and check its return value!*/
    const login = async (data) => {
        try{
            const token= await JoblyApi.loginUser(data);
            setToken(token);
            console.log(token);
            return { success: true };
            // JoblyApi.token = token;        
            // setCurrUser(user=> username)
            // when setToken runs, loadUserInfo runs so no need to put JoblyApi.token=token nor setCurrUser;
        }catch(errors){
            console.error("login failed", errors);
            return {success: false, errors};
        }
    }
    /* LOGOUT site-wide */
    const logout =() => {
        JoblyApi.token='';
        setCurrUser(null);
        // setToken to "null". This should trigger useLocalStorage hook to remove key since [item] is null.
        setToken(null);
    }

    /* SIGNUP sitewide signup */
    const signup = async (data) => {
        try{
            const token=await JoblyApi.registerUser(data);
            setToken(token);
            return { success: true};
        } catch(errors){
            console.error('signup failed', errors);
            return { success: false, errors};
        }
    }

    const updateUserInfo = async (username, data) => {
        const user =await JoblyApi.updateUser(username, data);
        setCurrUser(u=>user);
    }

    /*====Job Application related =====
    Has Applied? : checks if jobId is already in user's applications array.*/
    const hasApplied = (jobId) => {
        return applicationIds.has(jobId);
    }

    /*Apply to JOB: make API call and update user's info inside user object `application:[]` property*/
    const applyJob = async (jobId) =>{
        // if jobId already exists in user's applications array, do nothing.
        if(hasApplied(jobId)) return;
        await JoblyApi.userApplyJob(currUser.username, jobId);
        setApplicationIds(new Set([...applicationIds, jobId]))
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