import React from 'react';
import Layout from './../common/Layout';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';



const ALL_POST=gql`
    query getPosts{
        getPosts{
            _id
            title
            content
        }
    }
`;

function Home(){
    const { data, loading, error } = useQuery(ALL_POST);
    if(loading) return <h1>¡Cargando!</h1>
    if(error) return <h1>Hubo un error, intenta recargando. :c</h1>
    return(      
        <Layout head="MI BLOG FAVORITO: POSTEANDO" subheading="Crea una cuenta y empieza a postear">
            <main className="container">
                {
                    data.getPosts.map((post) => (
                        <>
                        <h2 class="post-title"> {post._id} </h2>
                        <h2 class="post-title"> {post.title} </h2>
                        <h3 class="post-subtitle"> {post.content}</h3>
                        </>
                    ))
                }
            </main>
        </Layout>
    );
};

export default Home;