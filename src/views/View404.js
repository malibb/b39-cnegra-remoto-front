import React from 'react';
import { useLocation } from 'react-router-dom';

function View404(){
    const location = useLocation();
    return(
        <>
        <h1>404</h1>
        <h2>No existe la dirección {location.pathname} en el sitio. </h2>
        </>
    );
};

export default View404;