import React from 'react'
import { Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Feed from '../components/main/Feed'
import Post from '../components/main/Post';
import AuthLogin from '../components/auth/AuthLogin'
import AuthSignUp from '../components/auth/AuthSignUp'
import Explore from '../components/main/Explore';
import EditProfile from '../components/profile/EditProfile';
import Profile from '../components/profile/Profile';
import Home from '../components/main/Home';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>}>
                    <Route path="/" element={<Feed />} />
                    <Route path="/:userId/" element={<Profile />}>
                        <Route path="/:userId/saved" element={<Profile />}/>
                    </Route>
                    <Route path="/posts/:postId/" element={<Post />} />
                    <Route path="/explore/" element={<Explore />} />
                    <Route path="/accouts/edit/" element={<EditProfile />} />
                </Route>
                <Route path="/login/" element={<AuthLogin />} />
                <Route path="/signup/" element={<AuthSignUp />} />
            </Routes>
        </>
    )
}

export default Router
