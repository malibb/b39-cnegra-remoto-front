import React ,  { useState }from 'react';
import authHOC from './../utils/authHOC';
import Layout from './../common/Layout';
import Input from './../common/Input';
import useForm from './../hooks/useForm';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const UPDATE_POST = gql`
    mutation updatePost($id: ID!, $data:PostUpdateInput!){
        updatePost(id:$id,data:$data){
            _id
        }
    }
`;

const ONE_POST=gql`
    query getOne($id:ID!){
    getPostById(id:$id){
      
      title
      content
      cover
    }
  }
`;

function Update({match, history}){
    const [ sendPost ] = useMutation(UPDATE_POST);
    const [ cover, setCover] = useState('');
    const [ coverPreview, setCoverPreview] = useState('');
    
    const query = useQuery(ONE_POST, {
        variables: {
            id: match.params.id
        }
    });

    const catchData = async (inputs) => {
        delete inputs.cover;
        const newData = cover ? {...inputs, cover } : {...inputs};
        const { data, errors} = await sendPost({variables: { data: newData, id: match.params.id }});
        if(data){
            history.push('/');
        }
        if(errors) alert('Error al actualizar tu post.');
    };

    const catchCover = event => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            setCover(file);
            setCoverPreview(reader.result);
        }

        reader.readAsDataURL(file);
    };
    
    const {
        inputs,
        handleInputChange,
        handleSubmit,
    } = useForm(catchData, query.data);
    if(query.loading) return <h2> Cargando...</h2>
    return(
        <Layout head="Modifica tu post." subheading="Comparte todo lo que gustes">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <Input
                                name="title"
                                label="Titulo"
                                type="text"
                                placeholder="Escribe el titulo del post."
                                value={inputs.title}
                                change={handleInputChange}
                            />
                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                <label>Contenido del post: </label>
                                <textarea 
                                name="content"
                                className="form-control" 
                                placeholder="Contenido" 
                                value={inputs.content}
                                onChange={handleInputChange}
                                cols="30"
                                rows="10"
                                />
                                <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <Input
                                name="cover"
                                label="Cover: "
                                type="file"
                                placeholder="Selecciona un archivo."
                                change={catchCover}
                            />{
                                query.data.getPostById.cover ? (<>
                                    <h4>Imagen previa</h4>
                                    <img src={query.data.getPostById.cover} alt="coverPrev" className="d-block w-50" />
                                </>)
                                : <></>
                            }
                            <img src={coverPreview} alt="cover" className="d-block w-50" />
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Actualizar Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default authHOC(Update);