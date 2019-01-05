import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect } from 'react-redux';

class CRoute extends React.Component{
    getExtractedJson({ component,cprivate,crole,actions,auth, ...rest})
    {
        return rest;
    }

    render(){
        const rest=this.getExtractedJson(this.props);
        let isUserLoggedIn=false;
        if(this.props.auth.token && this.props.auth.token !=="")
            isUserLoggedIn = true;    

        const userCurrentRole=this.props.auth.role;
        const {component,cprivate,crole}=this.props;
        const Component=component;

        let redirect=undefined;
        
        if(isUserLoggedIn && rest.path==="/login")
        {
            redirect="/view";
        
        }
    else if(!isUserLoggedIn && cprivate )
    redirect="/login";
    
    else if(isUserLoggedIn && cprivate && crole && crole.filter((item)=>item===userCurrentRole).length===0)
        // console.log(crole);
        redirect="/unauthorized_access";    
        return(
            <Route
            {...rest}
            render={props=>(
                (redirect)?<Redirect to={{pathname:redirect,state:{from:props.location}}} />:<Component {...props} />
            )}
        />
    
    )
}
}
const mapStateToProps=(state) =>{
    const {auth}=state;
    return{
        auth:auth
    }
}

const mapDispatchToProps=dispatch=>({
    action:{
       
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(CRoute);
