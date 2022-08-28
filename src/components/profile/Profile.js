import React from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { useAuthState } from '../context/authContext';
import MyFeed from './MyFeed';

const Profile = () => {
  const { state } = useAuthState();
  console.log()
  return (
    <>
      <ProfileStyle>
        <div
          className='profile-wrapper'>
          <div
            className='profile-img-wrapper'>
            <FaUserCircle
              className='profile-img profile-img-null' />
          </div>
          <div
            className='profile-info-wrapper'>
            <div
              className='profile-top'>
              <p
                className='profile-id'>
                {state?.id}
              </p>
              <button>
                프로필 편집
              </button>
              <button>
                icon
              </button>
            </div>
            <ul
              className='profile-bottom'>
              <li>
                <span>게시물</span>
                <span>0</span>
              </li>
              <li>
                <span>게시물</span>
                <span>0</span>
              </li>
              <li>
                <span>게시물</span>
                <span>0</span>
              </li>
            </ul>
          </div>
        </div>
      </ProfileStyle>
      <MyFeed />
    </>
  )
}

export default Profile

const ProfileStyle = styled.div`
  .profile-img-wrapper {
    flex-grow: 1;
  }

  .profile-img {
    height: 160px;
    width: 160px;
    cursor: pointer;
  }

  .profile-info-wrapper { 
    flex-grow: 3;
    display: flex;
    flex-direction: column;
  }
  
  .profile-top {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 45%;
    justify-content: space-between;
  }

  .profile-id {
    font-size: 2em;
    font-weight: 100;
  }

  .profile-img-null {
      color: #DDDDDD;
  }

  .profile-bottom {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    margin:0;
    padding-left: 0;
    width: 45%;
    justify-content: space-between;
  }

  .profile-bottom li span {
    margin-right: 3px;
  }
`