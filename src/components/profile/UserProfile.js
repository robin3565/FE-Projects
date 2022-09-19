import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useAuthState } from '../../context/authContext';

const UserProfile = () => {
    const { state } = useAuthState();
    const [myfeeds, setMyfeeds] = useState([]);
    const params = useParams();
    
    return (
        <div
            className='profile__user'>
            <div
                className='user__img'>
                {state.photoUrl
                    ? <img
                        src={state.photoUrl}
                        className="profile-img" />
                    : <img
                        src='user-null.jpg'
                        className="profile-img profile-img-null" />}
            </div>
            <div
                className='profile__info'>
                <div
                    className='info__user'>
                    <p
                        className='info__username'>
                        {params?.userId}
                    </p>
                    <Link to="/accouts/edit"
                        className='info__btn--edit'>
                        프로필 편집
                    </Link>
                </div>
                <ul
                    className='info__feed'>
                    <li>
                        <span>게시물</span>
                        <span
                            className='info__feed--num'>
                            {myfeeds.length}
                        </span>
                    </li>
                    <li>
                        <span>팔로워</span>
                        <span
                            className='info__feed--num'>
                            0
                        </span>
                    </li>
                    <li>
                        <span>팔로잉</span>
                        <span
                            className='info__feed--num'>
                            0
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserProfile
