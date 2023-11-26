import React from "react";
import './CreateUserPageStyles.css';
import Header from "components/Header/Header";
import CreatePage from "components/CreatePage/CreatePage";
import { HOST } from "config";

const CreateUserPage = () => {
    const url = `${HOST}/api/users/create-user`;
    const fields = [{
        name: 'login',
        label: 'Login',
        required: true
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true
    },
    {
        name: 'name',
        label: 'Name',
        required: true
    },
    {
        name: 'email',
        label: 'Email',
    },
    {
        name: 'birth_date',
        label: 'Birth date',
        type: 'date',
    },
    {
        name: 'address',
        label: 'Address',
    },
    {
        name: 'gender',
        label: 'gender',
        type: 'select',
        options: ['male', 'female']
    }
    ]

    const allowedRoles = ['admin'];
    return (
        <CreatePage fields={fields} url={url} allowedRoles={allowedRoles}></CreatePage>
    )
}

export default CreateUserPage;
