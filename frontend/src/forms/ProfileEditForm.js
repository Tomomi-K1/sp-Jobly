import React, {useState, useContext} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import UserContext from "../context/UserContext";

const ProfileEditForm = () => {
    const {currUser, updateUserInfo} = useContext(UserContext);
    const [formData, setformData] = useState({
        ...currUser
    })

    const handleChange =(e) => {
        const {name, value} = e.target;
        setformData(formData =>({
            ...formData, 
            [name]: value
        })) 
    }

    const handleSubmit = async (e) => {
         e.preventDefault();
         try {
            await updateUserInfo(formData.username, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            });
         } catch(e){
            alert(e);
         }
    }

    
    return(
        <Form>
        <h3>Your Profile</h3>
        <FormGroup>
            <Label htmlFor="username"> Username </Label>
            <Input id="username" type="text" name="username" value={formData.username} onChange={handleChange} disabled/>
        </FormGroup>
        <FormGroup>
            <Label htmlFor="firstName"> First Name </Label>
            <Input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="lastName"> Last Name </Label>
            <Input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="email"> Email </Label>
            <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormGroup>
        <Button onClick={handleSubmit}>Submit</Button>
    </Form>
    ) 
}

export default ProfileEditForm;

/* improvement I can make 
instead of repeating <FromGrup>, create an array to map to create each <FormGroup> as below. 

let array =[{id:"username", label:"Username", value:formData.username}, {id:"firstName", label:"First Name"}]
{array.map(item =>{
    return(
        <FormGroup>
        <Label htmlFor={item.id}>{item.label}</Label>
        <Input id={item.id} type="text" name={item.id} value={item.value} onChange={handleChange} disabled/>
        </FormGroup>   
    )
})}

*/
