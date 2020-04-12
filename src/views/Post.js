import React from 'react';
import {
    useParams
  } from "react-router-dom";
import Layout from './../common/Layout';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const ONE_POST=gql`
    query getOne($id:ID!){
  getPostById(id:$id){
    author{
      first_name
    }
    title
    content
    cover
  }
}
`;

function Post(){
    const { id } = useParams();

    const { data, loading, error } = useQuery(ONE_POST, {
        variables: { id },
      });
    
    if(loading) return <Layout>CARGANDO</Layout> 
    if(error) return <Layout head="Hubo un error, intenta de nuevo."/>
    return(
        <Layout head={data.getPostById.title} subheading={`Post hecho por ${data.getPostById.author.first_name}`}>
            {data.getPostById.content}
        </Layout>
    )
};

export default Post;