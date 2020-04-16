import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../src/views/Home';
import Signup from '../src/views/Signup';
import Login from '../src/views/Login';
import Create from '../src/views/Create';
import Update from '../src/views/Update';
import Me from '../src/views/Me';
import Post from '../src/views/Post';
import View404 from './views/View404';

function Logout(){
  sessionStorage.removeItem('blogToken');
  console.log('Entre al logout');
  return <Redirect to="/"/>
}

function Routes() {
    return(
        <>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/me" component={Me}/>
          <Route exact path="/create" component={Create}/>
          <Route exact path="/update/:id" component={Update}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/post/:id" component={Post}/>
          
          <Route exact path="/logout" component={Logout}/>
          <Route path="/about">
            <Redirect to="/"/>
          </Route>
          <Route path="*" component={View404}/>
        </Switch>
        </>
    );
}


export default Routes;