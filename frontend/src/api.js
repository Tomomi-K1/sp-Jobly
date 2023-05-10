import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /*get list of companies
   res={
	"companies": [
		{
			"handle": "anderson-arias-morrow",
			"name": "Anderson, Arias and Morrow",
			"description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
			"numEmployees": 245,
			"logoUrl": "/logos/logo3.png"
		},{ },{}...,
  ]
  */
  static async getCompanies(searchTerm){
    let res= await this.request(`companies`, searchTerm, "get");
    
    return res.companies;
  }

  /* get list of jobs.
   res = {
    jobs:[
      {"id":"xxx",
      "title": "Accommodation manager",
			"salary": 126000,
			"equity": null,
			"companyHandle": "mejia-scott-ryan",
			"companyName": "Mejia, Scott and Ryan"},
      {},...
      {id:"xxx",
      ...}
    ]
   } */
  static async getJobs(searchTerm){
    let res= await this.request(`jobs`, searchTerm, "get");
    return res.jobs;
  }

  /* update applied job list on user. returns applied jobId.
  ex. res={applied: jobId} */
  static async userApplyJob(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post" );
    return res.applied;
  }

  /* register new user =>returns token.
  // ex. res= {
  //   "token": "XXXXXXXX"
   } */

  static async registerUser(data){
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /*log in user
    ex. res= {"token": "XXXXXXXX"} 
    */
  static async loginUser(username, password){
    let res = await this.request(`auth/token`, {username, password}, "post");
    return res.token;
  }

  /* get user info*/
  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /* update user info */
  static async updateUser(username, data){
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
    
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;