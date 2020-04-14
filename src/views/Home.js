import React from 'react';
import Layout from './../common/Layout';
import PostPreview from './../components/PostPreview';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';


const ALL_POST=gql`
    query getPosts{
        getPosts{
            _id
            title
            author{
                first_name
                _id
            }
        }
    }
`;

function Home(){
    const { data, loading, error } = useQuery(ALL_POST);
    return(      
        <Layout head="MI BLOG FAVORITO: POSTEANDO" subheading="Crea una cuenta y empieza a postear">
            <main className="container">
                {
                    loading 
                    ? <h1>Cargando!</h1>
                    : (error 
                    ? <h1>Hubo un error {error}</h1>
                        : data.getPosts.map((post) => (
                            <PostPreview key={post._id} _id={post._id} title={post.title} author={post.author} />
                        ))
                    )
                }    
            </main>
        </Layout>
    );
};

export default Home;