import React ,  { useState }from 'react';
import authHOC from './../utils/authHOC';
import Layout from './../common/Layout';
import Input from './../common/Input';
import useForm from './../hooks/useForm';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const CREATE_POST = gql`
    mutation createPost($data:PostCreateInput!){
        createPost(data:$data){
            _id
        }
    }
`;

function Create({history}){
    const [ sendPost ] = useMutation(CREATE_POST);
    const [ cover, setCover] = useState('');
    const [ coverPreview, setCoverPreview] = useState('');

    const catchData = async (inputs) => {
        const { data, errors} = await sendPost({variables: { data: {...inputs, cover }}});
        if(data){
            history.push('/');
        }
        if(errors) alert('Error al crear tu post.');
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
    } = useForm(catchData);

    return(
        <Layout head="Crea tu post." subheading="Comparte todo lo que gustes">
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
                                required={true}
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
                                required={true}
                            />
                            <img src={coverPreview} alt="cover" className="d-block w-50" />
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default authHOC(Create);