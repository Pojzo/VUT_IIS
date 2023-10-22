import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import {UserPage } from "./Pages/UserPage/UserPage";
import UsersPage from "./Pages/UserPage/UserPage";
import CreateUserPage from "./Pages/UserPage/CreateUserPage/CreateUserPage";

const AppRouter = () => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users/user/:login" element={<UserPage/>}></Route>
            <Route path="/users/create-user/" element={<CreateUserPage/>}></Route>
            <Route path="/users" element={<UsersPage/>}></Route>

        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;