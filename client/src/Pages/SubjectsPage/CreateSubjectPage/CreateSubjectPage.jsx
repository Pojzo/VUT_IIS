import React from "react";
import './CreateSubjectPageStyles.css';
import CreatePage from "components/CreatePage/CreatePage";
import { HOST } from "config";

const CreateSubjectPage = () => {
    const fields = [
        {
            name: 'SUBJECT_CODE',
            label: 'Code',
            required: true
        },
        {
            name: 'name',
            label: 'Name',
            required: true
        },
        {
            name: 'credits',
            label: 'Credits',
            required: true
        },
        {
            name: 'guarantee_login',
            label: 'Guarantee',
            required: true
        }
    ]

    const url = `${HOST}/api/subjects/create-subject`
    const allowedRoles = ['admin'];
    return (
        <CreatePage fields={fields} url={url} allowedRoles={allowedRoles}></CreatePage>
    )
}

export default CreateSubjectPage;