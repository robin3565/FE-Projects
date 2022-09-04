import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {
  IoPaperPlaneOutline,
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
  IoBookmarkOutline
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { useAuthState } from '../../context/authContext'
import { v4 as uuid } from 'uuid';
import { usePostState } from '../../context/postContext';
import EditModal from './EditModal';
import { EditModalPortal } from '../../app/Portal';

const FeedItem = ({ item }) => {
  const { state } = useAuthState();
  const { updateComment, updateLike } = usePostState();
  const [feeds, setFeeds] = useState(item.data);
  const [newComment, setNewComment] = useState("");
  const user = state.id;
  const photoUrl = state.photoUrl;
  const [isEditing, setEditing] = useState(false);

  let likes = [];
  let comments = [];
  let content = item.data.contents;

  const submitComment = async (e) => {
    e.preventDefault();
    if (newComment === "") return;

    comments = feeds.comments;
    comments.push({
      userId: user,
      photoUrl: photoUrl,
      comment: newComment,
      id: uuid(),
    });

    updateComment(comments, item.id)
      .then(() => {
        setFeeds({ ...feeds, comments: comments })
        setNewComment("");
      })
  }

  const handleModal = () => {
    document.body.style.overflow = "hidden";
    setEditing(prev => !prev);
  }

  const handleLikes = async () => {
    if (!feeds.likes.includes(user)) {
      likes = feeds.likes;
      likes.push(user)
      updateLike(likes, item.id)
        .then(() => {
          setFeeds({ ...feeds, likes: likes })
        })
    } else {
      likes = feeds.likes;
      likes = likes.filter((item) => item !== user)
      updateLike(likes, item.id)
        .then(() => {
          setFeeds({ ...feeds, likes: likes })
        })
    }
  }

  return (
    <>
      <FeedItemStyle>
        <div
          className='feed'>
          <div
            className='feed__user'>

            <StyledLink1 to={`/${feeds.username}`}>
              <div
                className="feed__user--info">
                {item.data.photoUrl
                  ? <div className="user--profile" />
                  : <img 
                    src='user-null.jpg'
                    className='user--profile-null user--profile' />
                }
                <p>{feeds.username}</p>
              </div>
            </StyledLink1>
            {feeds.username === user && (
              <HiOutlineDotsHorizontal
                className='feed__user--btn'
                onClick={handleModal} />
            )}
          </div>
          <div
            className='feed__item'>
            <img
              width={470}
              height={470}
              src={feeds.image}
              onDoubleClick={handleLikes}
              className="feed__item--img" />
          </div>

          <div
            className='feed__content'>
            <div
              className='feed__content--inner'>
              <div
                className="feed__content--icons">
                <div
                  className="content__icons--left">
                  {feeds.likes && feeds.likes.includes(user)
                    ? (
                      <IoHeart
                        onClick={handleLikes}
                        className='content__icon' />
                    )
                    : (
                      <IoHeartOutline
                        onClick={handleLikes}
                        className='content__icon' />
                    )}
                  <Link to={`/posts/${item.id}`}>
                    <IoChatbubbleOutline
                      className='content__icon' />
                  </Link>
                  <IoPaperPlaneOutline
                    className='content__icon' />
                </div>
                <IoBookmarkOutline
                  className='content__icon content__bookmark--icon' />
              </div>

              <div
                className='content__likes'>
                {feeds.likes
                  ?
                  (<p>좋아요 {feeds.likes.length}개</p>)
                  :
                  (<p>좋아요 0개</p>)}
              </div>

              <div
                className="content__item">
                <span
                  className='content__item--user'>
                  {item?.data.username}
                </span>
                {
                  content.length > 25 ? (
                    <>
                      <span>{content.substr(0, 90)}...</span>
                      <StyledLink1 to={`/posts/${item.id}`}>더 보기</StyledLink1>
                    </>
                  )
                    :
                    (
                      <span>{content}</span>
                    )
                }
              </div>
              {
                feeds.comments.length > 1 && (
                  <StyledLink2 to={`/posts/${item.id}`}>
                    댓글 {feeds.comments?.length}개 모두 보기
                  </StyledLink2>
                )
              }
              <div
                className='content__item--comment'>
                <form>
                  {feeds.comments[feeds.comments?.length - 1] && (
                    <>
                      <span
                        className='content__item--user'>{feeds.comments[feeds.comments?.length - 1].userId}</span>
                      <span>{feeds.comments[feeds.comments?.length - 1].comment}</span>
                    </>
                  )}
                </form>
              </div>
            </div>

            <form
              className='feed__comment--form'
              onSubmit={submitComment}>
              <VscSmiley
                className='content__icon' />
              <input
                className='feed__comment--input'
                placeholder='댓글 달기'
                type="text"
                value={newComment || ''}
                onChange={(e) => {
                  setNewComment(e.target.value)
                }} />
              <input
                className='feed__comment--submit'
                type="submit"
                value="게시" />
            </form>
          </div>
        </div>
      </FeedItemStyle>
    {
      isEditing && (
        <EditModalPortal>
          <EditModal
            modalType={"feed"}
            setEditing={setEditing}
            item={item.id}/>
        </EditModalPortal>
      )
    }
    </>
  )
}

export default FeedItem

const FeedItemStyle = styled.article`
  width: 100%;
  height: 750px;
  margin-bottom: 15px;

  .feed {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    flex-direction: column;
  }

  .feed__user {
    height: 55px;
    border-bottom: 1px solid #dbdbdb;
    display: flex;  
    justify-content: space-between;
    align-items: center;
  }
  
  .feed__user--info {
    display: flex;  
    align-items: center;
  }

  .feed__user--btn {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    color: #262626;
    cursor: pointer;
  }

  .feed__item {
    width: 470px;
    height: 470px;
  }

  .feed__item--img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .feed__content {
    width: 100%;
  }

  .feed__content--inner {
    padding: 10px;
    height: 160px;
  }

  .feed__content--icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .content__icons--left {
    display: flex;
    flex-direction: row;
    text-align: center;
  }
  
  .content__icon {
    color: #262626;
    width: 26px;
    height: 26px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .content__bookmark--icon {
    margin: 0;
  }

  .content__likes {
    margin-top: 10px;
    font-weight: 600;
  }

  .content__item {
    margin: 5px 0;
  }
  
  .content__item--user{
    font-weight: 700;
    padding-right: 7px;
  }

  .content__item--comment {
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .feed__comment--form {
    border-top: 1px solid #dbdbdb;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 10px;
  }

  .feed__comment--input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 1em;
  }

  .feed__comment--submit {
    border: none;
    background-color: transparent;
    font-size: 0.95em;
    font-weight: 600;
    color: #0095f6;
    cursor: pointer;
  }
`

const StyledLink1 = styled(Link)`
    text-decoration-line: none;
    color: #2d2d2d;
    font-weight: 600;
`

const StyledLink2 = styled(Link)`
    text-decoration-line: none;
    color: #9b9b9b;
    font-weight: 500;
`