import React from 'react'
import { Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Profile from '../components/profile/Profile';
import Feed from '../components/main/Feed'
import Home from '../components/main/Home';
import Post from '../components/main/Post';
import AuthLogin from '../components/auth/AuthLogin'
import AuthSignUp from '../components/auth/AuthSignUp'
import Explore from '../components/main/Explore';

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
                        <Route path="/:userId" element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        } />
                        <Route path="/posts/:postId" element={
                            <PrivateRoute>
                                <Post />
                            </PrivateRoute>
                        } />
                        <Route
                            path="/explore" element={
                                <PrivateRoute>
                                    <Explore />
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
