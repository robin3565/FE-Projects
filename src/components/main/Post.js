import styled from 'styled-components'
import { IoClose } from "react-icons/io5";
import { useAuthState } from '../../context/authContext';
import { FaUserCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { dbService } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
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
import EditModal from './EditModal';
import { EditModalPortal } from '../../app/Portal';

const Post = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { state } = useAuthState();
    const { updateComment, updateLike } = usePostState();
    const [postComments, setPostComments] = useState([]);
    const [post, setPost] = useState({});
    const [newComment, setNewComment] = useState("")
    const [photoUrl, setPhotoUrl] = useState("");
    const userId = state.id;
    const [isEditing, setEditing] = useState(false);

    const handleModal = () => {
        document.body.style.overflow = "hidden";
        setEditing(prev => !prev);
      }
      
    const postRef = doc(dbService, "posts", postId);
    const getPostData = useCallback(async () => {
        const docSnap = await getDoc(postRef);
        const { comments } = docSnap.data();

        setPost(docSnap.data())
        setPostComments(comments);
    });

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

    let likes = [];
    const handleLikes = useCallback(async () => {
        if (!post.likes.includes(userId)) {
            likes = post.likes;
            likes.push(userId)
            updateLike(likes, postId)
                .then(() => {
                    setPost({ ...post, likes: likes })
                })
        } else {
            likes = post.likes;
            likes = likes.filter((item) => item !== userId)
            updateLike(likes, postId)
                .then(() => {
                    setPost({ ...post, likes: likes })
                })
        }
    })

    const getUserInfo = useCallback(async () => {
        const docRef = doc(dbService, "userInfo", post.uid);
        const docSnap = await getDoc(docRef);
        setPhotoUrl(docSnap.data().photoUrl);
      })

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
        getUserInfo();
    }, [])


    return (
        <>
            <PostModalStyle>
                <IoClose
                    className="post__btn-cancle"
                    onClick={() => navigate(-1)} />
                <div
                    className='post'>
                    <div
                        className="post__inner">
                        <div
                            className="post__img">
                            <img
                                width={840}
                                height={840}
                                className="post__uploaded-img"
                                src={post.image}
                                onDoubleClick={handleLikes} />
                        </div>
                        <div
                            className="post__content">
                            <div
                                className='post__user'>
                                <div
                                    className='post__user-inner'>
                                    {
                                       photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            className='post__user-null post__user-img'/>
                                       ) : (
                                        <img
                                            src='/user-null.jpg'
                                            className='post__user-null post__user-img' />
                                       )
                                    }
                                    
                                    <span
                                        className='post__user-id'>
                                            {post.username}
                                    </span>
                                </div>
                                <HiOutlineDotsHorizontal
                                    onClick={handleModal}
                                    className='post-btn' />
                            </div>
                            <div
                                className='post__content-inner'>
                                <div
                                    className='post__user-inner'>
                                    {
                                       photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            className='post__user-null post__user-img'/>
                                       ) : (
                                        <img
                                            src='/user-null.jpg'
                                            className='post__user-null post__user-img' />
                                       )
                                    }
                                    <span
                                        className='post__user-id'>
                                            {post.username}
                                    </span>
                                </div>
                                <article
                                    className='article__content'>
                                    {post.contents}
                                </article>
                                <ul
                                    className='article__comments'>
                                    {
                                        postComments.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className='comments__item'>
                                                <div
                                                    className='comments__item-inner'>
                                                    <div>
                                                        <div
                                                            className='post__user-inner'>
                                                            {
                                                                item.photoUrl ? (
                                                                    <img
                                                                        src={item.photoUrl}
                                                                        className='post__user-null post__user-img'/>
                                                                ) : (
                                                                    <img
                                                                        src='/user-null.jpg'
                                                                        className='post__user-null post__user-img' />
                                                                )
                                                            }
                                                            <span
                                                                className='post__user-id'>{item.userId}</span>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        {item.comment}
                                                    </p>
                                                </div>
                                                <div
                                                    className='comments__item-right'>
                                                    {
                                                        userId === item.userId && (
                                                            <>
                                                                <HiOutlineDotsHorizontal
                                                                    id={item.id}
                                                                    onClick={removeComment}
                                                                    className='comments__btn' />
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
                                className='post__icons'>
                                <div
                                    className="post__icons-inner">
                                    <div>
                                        {post.likes?.includes(userId)
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
                                        className='post-btn post-bookmark-btn' />
                                </div>
                                <p
                                    className='post__likes'>
                                    {post.likes
                                        ?
                                        (<span>좋아요 {post.likes.length}개</span>)
                                        :
                                        (<span>좋아요 0개</span>)}
                                </p>
                            </div>
                            <form
                                className='form__comments'
                                onSubmit={submitComment}>
                                <VscSmiley
                                    className='post-btn' />
                                <input
                                    className='comments__input'
                                    placeholder='댓글 달기'
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => {
                                        setNewComment(e.target.value)
                                    }} />
                                <input
                                    className='comments__submit'
                                    type="submit"
                                    value="게시" />
                            </form>
                        </div>
                    </div>
                </div>
            </PostModalStyle>
            {
                isEditing && (
                    <EditModalPortal>
                        <EditModal
                            modalType={"post"}
                            item={postId} 
                            setEditing={setEditing}
                            post={post}/>
                    </EditModalPortal>
                )
            }
        </>
    )
}

export default Post

const PostModalStyle = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .post__btn-cancle {
        color: #fff;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
        cursor: pointer;
    }

    .post {
        width: 1400px;
        height: 840px;
        background-color: white;
        border-radius: 10px;
    }
    
    .post__img {
        width: 840px;
        height: 840px;
    }

    .post__inner {
        width: 100%;
        display: flex;
    }
    
    .post__uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 0 0 10px;
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


    .post__content {
        width: 560px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .post__user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #ccc;
    }
    
    .post__user-inner {
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

    .post__icons-inner {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: white;
      }
    

    .post__user-img {
        border: 1px solid #dbdbdb;
        border-radius: 70%;
        height: 30px;
        width: 30px;
        margin: 0 10px;
        cursor: pointer;
    }

    .post__user-id {
        font-weight: 500;
    }

    .post__content-inner {
        padding: 20px;
        height: 560px;
        border-bottom: 1px solid #ccc;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .article__content {
        padding: 10px 50px;
        min-height: 20px;
    }

    .comments__item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
    }

    .comments__item-inner {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .post__item-right {
        display: flex;
        flex-direction: row;
        margin-right: 4px;
    }

    .post__icons {
        padding: 10px;
        height: 80px;
        border-bottom: 1px solid #ccc;
    }

    .comments__btn {
        margin-right: 2px;
        cursor: pointer;
    }

    .post__likes {
        margin-top: 10px;
        font-weight: 600;
    }

    .post-bookmark-btn {
        margin: 0;
      }

    .form__comments {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 30px;
        padding: 5px 10px;
    }

    .comments__input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        font-size: 1em;
    }

    .comments__submit {
        border: none;
        background-color: transparent;
        font-size: 0.95em;
        font-weight: 600;
        color: #0095f6;
        cursor: pointer;
    }

`