import { useState, useEffect } from 'react';

function useForm(callback, current= {}){
    const [ inputs, setInputs] = useState(current);
    useEffect(() => {
        if (current.getPostById){
            delete current.getPostById.__typename
            setInputs({...current.getPostById})
        }
    }, [current]);

    const handleInputChange = event => {
        event.persist();
        const { name, value } = event.target;
        setInputs(fields =>({ ...fields, [name]: value}));
        /** 
         * {
         *  first_name : nombre
         * }
        */
    };

    const handleSubmit = event => {
        if (event) event.preventDefault();
        callback(inputs);
    };

    return {
        inputs,
        handleInputChange,
        handleSubmit,
    };
};

export default useForm;