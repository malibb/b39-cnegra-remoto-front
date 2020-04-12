import React from 'react';
import {
    useParams
  } from "react-router-dom";
import authenticate from './../utils/authenticate';



function Post(){
    const { id } = useParams();
    const { isAuthenticate} = authenticate();
    return(<>
        <h1>{id}</h1>
        {isAuthenticate
        ? <div>Con comments</div>
        : <></> }
    </>)
};

export default Post;