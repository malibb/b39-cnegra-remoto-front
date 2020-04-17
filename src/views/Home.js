import React from 'react';
import Layout from './../common/Layout';
import Feed from './../components/Feed';
import { useSubscription } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const POST_SUBSCRIPTION = gql`
  subscription postCreated{
    post{
        mutation
    }
  }
`;

function Home(){
    const { data, loading } = useSubscription( POST_SUBSCRIPTION);
    return(      
        <Layout head="MI BLOG FAVORITO: POSTEANDO" subheading="Crea una cuenta y empieza a postear">
            <h1>{loading ? '' : data.post.mutation ?
            (<button onClick={()=> window.location.reload()}> Ya hay nuevos posts!!!!!</button>) : <></>}  </h1>
            <Feed/>
        </Layout>
    );
};

export default Home;