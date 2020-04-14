import React from 'react';
import Layout from './../common/Layout';
import Feed from './../components/Feed';


function Home(){

    return(      
        <Layout head="MI BLOG FAVORITO: POSTEANDO" subheading="Crea una cuenta y empieza a postear">
            <Feed/>
        </Layout>
    );
};

export default Home;