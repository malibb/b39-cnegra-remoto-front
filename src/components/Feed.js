import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import PostPreview from './PostPreview';

const ALL_POST=gql`
    query getPosts{
        getPosts{
            _id
            title
            createdAt
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
    const [actualPost, setActualPost] = useState();
    const [index, setIndex] = useState(0);
    const { data, loading, error } = useQuery( profile ? ME : ALL_POST);
    useEffect(() => {
        if (data && index === 0){
           setActualPost(data.getPosts[index]);
           console.log('useEffect', data.getPosts[0], index, actualPost);
        }
        if(data && index <= data.getPosts.length) {
            setActualPost(data.getPosts[index]);
        }
    }, [actualPost, data, index]);

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
                        key={actualPost} 
                        _id={post._id} 
                        title={post.title} 
                        author={post.author}
                        edit
                        remove/>
                    ))
                    : /* data.getPosts.map((post) => ( */
                       actualPost ? 
                       <><PostPreview 
                        key={actualPost._id} 
                        _id={actualPost._id} 
                        title={actualPost.title} 
                        author={actualPost.author}
                        date={actualPost.createdAt} />
                        <button onClick={()=>{setIndex(index+1)}}>Next</button>
                        </>
                        :<>No hay post actual</>
                    /*))*/
                )
            }    
        </main>
    );
};

export default Feed;