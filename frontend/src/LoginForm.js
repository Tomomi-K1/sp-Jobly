import React, {useContext, useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";


const LoginForm = () => {
    const initialState ={
        username:"",
        password:""
    }
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        try{
            await login(formData.username, formData.password);
            setFormData(initialState);
            console.log(`login successful`)
            history.push('/');
        
        }catch(e){
            alert(e)
            setIsLoading(false);
            setFormData(initialState);
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
            <h3>Login</h3>
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
                        <Button>Submit</Button>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default LoginForm;