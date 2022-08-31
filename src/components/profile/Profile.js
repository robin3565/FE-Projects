import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import MyFeed from './MyFeed';
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbService } from '../../firebase/config';
import Loader from '../global/Loader';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [myfeeds, setMyfeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getDatas = async () => {
    const postsRef = collection(dbService, "posts");
    const q = query(postsRef, where("username", "==", params.userId));
    const querySnapshot = await getDocs(q)
    const feed = [];
    querySnapshot.forEach(doc =>
      feed.push({
        id: doc.id,
        content: doc.data(),
      }))
    setMyfeeds([...myfeeds, ...feed])
    setLoading(false);
  }

  useEffect(() => {
    getDatas();
  }, [])

  useEffect(() => {
    setMyfeeds([]);
  }, [params])

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
                  {params?.userId}
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
                  <span>{myfeeds.length}</span>
                </li>
                <li>
                  <span>팔로워</span>
                  <span>0</span>
                </li>
                <li>
                  <span>팔로잉</span>
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
                loading ? (
                  <Loader />
                ) : (
                  myfeeds?.map((item, idx) => {
                    return <MyFeed
                      key={idx}
                      item={item} />
                  }
                  )
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
  margin: auto;  
  width: 100wh;

  .myfeed-imgs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    justify-content: space-between;
    width: 1000px;
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