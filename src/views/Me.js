import React from 'react';
import authHOC from './../utils/authHOC';
import Layout from './../common/Layout';
import Feed from './../components/Feed';
import authenticate from './../utils/authenticate';

function Me(){
    const { payload} = authenticate();
    return(<Layout head={`Hola ${payload.first_name}`} subheading="Bienvenida a tu perfil">
            <Feed profile/>
        </Layout>)
};

export default authHOC(Me);