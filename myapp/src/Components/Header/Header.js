import React from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import '../../App.css';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authAction from '../../Action/action.js';

class Header extends React.Component{
  
  logout(e){
    e.preventDefault();
    this.props.action.auth.logout();
  }

    render(){
        return (
          <div className="content">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="#">LaNetTeam</NavbarBrand>
          
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
            <NavLink tag={Link} to="/register">Register</NavLink>
            </NavItem>
            <NavItem>
            <NavLink tag={Link} to="/view">View</NavLink>

            </NavItem>  
            <NavItem>
              <button onClick={this.logout.bind(this)} className="btn btn-danger">Logout</button>
              </NavItem>   
                        </Nav>
                      </Collapse>
                    </Navbar>
        
      </div>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Header);