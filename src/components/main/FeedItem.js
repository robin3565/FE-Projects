import React from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import {
  IoPaperPlaneOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoAddCircleOutline
} from "react-icons/io5";

import { HiOutlineDotsHorizontal } from 'react-icons/hi';


const FeedItem = ({ item }) => {
  return (
    <FeedStyle>
      <FeedUserInfoStyles>
        <div
          id="user-info-wrapper">
          {item.photoUrl
            ? <div id="user-profile" />
            : <FaUserCircle id="user-profile" className='user-profile-null' />
          }
          <p>{item?.username}</p>
        </div>
        <HiOutlineDotsHorizontal
          className='user-profile-btn'/>
      </FeedUserInfoStyles>

      <FeedItemStyle>
        <img
          src={item.image}
          className="feed-img" />

        <div
          id="feed-info">
          <div
            className="feed-info-items">
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
          <p>UseID</p>
          <p>UserFeedContents</p>
        </div>
      </FeedItemStyle>
    </FeedStyle>
  )
}

export default FeedItem

const FeedUserInfoStyles = styled.div`
  height: 60px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;  
  justify-content: space-between;
  align-items: center;
  
  #user-info-wrapper {
    display: flex;  
    align-items: center;
  }

  .user-profile-btn {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    color: ##262626;
    cursor: pointer;
  }

  #user-profile {
    border: 1px solid #dbdbdb;
    border-radius: 10em;
    height: 30px;
    width: 30px;
    margin: 0 10px;
  }

  .user-profile-null {
      border-radius: 6em;
      margin-right: 10px;
      color: #DDDDDD;
      cursor: pointer;
  }
`



const FeedItemStyle = styled.div`
  display: flex;
  flex-direction: column;

    .feed-img {
      height: 50vh;
      max-height: 60vh;
    }

    #feed-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: white;
      padding: 10px;
    }

    .feed-info-items {
      display: flex;
      flex-direction: row;
      text-align: center;
    }


    .feed-btn {
      color: ##262626;
      width: 26px;
      height: 26px;
      cursor: pointer;
      margin-right: 10px;
    }

    .feed-btn:last-child {
      margin:0;
    }

    .feed-likes {
      margin: 0;
      padding-left: 10px;
    }
    
    .feed-content {
      margin: 0;
      display: flex;
      flex-direction: row;
      padding-left: 10px;
    }

    .feed-content p:first-child {
      margin-right: 10px;
    }

`

const FeedStyle = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  height: 75vh;
  max-height: 80vh;
  margin-bottom: 10px;
`


