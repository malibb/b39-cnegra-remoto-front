import React from 'react';
import Navbar from './Navbar';
import Header from './Header';

function Layout({ head, subheading, children, cover}) {
    return(
        <>
        <Navbar></Navbar>
        <Header title={head} subheading={subheading} cover={cover}></Header>
        {children}
        </>
    );
};
export default Layout;
