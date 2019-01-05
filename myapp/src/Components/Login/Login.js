import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//import loginUser from '../../Action/action';
import * as authAction from '../../Action/action.js';

class Login extends Component {

  state={
    email:'',
    password:''
  }

  changeAction(e){    
    this.setState({
      [e.target.name]:e.target.value
    })
    console.log(this.state);
  };

  onLogin=(e)=>{
    e.preventDefault();
    this.props.action.auth.loginUser(this.state);
    console.log(this.props.auth.token);
  }

  render() {
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" placeholder="myemail@email.com" onChange={this.changeAction.bind(this)}/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Password</Label>
              <Input type="password" name="password" placeholder="********" onChange={this.changeAction.bind(this)}/>
            </FormGroup>
          </Col>
          <Button onClick={this.onLogin}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

//Passing the state(email,password) to loginUser method of action.js
//Binds reducer to props
const mapStateToProps=(state)=>{
  const { auth } =state;
  return {
    auth
  }
};

//dispatches action
const mapDispatchToProps = dispatch => ({
  action: {
      auth: bindActionCreators(authAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);