import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { useAuthState } from '../context/authContext';
import MyFeed from './MyFeed';
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbService } from '../../firebase/config';

const Profile = () => {
  const { state } = useAuthState([]);
  const [myfeeds, setMyfeeds] = useState([]);

  const getDatas = async () => {
    const postsRef = collection(dbService, "posts");
    const q = query(postsRef, where("username", "==", state.id));
    const querySnapshot = await getDocs(q);
    const feed = [];
    querySnapshot.forEach(doc =>
      feed.push({
        id: doc.id,
        content: doc.data(),
      }))
    setMyfeeds([...myfeeds, ...feed])
  }

  useEffect(() => {
    getDatas();
  }, [])

  return (
    <>
      <ProfileStyle>
        <div
          className='profile-wrapper'>
          <div
            className='profile-user'>
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

          <div
            className='myfeed-wrapper'>
            <div
              className='myfeed-imgs'>
              {
                myfeeds?.map((item, idx) => {
                  return <MyFeed
                    key={idx}
                    item={item} />
                }
                )
              }
            </div>
          </div>
        </div>
      </ProfileStyle>
    </>
  )
}

export default Profile

const ProfileStyle = styled.div`
  .myfeed-imgs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    justify-content: space-between;
  }

  .myfeed-wrapper {
    width: 100%;
  }

  .profile-user {
    display: flex;
    flex-direction: row;
    padding-bottom: 30px;
    border-bottom: 1px solid #DDDDDD;
  }

  .profile-img-wrapper {
    flex-grow: 1;
    margin: auto;
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
    margin-bottom: 20px;
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
    width: 45%;
    justify-content: space-between;
  }

  .profile-bottom li span {
    margin-right: 3px;
  }
`