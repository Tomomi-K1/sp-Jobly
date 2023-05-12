import React, {useContext, useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import UserContext from "../context/UserContext";
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
        try{   
            await signup(formData);
            setFormData(formdata=>initialState)
            history.push('/')
        } catch(e){
            alert(e);
            setFormData(formdata=>initialState)
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label htmlFor="username"> Username </Label>
                <Input id="username" type="text" name="username" value={formData.username} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password"> Password </Label>
                <Input id="password" type="text" name="password" value={formData.password} onChange={handleChange} />
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
            <Button onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default SignupForm;