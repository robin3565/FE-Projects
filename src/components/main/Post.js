import styled from 'styled-components'
import { IoClose } from "react-icons/io5";
import { useAuthState } from '../../context/authContext';
import { FaUserCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { dbService } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { BiHeart } from "react-icons/bi";
import {
    IoPaperPlaneOutline,
    IoHeartOutline,
    IoHeart,
    IoChatbubbleOutline,
    IoBookmarkOutline
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { usePostState } from '../../context/postContext';
import { v4 as uuid } from 'uuid';

const Post = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { state } = useAuthState();
    const { updateComment, updateLike } = usePostState();
    const [postComments, setPostComments] = useState([]);
    const [postImg, setPostImg] = useState("");
    const [postUserUrl, setUserUrl] = useState("");
    const [postUser, setUser] = useState("");
    const [postContent, setContent] = useState("");
    const [postLike, setPostLike] = useState("");
    const [post, setPost] = useState({});
    const [newComment, setNewComment] = useState("")
    const userId = state.id;
    const photoUrl = state.photoUrl;

    let comments = [];
    const submitComment = (e) => {
        e.preventDefault();
        if (newComment === "") return;

        comments = postComments;
        comments.push({
            userId: userId,
            photoUrl: photoUrl,
            comment: newComment,
            id: uuid(),
        });
        
        updateComment(comments, postId)
        .then(() => {
        setPost({ ...post, comments: comments })
        setNewComment("");
    })
    }

    const postRef = doc(dbService, "posts", postId);
    const getPostData = useCallback(async () => {
        const docSnap = await getDoc(postRef);
        const { comments, image, photoUrl, username, contents, likes } = docSnap.data();

        setPost(docSnap.data())
        setPostComments(comments);
        setPostImg(image);
        setUserUrl(photoUrl);
        setUser(username);
        setContent(contents);
        setPostLike(likes);
    });

    let likes = [];
    const handleLikes = async() => {
        if (!postLike.includes(userId)) {
            likes = postLike;
            likes.push(userId)
            updateLike(likes, postId)
            .then(() => {
              setPost({ ...post, likes: likes })
            })
          } else {
            likes = postLike;
            likes = likes.filter((item) => item !== userId)
            updateLike(likes, postId)
            .then(() => {
              setPost({ ...post, likes: likes })
            })
          }

    }

    const removeComment = useCallback(async (e) => {
        if (window.confirm("정말 삭제할까요?")) {
            const newPostComment = postComments.filter(item => (
                item.id !== e.target.id
            ));
            setPostComments(newPostComment);
            await updateDoc(postRef, {
                "comments": newPostComment,
            })
            alert("삭제 되었습니다.");
        } else { alert("취소 되었습니다."); }
    })

    useEffect(() => {
        getPostData();
    }, [])


    return (
        <ModalStyle>
            <IoClose
                className="btn-cancle"
                onClick={() => navigate(-1)} />
            <div
                className='post-wrapper'>
                <div
                    className="post-img-wrapper">
                    <div
                        className="post-img">
                        <img
                            className="uploaded-img"
                            src={postImg} />
                    </div>
                    <div
                        className="post-content-wrapper">
                        <div
                            className='post-content-top'>
                            <div
                                className='post-user-info'>
                                <FaUserCircle
                                    className='post-user-null post-user-img' />
                                <span
                                    className='post-user-id'>{postUser}</span>
                            </div>
                            <HiOutlineDotsHorizontal
                                className='post-btn' />
                        </div>
                        <div
                            className='post-content-bottom'>
                            <div
                                className='post-user-info'>
                                <FaUserCircle
                                    className='post-user-null post-user-img' />
                                <span
                                    className='post-user-id'>{postUser}</span>
                            </div>
                            <article
                                className='post-content'>
                                {postContent}
                            </article>
                            <ul
                                className='post-comments-wrapper'>
                                {
                                    postComments.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className='post-comment-item'>
                                            <div
                                                className='post-content-left'>
                                                <div>
                                                    <div
                                                        className='post-user-info'>
                                                        <FaUserCircle
                                                            className='post-user-null post-user-img' />
                                                        <span
                                                            className='post-user-id'>{item.userId}</span>
                                                    </div>
                                                </div>
                                                <p>
                                                    {item.comment}
                                                </p>
                                            </div>
                                            <div
                                                className='post-content-right'>
                                                {/* <BiHeart
                                                    className='content-btn' /> */}
                                                {
                                                    userId === item.userId && (
                                                        <>
                                                            <HiOutlineDotsHorizontal
                                                                id={item.id}
                                                                onClick={removeComment}
                                                                className='content-btn' />
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div
                            className='post-bottom'>
                            <div
                                className="post-btn-group">
                                <div>
                                    {postLike && postLike.includes(userId)
                                        ? (
                                            <IoHeart
                                                onClick={handleLikes}
                                                className='post-btn' />
                                        )
                                        : (
                                            <IoHeartOutline
                                                onClick={handleLikes}
                                                className='post-btn' />
                                        )}
                                    <IoChatbubbleOutline
                                        className='post-btn' />
                                    <IoPaperPlaneOutline
                                        className='post-btn' />
                                </div>
                                <IoBookmarkOutline
                                    className='post-btn bookmark-btn' />
                            </div>
                            <p
                                className='post-likes'>
                                {postLike
                                    ?
                                    (<span>좋아요 {postLike.length}개</span>)
                                    :
                                    (<span>좋아요 0개</span>)}
                            </p>
                        </div>
                        <form
                            className='post-comment-wrapper'
                            onSubmit={submitComment}>
                            <VscSmiley
                                className='post-btn' />
                            <input
                                className='post-comment-input'
                                placeholder='댓글 달기'
                                type="text"
                                value={newComment}
                                onChange={(e) => {
                                    setNewComment(e.target.value)
                                }} />
                            <input
                                className='post-comment-submit'
                                type="submit"
                                value="게시" />
                        </form>
                    </div>
                </div>
            </div>
        </ModalStyle>
    )
}

export default Post

const ModalStyle = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .btn-cancle {
        color: #fff;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
        cursor: pointer;
    }

    .post-wrapper {
      width: 1400px;
      height: 840px;
      background-color: white;
      border-radius: 10px;
    }

    .post-img {
        width: 840px;
        height: 840px;
    }

    .post-img-wrapper {
        width: 100%;
        display: flex;
    }

    .btn-submit {
        margin-right: 10px;
        padding: 6px 10px;
        color:#0095f6;
        background-color: transparent;
        border: none;
        font-weight: 600;
        font-size: 0.9em;
        cursor: pointer;
    }

    .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 0 0 10px;
    }

    .post-content-wrapper {
        width: 560px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .post-content-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #ccc;
    }
    
    .post-user-info {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .post-btn {
        color: #262626;
        width: 26px;
        height: 26px;
        cursor: pointer;
        margin-right: 10px;
    }

    .post-btn-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: white;
      }
    

    .post-user-img {
        border: 1px solid #dbdbdb;
        border-radius: 10em;
        height: 30px;
        width: 30px;
        margin: 0 10px;
        cursor: pointer;
    }

    .post-content-bottom {
        padding: 20px;
        height: 560px;
        border-bottom: 1px solid #ccc;
    }

    .post-user-null {
        color: #DDDDDD;
    }

    .post-user-id {
        font-weight: 500;
    }

    .post-content {
        padding: 10px 50px;
    }

    .post-comment-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
    }

    .post-content-left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .post-content-right {
        display: flex;
        flex-direction: row;
        margin-right: 4px;
    }

    .post-bottom {
        padding: 10px;
        height: 80px;
        border-bottom: 1px solid #ccc;
    }

    .post-btn-group {
        display: flex;
        justify-content: space-between;
    }

    .content-btn {
        margin-right: 2px;
        cursor: pointer;
    }

    .post-likes {
        margin-top: 10px;
        font-weight: 600;
    }

    .bookmark-btn {
        margin: 0;
      }

    .post-comment-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 5px 10px;
    }

    .post-comment-input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 1em;
    }

    .post-comment-submit {
    border: none;
    background-color: transparent;
    font-size: 0.95em;
    font-weight: 600;
    color: #0095f6;
    cursor: pointer;
    }

`