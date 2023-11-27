import React from "react";
import "./CreatePageStyles.css";
import Header from "components/Header/Header";
import { useState, useContext} from "react";
import { UserContext } from "data/UserContext";
import { UnauthorizedPage } from "Pages/UnauthorizedPage/UnauthorizedPage";

export const SuccessMessage = ({message })=> {
    return (
        <div className="alert alert-success" role="alert">
           {message} 
        </div>
    )
}

export const ErrorMessage = ({message})=> {
    return (
        <div className="alert alert-danger" role="alert">
           {message} 
        </div>
    )
}

const CreatePage = (props) => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const { user } = useContext(UserContext);

    const allowedRoles = props.allowedRoles ? props.allowedRoles : [];

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(data));
        console.log('Create page data', jsonData)
        console.log('url', props.url)

        const url = props.url;
        fetch(url, {
            method: 'POST',
            body: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async response => {
                console.log(response.ok)
                if (!response.ok) {
                    const json = await response.json();
                    throw new Error('ERROR: ' + response.status + ' ' + json.message)
                }
                return response.json()
            })
            .then(data => {
                setStatus(data.message);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setStatus(null)
            })
    }
    const fields = props.fields ? props.fields : [];
    console.log(error, status)

    return allowedRoles.includes(user.role) ? (
        <>
            <Header></Header>
            <div className="create-container">
                <div className="title">
                    <h1 className="text">{props.title}</h1>
                </div>
                <form action="" method="post" onSubmit={handleSubmit} id="create-form">
                    {fields.map(field => {
                        return field.type !== 'select' ? (
                            <div className="form-group">
                                <label htmlFor={field.name}>{field.label}</label>
                                <input name={field.name} type={field.type ? field.type : 'text'} id={field.name} className="form-control" placeholder={field.label} required={field.required ? true : false} />
                            </div>
                        )
                            :
                            <div className="form-group">

                                <label htmlFor="">{field.name}</label>
                                <select className="form-select" aria-label="default select example" name={field.name}>
                                    <option value="" >{`Select ${field.name}`}</option>
                                    {field.options.map(option => {
                                        return <option value={option}>{option}</option>
                                    })}
                                </select>
                            </div>
                    })}
                    <button type="submit" className="create-user-button btn btn-success btn-lg">Create</button>
                </form>

                {error && <ErrorMessage message={error} />}
                {status &&  <SuccessMessage message={status} />}
            </div>

        </>
    ) : (
        <UnauthorizedPage />
    )
}

export default CreatePage;