import React from 'react';
import Layout from './../common/Layout';
import Input from './../common/Input';
import useForm from './../hooks/useForm';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const CREATE_AUTHOR = gql`
    mutation createAuthor($data:AuthorCreateInput!){
        createAuthor(data:$data){
            _id
        }
    }
`;

function Signup({history}){
    const [ sendSignup ] = useMutation(CREATE_AUTHOR);

    const catchData = async (inputs) => {
        if(inputs.password === inputs.confirm_password){
            delete inputs.confirm_password;
            const { data } = await sendSignup({variables:{data: {...inputs}} });
            if(data) {
                if(data.errors) console.log(data.errors);
                history.push('/login');
            };
        } else {
            alert('Tus contraseñas no coinciden');
        };
    };
    
    const {
        inputs,
        handleInputChange,
        handleSubmit,
    } = useForm(catchData);

    return(
        <Layout head="Registrate" subheading="Guarda tu contraseña en un lugar seguro">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <Input
                                name="first_name"
                                label="Nombre"
                                type="text"
                                placeholder="Escribe tu nombre"
                                value={inputs.first_name}
                                change={handleInputChange}
                                required={true}
                            />
                            <Input
                                name="last_name"
                                label="Apellidos"
                                type="text"
                                placeholder="Escribe tus apellidos"
                                value={inputs.last_name}
                                change={handleInputChange}
                                required={true}
                            />
                            <Input
                                name="email"
                                label="Email"
                                type="text"
                                placeholder="Escribe tu email"
                                value={inputs.email}
                                change={handleInputChange}
                                required={true}
                            />
                            <Input
                                name="password"
                                label="Contraseña"
                                type="password"
                                placeholder="Escribe tu contraseña"
                                value={inputs.password}
                                change={handleInputChange}
                                required={true}
                            />
                            <Input
                                name="confirm_password"
                                label="Reafirma Contraseña"
                                type="password"
                                placeholder="Reafirma tu contraseña"
                                value={inputs.confirm_password}
                                change={handleInputChange}
                                required={true}
                            />
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;