import React from 'react'
import { Routes, Route } from "react-router-dom";
import AuthLogin from "../auth/AuthLogin";
import AuthSignUp from '../auth/AuthSignUp';
import PrivateRoute from './PrivateRoute';
import Profile from '../profile/Profile';
import Main from '../main/Main'
import Nav from '../global/Nav'

const Router = () => {
    return (
        <>
            <Routes>
                    <Route path="/" element={<Nav/>}>
                        <Route
                            path="/" element={
                                <PrivateRoute>
                                    <Main />
                                </PrivateRoute>
                            } />
                        <Route path="/profile" element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        } />
                    </Route>
                <Route path="/login" element={<AuthLogin />} />
                <Route path="/signup" element={<AuthSignUp />} />
            </Routes>
        </>
    )
}

export default Router
