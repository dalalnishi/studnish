import React, { Component } from 'react';
import './App.css';
import { Route,Switch } from "react-router-dom";

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import View from './Components/View/view';
import Register from './Components/Registration/Register';
import NotFound from './Components/PageNotFound/NotFound';
import CRoute from './Components/Custom-Route/custom-route';

class App extends Component {

  render() {
    return (  
      <div>
        <div>
        <Header />
      </div>
      <center>
      
      <Switch>
<CRoute exact path='/login' component={Login}></CRoute>
<CRoute exact path='/register' component={Register}></CRoute>
<CRoute exact cprivate path='/view' component={View}></CRoute>
<CRoute exact component={NotFound}></CRoute>
</Switch>       

      </center>             
      <br/>
      <div>
        <Footer />
      </div>
      </div>
    );
  }
}

export default App;
