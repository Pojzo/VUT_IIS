import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";


const AppRouter = () => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;