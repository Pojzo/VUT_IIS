import React from "react";
import './CreateUserPageStyles.css';
import Header from "components/Header/Header";

const CreateUserPage = () => {
    return (
        <>
            <Header></Header>
            <div className="create-user-container">
                <div className="title">
                    <h1 className="text">Create user</h1>
                </div>
                    <form method="post" action="http://localhost:5000/users/create-user">
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input name="login" type="text" id="login" className="form-control" placeholder="Login" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" id="name" className="form-control" placeholder="Name"  required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="text" id="email" className="form-control" placeholder="Email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Birth date">Birth date</label>
                        <input type="date" placeholder="Birth date" className="form-control" required/>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="male-gender" id="" required/>
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="female-gender" id="" />
                        <label className="form-check-label">
                            Female
                        </label>
                    </div>
                <button type="submit" className="create-user-button btn btn-success btn-lg ">Create</button>
                </form>
            </div>
        </>
    )
}

export default CreateUserPage;