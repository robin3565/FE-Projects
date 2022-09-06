import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbService } from '../../firebase/config';
import Loader from '../global/Loader';
import { Link, useParams } from 'react-router-dom';
import MyFeedItem from './MyFeedItem';
import { RiSettings4Fill } from "react-icons/ri";
import { BsCamera } from "react-icons/bs";
import { usePostState } from '../../context/postContext';
import { useAuthState } from '../../context/authContext';

const Profile = () => {
  const { state } = useAuthState();
  const { postDispatch } = usePostState();
  const [myfeeds, setMyfeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const onToggle = () => {
    postDispatch({ type: "POP_MODAL", uploadPage: 1 });
    document.body.style.overflow = "hidden";
  }

  const getDatas = useCallback(async () => {
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
  })

  useEffect(() => {
    getDatas();
  }, [])

  return (
    <>
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
                  <RiSettings4Fill
                    className='info__btn--set' />
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
              className='profile__myfeed'>
              <div
                className='myfeed'>
                {
                  loading ? (
                    <Loader />
                  ) : myfeeds.length === 0 ? (
                    <div
                      className='myfeed__null'>
                      <div
                        className='myfeed__null--inner'>
                        <BsCamera
                          className='myfeed__btn' />
                        <p
                          className='myfeed__title'>
                          사진 공유
                        </p>
                        <p
                          className='myfeed__subtitle'>
                          사진을 공유하면 회원님의 프로필에 표시됩니다.
                        </p>
                        <p
                          onClick={onToggle}
                          className='myfeed__file'>
                          첫 사진 공유하기
                        </p>
                      </div>
                    </div>
                  ) : (
                    myfeeds?.map((item, idx) => {
                      return <MyFeedItem
                        key={idx}
                        item={item} />
                    })
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </ProfileStyle>
    </>
  )
}

export default Profile

const ProfileStyle = styled.section`
  width: 100wh;
  margin: auto;
  
  .profile {
    width: 980px;
    padding: 30px;
    display: flex;
    flex-direction: column;
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

  .profile__myfeed {
    width: 100%;
  }

  .myfeed {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    justify-content: space-between;
    width: 100%;
  }
  
  .myfeed__null {
    width: 100%;
    margin: auto;
  }

  .myfeed__null--inner {
    margin: auto;
    width: 48%;
    text-align: center;
  }

  .myfeed__btn {
    height: 80px;
    width: 80px;
    padding-top: 70px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .myfeed__title {
    font-size: 2em;
    font-weight: 100;
    margin-bottom: 10px;
  }

  .myfeed__subtitle {
    margin-bottom: 10px;
  }

  .myfeed__file {
    color: #0095f6;
    font-weight: 900;
    cursor: pointer;
  }

`