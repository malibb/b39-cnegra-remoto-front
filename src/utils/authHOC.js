import React from 'react';
import { Redirect } from 'react-router-dom';
import authenticate from './authenticate';

export default function(WrappedComponent){
    const { isAuthenticate } = authenticate();
    return function(props){
        return isAuthenticate 
        ? <WrappedComponent {...props}/>
        : <Redirect to="/login"/>
    }
};