import React, {useContext, useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";



const SignupForm = () => {
    const initialState ={
        username:"",
        password:"",
        firstName:"",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const {signup} = useContext(UserContext);
    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData =>({
            ...formData,
            [name]: value 
        })) 
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        try{   
            await signup(formData);
            setFormData(formdata=>initialState)
            history.push('/')
        } catch(e){
            alert(e);
            setIsLoading(false);
            setFormData(formdata=>initialState)
        }
    }
    
    if(isLoading){
        return(
            <div className="full-height">
                <h1>Loading...</h1>
            </div>
        ) 
    }
    return (
    
        <div className ='col-mid-6 col-lg-4 offset-md-3 offset-lg-4 full-height'>
            <h3>Signup</h3>
            <div className='card'>
                <div className='card-body'>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="username"> Username </Label>
                            <Input id="username" type="text" name="username" value={formData.username} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password"> Password </Label>
                            <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="firstName"> First Name </Label>
                            <Input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName"> Last Name  </Label>
                            <Input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email"> email </Label>
                            <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;