import React, { useState } from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {
  IoPaperPlaneOutline,
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
  IoAddCircleOutline
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { updateDoc, doc } from 'firebase/firestore';
import { dbService } from '../../firebase/config';
import { useAuthState } from '../context/authContext'

const PostItem = ({ item }) => {
  const [post, setPost] = useState(item.data);
  const [newComment, setNewComment] = useState("")
  const { state } = useAuthState();
  const user = state.id
  let likes = [];
  let comments = [];

  const handleComment = async (e) => {
    e.preventDefault();
    comments = post.comments;
    comments.push({
      id: user,
      comment: newComment,
    });
    await updateDoc(doc(dbService, "posts", item.id), {
      "comments": comments,
    }).then(() => {
      setPost({ ...post, comments: comments })
    })
    setNewComment("");
  }

  const handleLikes = async () => {
    if (!post.likes.includes(user)) {
      likes = post.likes;
      likes.push(user)
      await updateDoc(doc(dbService, "posts", item.id), {
        "likes": likes,
      })
        .then(() => {
          setPost({ ...post, likes: likes })
        })
    } else {
      likes = post.likes;
      likes = likes.filter((item) => item !== user)
      await updateDoc(doc(dbService, "posts", item.id), {
        "likes": likes,
      })
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
          <div
            className="feed-user">
            {item.data.photoUrl
              ? <div className="post-user-img" />
              : <FaUserCircle
                className='post-user-null post-user-img' />
            }
            <p>{post.username}</p>
          </div>
          <HiOutlineDotsHorizontal
            className='post-user-btn' />
        </div>
        <img
          src={post.image}
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
              {post.likes
                ? (
                  <span>좋아요 {post.likes.length}개</span>
                )
                :
                (
                  <span>좋아요 0개</span>
                )}
            </p>

            <div
              className="feed-content">
              <p>
                <span
                  className='feed-user-id'>
                  {item?.data.username}
                </span>
                {item?.data.contents}</p>
            </div>
            {
              post.comments.length > 1 && (
                <p
                  className='feed-comments-all'>
                  댓글 {post.comments.length}개 모두 보기
                </p>
              )
            }
            <div
              className='feed-content feed-comment'>
              <p>
                <span
                  className='feed-user-id'>
                  {post.comments[post.comments.length - 1] && (
                  post.comments[post.comments.length - 1].id
                )}
                </span>
                {post.comments[post.comments.length - 1] && (
                  post.comments[post.comments.length - 1].comment
                )}</p>
            </div>
          </div>

          <form
            className='feed-comment-wrapper'
            onSubmit={handleComment}>
            <VscSmiley
              className='feed-btn' />
            <input
              className='feed-comment-input'
              placeholder='댓글 달기'
              type="text"
              value={newComment || ''}
              onChange={(e) => setNewComment(e.target.value)} />
            <input
              className='feed-comment-submit'
              type="submit"
              value="게시"/>
          </form>
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
    font-weight: 600;
  }
  
  .feed-user-id {
    font-weight: 700;
    padding-right: 7px;
  }

  .feed-content {
    display: flex;
    flex-direction: row;
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