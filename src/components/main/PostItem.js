import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
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

const PostItem = ({ item }) => {
  const { state } = useAuthState();
  const { updateComment, updateLike } = usePostState();
  const [post, setPost] = useState(item.data);
  const [newComment, setNewComment] = useState("");
  const user = state.id;
  const photoUrl = state.photoUrl;

  let likes = [];
  let comments = [];
  let content = item.data.contents;

  const submitComment = async (e) => {
    e.preventDefault();
    if (newComment === "") return;

    comments = post.comments;
    comments.push({
      userId: user,
      photoUrl: photoUrl,
      comment: newComment,
      id: uuid(),
    });

    updateComment(comments, item.id)
      .then(() => {
        setPost({ ...post, comments: comments })
        setNewComment("");
      })
  }

  const handleLikes = async () => {
    if (!post.likes.includes(user)) {
      likes = post.likes;
      likes.push(user)
      updateLike(likes, item.id)
        .then(() => {
          setPost({ ...post, likes: likes })
        })
    } else {
      likes = post.likes;
      likes = likes.filter((item) => item !== user)
      updateLike(likes, item.id)
        .then(() => {
          setPost({ ...post, likes: likes })
        })
    }
  }

  return (
    <FeedStyle>
      <div
        className='feed-wrapper'>
        <div
          className='feed-user-wrapper'>

          <StyledLink1 to={`/${user}`}>
            <div
              className="feed-user">
              {item.data.photoUrl
                ? <div className="post-user-img" />
                : <FaUserCircle
                  className='post-user-null post-user-img' />
              }
              <p>{post.username}</p>
            </div>
          </StyledLink1>
          <HiOutlineDotsHorizontal
            className='post-user-btn' />
        </div>
        <img
          src={post.image}
          onDoubleClick={handleLikes}
          className="feed-img" />

        <div
          className='feed-content-wrapper'>
          <div
            className='feed-content-top'>
            <div
              className="feed-btn-group">
              <div
                className="feed-btn-left">
                {post.likes && post.likes.includes(user)
                  ? (
                    <IoHeart
                      onClick={handleLikes}
                      className='feed-btn' />
                  )
                  : (
                    <IoHeartOutline
                      onClick={handleLikes}
                      className='feed-btn' />
                  )}
                <Link to={`/posts/${item.id}`}>
                  <IoChatbubbleOutline
                    className='feed-btn' />
                </Link>
                <IoPaperPlaneOutline
                  className='feed-btn' />
              </div>
              <IoBookmarkOutline
                className='feed-btn bookmark-btn' />
            </div>

            <p
              className='feed-likes'>
              {post.likes
                ?
                (<span>좋아요 {post.likes.length}개</span>)
                :
                (<span>좋아요 0개</span>)}
            </p>

            <div
              className="feed-content">
              <span
                className='feed-user-id'>
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
              post.comments.length > 1 && (
                <StyledLink2 to={`/posts/${item.id}`}>
                    댓글 {post.comments?.length}개 모두 보기
                </StyledLink2>
              )
            }
            <div
              className='feed-comment'>
              <form>
                {post.comments[post.comments?.length - 1] && (
                  <>
                    <span
                      className='feed-user-id'>{post.comments[post.comments?.length - 1].userId}</span>
                    <span>{post.comments[post.comments?.length - 1].comment}</span>
                  </>
                )}
              </form>
            </div>
          </div>

          <form
            className='feed-comment-wrapper'
            onSubmit={submitComment}>
            <VscSmiley
              className='feed-btn' />
            <input
              className='feed-comment-input'
              placeholder='댓글 달기'
              type="text"
              value={newComment || ''}
              onChange={(e) => {
                setNewComment(e.target.value)
              }} />
            <input
              className='feed-comment-submit'
              type="submit"
              value="게시" />
          </form>
        </div>
      </div>
    </FeedStyle>
  )
}

export default PostItem

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

const FeedStyle = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  height: 78vh;
  max-height: 85vh;
  margin-bottom: 10px;
  background-color: white;

  .feed-wrapper {
    display: flex;
    flex-direction: column;
  }

  .feed-user-wrapper {
    height: 55px;
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
  }

  .post-user-null {
      color: #DDDDDD;
  }

  .feed-img {
    width: 50wh;
    height: 50vh;
  }

  .feed-btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
  }
  
  .feed-btn {
    color: #262626;
    width: 26px;
    height: 26px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .feed-content-top {
    padding: 10px;
    height: 16vh;
  }

  .feed-content {
    margin: 5px 0;
  }

  .feed-comment {
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .feed-comment-btn {
    color: #bbb;
    cursor: pointer;
  }

  .feed-btn-left {
    display: flex;
    flex-direction: row;
    text-align: center;
  }

  .bookmark-btn {
    margin: 0;
  }

  .feed-likes {
    margin-top: 10px;
    font-weight: 600;
  }
  
  .feed-user-id {
    font-weight: 700;
    padding-right: 7px;
  }

  .feed-comment-wrapper {
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
    font-size: 1em;
  }

  .feed-comment-submit {
    border: none;
    background-color: transparent;
    font-size: 0.95em;
    font-weight: 600;
    color: #0095f6;
    cursor: pointer;
  }

`