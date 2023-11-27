import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Router} from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage";

// users
import LoginPage from "./Pages/LoginPage/LoginPage";
import UsersPage from "./Pages/UserPage/UserPage";
import CreateUserPage from "./Pages/UserPage/CreateUserPage/CreateUserPage";
import TeacherPage from "./Pages/SubjectsPage/TeacherPage/TeacherPage"
import {UserPage } from "./Pages/UserPage/UserPage";
import { UserRolePage } from "Pages/UserPage/UserRolePage/UserRolePage";
import { GuaranteePage } from "Pages/SubjectsPage/GuaranteePage/GuaranteePage";

// subjects
import { SubjectPage } from "./Pages/SubjectsPage/SubjectsPage";
import MySubjectsPage from "Pages/SubjectsPage/MySubjectsPage/MySubjectsPage";
import SubjectsPage from "./Pages/SubjectsPage/SubjectsPage";
import CreateSubjectPage from "./Pages/SubjectsPage/CreateSubjectPage/CreateSubjectPage";

// rooms
import CreateRoomPage from "Pages/RoomPage/CreateRoomPage/CreateRoomPage";
import RoomsPage from "Pages/RoomPage/RoomPage";
import { RoomPage } from "Pages/RoomPage/RoomPage";


// activities
import  RequestPage from "Pages/SubjectsPage/RequestPage/RequestPage";
import MyRequestsPage from "Pages/SubjectsPage/MyRequestsPage/MyRequestsPage";

import { CreateActivityPage } from "Pages/ActivitiesPage/CreateActivityPage/CreateActivityPage";
import { UserContext } from "data/UserContext";
import { UnauthorizedPage } from "Pages/UnauthorizedPage/UnauthorizedPage";
import ActivitiesPage from "Pages/ActivitiesPage/ActivitiesPage/ActivitiesPage";

const routesRoleMap = {
    guest: ["/", "/login", "/subjects"],
    student: ["/", "/login", "/subjects", "/subjects/subject/:subject", "/subjects/my-subjects", "/subjects/request-page", "/subjects/my-requests"],
    scheduler: ["/", "/login", "/subjects", "/subjects/subject/:subject", "/subjects/my-subjects", "/subjects/request-page", "/subjects/my-requests", "/rooms", "/rooms/room/:room", "/activities/create-activity", "/activities"],
    teacher: ["/", "/login", "/subjects", "/subjects/subject/:subject", "/subjects/my-subjects", "/subjects/teacher-page", "/subjects/teacher-page/guarantee/:subject", "/subjects/request-page", "/subjects/my-requests"],
    admin: ["/", "/login", "/users", "/users/user/:login", "/users/create-user", "/users/change-user-role", "/subjects", "/subjects/create-subject", "/subjects/subject/:subject", "/subjects/my-subjects", "/subjects/teacher-page", "/subjects/teacher-page/guarantee/:subject", "/subjects/request-page", "/subjects/my-requests", "/rooms", "/rooms/create-room", "/rooms/room/:room", "/activities/create-activity", "/activities"]
}

const routeComponentMap = {
    "/": <HomePage />,
    "/login": <LoginPage />,
    "/users": <UsersPage />,
    "/users/user/:login": <UserPage />,
    "/users/create-user": <CreateUserPage />,
    "/users/change-user-role": <UserRolePage />,
    "/subjects": <SubjectsPage />,
    "/subjects/create-subject": <CreateSubjectPage />,
    "/subjects/subject/:subject": <SubjectPage />,
    "/subjects/my-subjects": <MySubjectsPage />,
    "/subjects/teacher-page": <TeacherPage />,
    "/subjects/teacher-page/guarantee/:subject": <GuaranteePage />,
    "/subjects/request-page": <RequestPage />,
    "/subjects/my-requests": <MyRequestsPage />,
    "/rooms": <RoomsPage />,
    "/rooms/create-room": <CreateRoomPage />,
    "/rooms/room/:room": <RoomPage />,
    "/activities/create-activity": <CreateActivityPage />,
    "/activities": <ActivitiesPage />,
}

const createRoutes = role => {
    return Object.keys(routeComponentMap).map(path => 
        <Route path={path} element={routesRoleMap[role].includes(path) ? routeComponentMap[path] : <UnauthorizedPage/>}></Route>
    )
}

const AppRouter = () => {
    const {user } = useContext(UserContext)
    const role = user.role;
    const routes = createRoutes(role);
    // const role = user.role;
    return (
        <BrowserRouter>
        <Routes>
        {routes}
   
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;