import React from 'react';
import Layout from './../common/Layout';
import Input from './../common/Input';
import useForm from './../hooks/useForm';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const LOGIN = gql`
    mutation login($email: EmailAddress!,$password: String!){
        login(email:$email,password:$password){
            token
            message
        }
    }
`;

function Login({history}){
    const [ sendLogin ] = useMutation(LOGIN);

    const catchData = async (inputs) => {
        const { data, errors} = await sendLogin({variables: {...inputs}});
        if(data){
            const {login} = data;
            sessionStorage.setItem('blogToken', login.token);
            history.push('/');
        }
        if(errors) alert('Error on tu login');
    };
    
    const {
        inputs,
        handleInputChange,
        handleSubmit,
    } = useForm(catchData);

    return(
        <Layout head="Login" subheading="Guarda tu contraseña en un lugar seguro">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <form onSubmit={handleSubmit}>
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
                            <div class="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;