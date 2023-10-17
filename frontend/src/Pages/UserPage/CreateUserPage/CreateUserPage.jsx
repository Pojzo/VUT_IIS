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
                <form>
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" id="login" className="form-control" placeholder="Login" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" className="form-control" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Birth date">Birth date</label>
                        <input type="date" placeholder="Birth date" className="form-control"/>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="male-gender" id="" />
                        <label className="form-check-label">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="female-gender" id="" />
                        <label className="form-check-label">
                            Female
                        </label>
                    </div>
                </form>
                <button className="create-user-button btn btn-success btn-lg ">Create</button>
            </div>
        </>
    )
}

export default CreateUserPage;