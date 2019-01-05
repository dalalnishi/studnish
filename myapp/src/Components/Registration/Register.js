import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../App.css';

import axios from 'axios';

export default class Register extends Component {

  state={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    course:'',
    address:'',
    gender:''
  };

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })  
  }

  handleSubmit(e){
    e.preventDefault();

    const data={
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email,
      password:this.state.password,
      course:this.state.course,
      address:this.state.address,
      gender:this.state.gender
    }
    console.log(data);

    axios.post('http://localhost:3002/user',data)
      .then(res=>{
        if(res.status===200){
          console.log('Inserted Successfully!!!');
        }
    }).catch(err=>{
        //console.log(err);
        alert('Form Submitted Successfully!!!');
    })
  }

  render() {
    return (
      <center>
      <Form className="App">
        <fieldset>
            <legend>Registration</legend>
        <FormGroup>
          <Label>First Name</Label>
          <Input type="text" name="firstname" placeholder="Enter First Name" onChange={this.handleChange.bind(this)}/>
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <Input type="text" name="lastname" placeholder="Enter Last Name" onChange={this.handleChange.bind(this)} />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="Enter Email-Id" onChange={this.handleChange.bind(this)} />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input type="password" name="password" placeholder="Enter Password" onChange={this.handleChange.bind(this)} />
        </FormGroup>

        <FormGroup>
          <Label>Select Bachelor Course</Label>
          <Input type="select" name="course" onChange={this.handleChange.bind(this)} > 
            <option>BCA</option>
            <option>BCOM</option>
            <option>BBA</option>
            <option>BSC.IT</option>
            <option>BA</option>
          </Input>
        </FormGroup>
    
        <FormGroup>
          <Label>Address</Label>
          <Input type="textarea" name="address" onChange={this.handleChange.bind(this)}/>
        </FormGroup>
        
        <FormGroup>          
            <Label>Gender</Label>
          <FormGroup check>
            <Label>
              <Input type="radio" name="gender" value="Male" onChange={this.handleChange.bind(this)}/>
                 Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label >
              <Input type="radio" name="gender" value="Female" onChange={this.handleChange.bind(this)}/>
                Female
            </Label>
          </FormGroup>          
        </FormGroup>

        <FormGroup>
          <Label>Upload Photo</Label>
          <Input type="file" name="file"/>
          <FormText color="muted">
            Select File
          </FormText>
        </FormGroup>
        
        <Button onClick={this.handleSubmit.bind(this)}>Register</Button>
        </fieldset>
      </Form>  
      </center>   
    );
  }
}