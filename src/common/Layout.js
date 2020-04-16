import React from 'react';
import Navbar from './Navbar';
import Header from './Header';

function Layout({ head, subheading, children }) {
    return(
        <>
        <Navbar></Navbar>
        <Header title={head} subheading={subheading}></Header>
        {children}
        </>
    );
};
export default Layout;
