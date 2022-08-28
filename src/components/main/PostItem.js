import React from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {
  IoPaperPlaneOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoAddCircleOutline
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";



const PostItem = ({ item }) => {
  return (
    <FeedStyle>
      <div
        className='feed-wrapper'>
        <div
          className='feed-user-wrapper'>
          <div
            className="feed-user">
            {item.photoUrl
              ? <div className="post-user-img" />
              : <FaUserCircle
                className='post-user-null post-user-img' />
            }
            <p>{item?.username}</p>
          </div>
          <HiOutlineDotsHorizontal
            className='post-user-btn' />
        </div>
        <img
          src={item.image}
          className="feed-img" />

        <div
          className='feed-content-wrapper'>
          <div
            className='feed-content-top'>
            <div
              className="feed-btn-group">
              <div
                className="feed-btn-left">
                <IoHeartOutline
                  className='feed-btn' />
                <IoChatbubbleOutline
                  className='feed-btn' />
                <IoPaperPlaneOutline
                  className='feed-btn' />
              </div>
              <IoAddCircleOutline
                className='feed-btn' />
            </div>

            <p
              className='feed-likes'>
              좋아요 {item.likes}개
            </p>

            <div
              className="feed-content">
              <p>
                <span
                  className='feed-user-id'>
                  {item?.username}
                </span>
                8 3D Illustration Resources. follow for more ---- @creative__programmer like 📤 Share 🔖 Save</p>
            </div>
            <p
              className='feed-comments-all'>
              댓글 n개 모두 보기
            </p>
            <div
              className='feed-content'>
              <p>
                <span
                  className='feed-user-id'>
                  {item?.username}
                </span>
                8 3D Illustration Resources.</p>
            </div>
          </div>

          <div
            className='feed-comment'>
            <VscSmiley
              className='feed-btn' />
            <input
              className='feed-comment-input'
              placeholder='댓글 달기'
              type="text" />
          </div>
        </div>
      </div>
    </FeedStyle>
  )
}

export default PostItem


const FeedStyle = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  height: 80vh;
  max-height: 85vh;
  margin-bottom: 10px;
  background-color: white;

  .feed-wrapper {
    display: flex;
    flex-direction: column;
  }

  .feed-user-wrapper {
    height: 60px;
    border-bottom: 1px solid #dbdbdb;
    display: flex;  
    justify-content: space-between;
    align-items: center;
  }
  
  .feed-user {
    display: flex;  
    align-items: center;
  }

  .post-user-btn{
    margin-right: 15px;
    width: 20px;
    height: 20px;
    color: #262626;
    cursor: pointer;
  }

 .post-user-img {
    border: 1px solid #dbdbdb;
    border-radius: 10em;
    height: 30px;
    width: 30px;
    margin: 0 10px;
    cursor: pointer;
  }

  .post-user-null {
      color: #DDDDDD;
  }

  .feed-img {
    height: 50vh;
    max-height: 60vh;
  }

  .feed-content-top {
    padding: 10px;
  }

  .feed-content {
    margin: 5px 0;
  }

  .feed-comments-all {
    color: #9b9b9b;
    font-weight: 500;
  }

  .feed-btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
  }

  .feed-btn-left {
    display: flex;
    flex-direction: row;
    text-align: center;
  }

  .feed-btn {
    color: #262626;
    width: 26px;
    height: 26px;
    cursor: pointer;
    margin-right: 10px;
  }


  .feed-likes {
    margin-top: 10px;
  }
  
  .feed-user-id {
    font-weight: 700;
    padding-right: 7px;
  }

  .feed-content {
    display: flex;
    flex-direction: row;
  }

  .feed-comment {
    border-top: 1px solid #dbdbdb;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 10px;
  }

  .feed-comment-input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
  }
`