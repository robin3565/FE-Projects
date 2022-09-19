import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { useAuthState } from '../../context/authContext';
import Myfeed from './Myfeed';
import Mysaved from './Mysaved';
import { IoAppsSharp, IoBookmark } from "react-icons/io5";


const Profile = () => {
  const { state } = useAuthState();
  const [myfeeds, setMyfeeds] = useState([]);
  const params = useParams();
  let location = useLocation();
  let activeStyle = {
    color: 'black'
  }
  
  if(params.userId === state.id) {
    return (
      <ProfileStyle>
        <div
          className='profile'>
          <div
            className='profile__inner'>
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
  
            <div
              className='profile__nav'>
                <Link
                  className='profile__navlink'
                  to={`/${params.userId}`}>
                  <div
                    className='profile__nav-item'>
                    <IoAppsSharp
                      className='profile__nav-icon' />
                    <span>게시물</span>
                  </div>
                </Link>
                
                <NavLink
                  className='profile__navlink'
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  to='saved'>
                  <div
                    className='profile__nav-item'>
                    <IoBookmark
                      className='profile__nav-icon'/>
                    <span>저장됨</span>
                  </div>
                  </NavLink>
              </div>
            </div>
        </div>
        {
          location.pathname === `/${params.userId}` ? (<Myfeed />) :
            location.pathname === `/${params.userId}/saved` && (<Mysaved />)
        }
      </ProfileStyle>
    )
  }
 
}

export default Profile

const ProfileStyle = styled.section`
  width: 100wh;
  display: flex;
  flex-direction: column;
  flex: 1;

  .profile {
    max-width: 980px;
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  .profile__nav {
    padding: 14px 0;
    display: flex;
    justify-content: center;
  }

  .profile__nav-item {
    padding: 0 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .profile__navlink {
    text-decoration: none;
    color: gray;
  }
  

  .profile__nav-icon {
    margin-right: 4px;
  }


  .profile__inner {
    width: 100%;
  }

  .profile__user {
    display: flex;
    flex-direction: row;
    padding: 0 20px 30px 50px;
    border-bottom: 1px solid #DDDDDD;
  }

  .user__img {
    flex-grow: 1;
    margin: auto;
  }

  .profile-img {
    height: 160px;
    width: 160px;
    border-radius: 70%;
    border: 1px solid #dbdbdb;
  }

  .profile-img-null {
    border: none;
  }

  .profile__info { 
    flex-grow: 3;
    display: flex;
    flex-direction: column;
  }
  
  .info__user {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 45%;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .info__username {
    font-size: 2em;
    font-weight: 100;
  }

  .info__btn--edit {
    font-size: 0.9em;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    padding: 6px 12px;
    background-color: transparent;
    font-weight: 600;
    text-decoration-line: none;
    color: black;
  }

  .info__btn--set {
    width: 30px;
    height: 30px;
  }

  .info__feed {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    width: 45%;
    justify-content: space-between;
  }

  .info__feed--num {
    font-weight: 600;
    margin-left: 3px;
  }

`