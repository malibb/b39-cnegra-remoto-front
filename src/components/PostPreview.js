import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
const DELETE_POST = gql`
  mutation deletePost($id:ID!){
  deletePost(id:$id)
}
`;
function PostPreview({_id, title, author, edit, remove}){
    const [deletePost] = useMutation(DELETE_POST);
    return(
        <>
        <div className="post-preview">
          <Link to={`post/${_id}`}>
            <h2 className="post-title">
            {title}
            </h2>
          </Link>
          <p className="post-meta">
            <Link to={`author/${author._id}`}>Posteado por :{author.first_name} </Link>
         </p>
         <p>
           {
             edit ?
             <Link to={`/update/${_id}`}>Editar</Link> : <></>
           }
           {
             remove ?
             <button className="btn btn-primary float-right"
             onClick={
               () => {
                 deletePost({variables: {id:_id}})
                  .then(()=>{
                    window.location.reload();
                  })
               }
             }>BORRAR</button> : <></>
           }
         </p>
        </div>
        </>
    );
};

export default PostPreview;