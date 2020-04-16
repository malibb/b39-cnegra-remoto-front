import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import PostPreview from './PostPreview';

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
const ME=gql`
    query me{
        me{
            first_name
            last_name
            posts{
                _id
                title
                author{
                    first_name
                    _id
                }
            }
        }
    }
`;

function Feed({profile}){
    const { data, loading, error } = useQuery( profile ? ME : ALL_POST);
    return(      
        <main className="container">
            {
                loading 
                ? <h1>Cargando!</h1>
                : (error 
                ? <h1>Hubo un error {error}</h1>
                    : profile ? 
                    data.me.posts.map((post) => (
                        <PostPreview 
                        key={post._id} 
                        _id={post._id} 
                        title={post.title} 
                        author={post.author}
                        edit
                        remove/>
                    ))
                    : data.getPosts.map((post) => (
                        <PostPreview key={post._id} _id={post._id} title={post.title} author={post.author} />
                    ))
                )
            }    
        </main>
    );
};

export default Feed;