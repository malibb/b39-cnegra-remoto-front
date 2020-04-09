import React from 'react';
import { Link } from 'react-router-dom';

function PostPreview({_id, title, author}){
    return(
        <>
        <div className="post-preview">
          <Link to={`post/${_id}`}>
            <h2 className="post-title">
            {title}
            </h2>
          </Link>
          <p className="post-meta">Posted by
            <Link to="#">Posteado por :</Link>
         </p>
        </div>
        </>
    );
};

export default PostPreview;