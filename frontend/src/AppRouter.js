import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import UsersPage from "./Pages/UserPage/UserPage";
import CreateUserPage from "./Pages/UserPage/CreateUserPage/CreateUserPage";

const AppRouter = () => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage/>}></Route>
            <Route path="/users/create" element={<CreateUserPage/>}></Route>

        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;