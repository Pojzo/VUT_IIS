import { useContext, useEffect, useState } from "react";
import './SpecificDataPageStyles.css';
import { UserContext } from "data/UserContext";
import { UnauthorizedPage } from "Pages/UnauthorizedPage/UnauthorizedPage";
import Header from "components/Header/Header";
import { useNavigate } from "react-router-dom";

const SpecificDataPage = (props) => {
    const url = props.url;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null); // TODO: show this message in a modal
    const [data, setData] = useState(null);
    const [changesMade, setChangesMade] = useState(false);

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext);

    const aliases = props.aliases ? props.aliases : props.fields;
    const protectedFields = props.protectedFields ? props.protectedFields : [];
    const dateFields = props.dateFields ? props.dateFields : [];
    const allowedRoles = props.allowedRoles ? props.allowedRoles : [];

    const onValueChanged = (event) => {
        setChangesMade(true);
        const id = event.target.id.split('-')[2];
        const newData = { ...data };
        newData[id] = event.target.value;
        setData(newData)
    }

    const deleteData = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete?');

        // Check if the user confirmed
        if (isConfirmed) {
            // Perform the delete action
            console.log('Deleting...');

            // Add your delete logic here
            console.log("url", url);
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    console.log(response.body);
                    setSubmitError(null);
                    setSubmitSuccess('Changes saved successfully!');
                    // curren url
                    const redirectUrl  = '/' + window.location.href.split('/')[3];
                    console.log('toto je redirect url', redirectUrl)
                    navigate(redirectUrl);

                    return response.json();
                })
                .catch(err => {
                    console.log(err, 'toto je error');
                    setSubmitError(err.message);
                    setSubmitSuccess(null);
                })
        } else {
            // User canceled the action
            console.log('Delete canceled.');
        }
    }

    const submitData = () => {
        // const data = {};
        // props.fields.forEach(field => {
        //     console.log('field', field)
        //     data[field] = document.getElementById(`${props.title}-specific-${field}`).innerText;
        // })
        // only send fields in fields
        const filteredData = {};
        for (const field of props.fields) {
            filteredData[field] = data[field];
        }
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(filteredData)
        })
            .then(async response => {
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || 'Something went wrong!');
                }
                return response.json();
            })
            .then(data => {
                setSubmitSuccess(data.message);
                console.log(data.message, 'toto je msg')
            })
            .catch (err => {
    console.log(err, 'toto je error');
    setSubmitError(err.message);
    setSubmitSuccess(null);
})
    }

const onSavedChanges = () => {
    submitData();
}

const fields = props.fields;
useEffect(() => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'

    })
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
}, [url])
if (loading) {
    return <p>Loading...</p>
}
if (error) {
    return <p>Error: {error.message}</p>
}
const btnClasses = `btn btn-info ${changesMade ? '' : 'disabled'}`;
console.log('rendeiring');
console.log(data);
return allowedRoles.includes(user.role) ? (
    <>
    <Header></Header>
    <div className="specific-page-container width-container">
        <h1>{props.title}</h1>
        <div className="specific-page-body">
            <div className="specific-table-keys">
                {aliases.map(alias => <p className="specific-table-cell">{alias}</p>)}
            </div>
            <div className="specific-table-values">
                {fields.map(field =>
                    <input
                        key={field}
                        type={dateFields.includes(field) ? 'date' : 'text'}
                        className="specific-table-cell" e
                        id={`${props.title}-specific-${field}`}
                        readOnly={protectedFields.includes(field)}
                        onChange={onValueChanged}
                        value={dateFields.includes(field) ? new Date(data[field]).toISOString().split('T')[0] : data[field]}
                    />)
                }

            </div>
        </div>
        <div className="specific-save-changes-container">
            <button onClick={() => onSavedChanges()} className={btnClasses}>SAVE CHANGES</button>
            <button className="btn btn-danger" onClick={deleteData} >DELETE</button>
        </div>
        {/* <div className="specific-delete-container">
                <button className="btn btn-danger">DELETE</button>
            </div> */}

        {submitError ? <p>Error: {submitError}</p> : null}
        {submitSuccess ? <p>{submitSuccess}</p> : null}
    </div>
    </>

): 
(
    <UnauthorizedPage/>
)
}

export default SpecificDataPage;
