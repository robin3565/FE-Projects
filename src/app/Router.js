import { Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from '../components/main/Home'
import Post from '../components/main/Post';
import AuthLogin from '../components/auth/AuthLogin'
import AuthSignUp from '../components/auth/AuthSignUp'
import Explore from '../components/main/Explore';
import EditProfile from '../components/profile/EditProfile';
import Profile from '../components/profile/Profile';
import Header from '../components/main/Header';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/login/" element={<AuthLogin />} />
                <Route path="/signup/" element={<AuthSignUp />} />
                
                <Route path="/" element={
                    <PrivateRoute>
                        <Header />
                    </PrivateRoute>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/:userId/" element={<Profile />}>
                        <Route path="/:userId/saved" element={<Profile />}/>
                    </Route>
                    <Route path="/posts/:postId/" element={<Post />} />
                    <Route path="/explore/" element={<Explore />} />
                    <Route path="/accouts/edit/" element={<EditProfile />} />
                </Route>
            </Routes>
        </>
    )
}

export default Router
