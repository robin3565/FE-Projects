import React from 'react'
import { Routes, Route } from "react-router-dom";
import AuthLogin from "../auth/AuthLogin";
import AuthSignUp from '../auth/AuthSignUp';
import PrivateRoute from './PrivateRoute';
import Profile from '../profile/Profile';
import Feed from '../main/Feed'
import Home from '../main/Home';

const Router = () => {
    return (
        <>
            <Routes>
                    <Route path="/" element={<Home/>}>
                        <Route
                            path="/" element={
                                <PrivateRoute>
                                    <Feed />
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
