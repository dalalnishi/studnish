import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../Reducer/auth';

const composeEnhancer =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancer(
    applyMiddleware(thunk)
);        

const token = localStorage.getItem("token");

const INITIAL_STATE = {
    auth:{
        token: "",  
        role:"",
        error_msg:""
    }
}

if(token)
 INITIAL_STATE.auth.token = token;
export default createStore(rootReducer, INITIAL_STATE ,enhancer);
