import React, {useContext, useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";


const LoginForm = () => {
    const initialState ={
        username:"",
        password:""
    }
    const [formData, setFormData] = useState(initialState);

    const {login} = useContext(UserContext);
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
            await login(formData.username, formData.password);
            setFormData(initialState);
            console.log(`login successful`)
            history.push('/');
        
        }catch(e){
            alert(e)
            setFormData(initialState);
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
            <Button onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default LoginForm;