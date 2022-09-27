import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom';
import Myfeed from './Myfeed';
import { IoAppsSharp } from "react-icons/io5";
import { usePostState } from '../../context/postContext';
import { useAuthState } from '../../context/authContext';

const Profile = () => {
  const { getPostDataByUserId } = usePostState();
  const { getUserData } = useAuthState();
  const [loading, setLoading] = useState(true);
  const [myfeeds, setMyfeeds] = useState([]);
  const [userInfo, setUserInfo] = useState('');
  const [splitFeeds, setSplitFeeds] = useState([]);
  const state = JSON.parse(localStorage.getItem('userInfo'));
  const params = useParams();

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const getDatas = async () => {
    // userId에 해당하는 유저정보 가져오기
    await getUserData(params.userId)
      .then((data) => {
        setUserInfo(...data)
      })

    // userId에 해당하는 이미지 가져오기
    await getPostDataByUserId(params.userId)
      .then((feed) => {
        setMyfeeds([...feed]);
        const length = feed.length;
        let output = Math.floor(length % 3);
        const divide = Math.floor(length / 3) + (output > 0 ? 1 : 0);
        if (output > 0) {
          for (let i = 0; i <= output; i++) {
            feed.push(0);
          }
        }
        const newArray = [];
        for (let i = 0; i < divide; i++) {
          newArray.push(feed.splice(0, 3));
        }
        setSplitFeeds([...newArray]);
        setLoading(false);
      })
  }

  useEffect(() => {
    getDatas();
  }, [params.userId])

  return (
    <ProfileStyle>
      <div
        className='profile'>
        <div
          className='profile__inner'>

          {/* My Profile */}
          <div
            className='profile__user'>
            <div
              className='user__img'>
              <img
                src={userInfo.photoUrl ? userInfo.photoUrl : 'user-null.jpg'}
                className="profile-img" />
            </div>
            <div
              className='profile__info'>
              <div
                className='info__user'>
                <p
                  className='info__username'>
                  {params?.userId}
                </p>
                {
                  userInfo.id === state.id && (
                    <div
                      className='info__btn--group'>
                      <Link to="/accouts/edit"
                        className='info__btn--edit'>
                        프로필 편집
                      </Link>
                      <button
                        className='info__btn--edit'
                        onClick={handleLogOut}>
                        로그아웃
                      </button>
                    </div>
                  )
                }
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

          {/* My Nav */}
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
          </div>
        </div>
      </div>

      {/* My Feeds */}
      <div
        className="profile__feeds">
        <Myfeed
          loading={loading}
          myfeeds={myfeeds}
          splitFeeds={splitFeeds} />
      </div>
    </ProfileStyle>
  )
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
    color: var(--color-auth);
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
    border-bottom: 1px solid var(--color-border);
  }

  .user__img {
    flex-grow: 1;
    margin: auto;
  }

  .profile-img {
    height: 160px;
    width: 160px;
    border-radius: 70%;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
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
    width: 60%;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .info__username {
    font-size: 2em;
    font-weight: var(--fontWeight-thin);
  }

  .info__btn--group {
    display: flex;
  }

  .info__btn--edit {
    font-size: 0.9em;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    padding: 6px 12px;
    background-color: transparent;
    font-weight: var(--fontWeight-semibold);
    text-decoration-line: none;
    color: black;
    cursor: pointer;
    margin: 0 2px;
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

  .profile__feeds{
    margin: auto;
    width: 100%;
    max-width: 980px;
  }
`