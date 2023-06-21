import React, {useState, useContext} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import UserContext from "./UserContext";

const ProfileEditForm = () => {
    const {currUser, updateUserInfo} = useContext(UserContext);
    console.log(currUser);
    const [formData, setformData] = useState(()=>({
        ...currUser
    }))

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
        <div className ='col-mid-6 col-lg-4 offset-md-3 offset-lg-4 full-height'>
        <h3>Your Profile</h3>
        <div className='card'>
            <div className ='card-body'>
            <Form onSubmit={handleSubmit}>
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
            <Button>Submit</Button>
            </Form>
            </div>
        </div>
    </div>
    ) 
}

export default ProfileEditForm;