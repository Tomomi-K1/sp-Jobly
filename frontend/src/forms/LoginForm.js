import React, {useContext, useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";


const LoginForm = () => {
    const initialState ={
        username:"",
        password:""
    }
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    const {login} = useContext(UserContext);
    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData =>({...formData, [name]: value })) 
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        let result= await login(formData);    
        setFormData(initialState);
        if(result.success){
            console.log(`login successful`)
            history.push('/');
        } else {
            // errors will come from login function created inside ContextProvider.
            // func:login =>return {success:false, errors}
            setFormErrors(result.errors)   
        } 
    }

    return (
        <Form onSubmit ={handleSubmit}>
            <FormGroup>
                <Label htmlFor="username"> Username </Label>
                <Input id="username" type="text" name="username" value={formData.username} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password"> Password </Label>
                <Input id="password" type="text" name="password" value={formData.password} onChange={handleChange} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}

export default LoginForm;