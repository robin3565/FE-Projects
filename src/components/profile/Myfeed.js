import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbService } from '../../firebase/config';
import Loader from '../global/Loader';
import { BsCamera } from "react-icons/bs";
import { useAuthState } from '../../context/authContext';
import { Link, useParams } from 'react-router-dom';
import { usePostState } from '../../context/postContext';
import { IoChatbubbleSharp, IoHeartSharp } from "react-icons/io5";
import styled from 'styled-components';

const Myfeed = () => {
    const { postDispatch } = usePostState();
    const [myfeeds, setMyfeeds] = useState([]);
    const [splitFeeds, setSplitFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    console.log(splitFeeds)

    const onToggle = () => {
        postDispatch({ type: "POP_MODAL", uploadPage: 1 });
        document.body.style.overflow = "hidden";
    }

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

        setMyfeeds([...feed])
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
        setSplitFeeds([...newArray])
        setLoading(false);
    }

    useEffect(() => {
        getDatas();
    }, [params.userId])

    return (
        <MyfeedStyle>
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
                        <div
                            className='myfeed__items-wrapper'>
                            {
                                splitFeeds?.map((items, idx) => (
                                    <div
                                        className='myfeed__items'
                                        key={idx}>
                                        {
                                            items.map((item, index) => {
                                                return (
                                                    <>
                                                        {
                                                            item.content ? (
                                                                <Link
                                                                    className='myfeed__items-link'
                                                                    key={index}
                                                                    to={`/posts/${item.id}`}>
                                                                    <div
                                                                        className='myfeed__inner'>
                                                                        <img
                                                                            className='myfeed__img'
                                                                            src={item.content.image}
                                                                            loading="lazy" />
                                                                        <div
                                                                            className='myfeed__hover-img'>
                                                                            <div
                                                                                className='myfeed__hover-items'>
                                                                                <div
                                                                                    className='myfeed__hover-item'>
                                                                                    <IoHeartSharp
                                                                                        className='myfeed__hover-icon' />
                                                                                    <span>
                                                                                        {item.content.likes.length}
                                                                                    </span>
                                                                                </div>
                                                                                <div
                                                                                    className='myfeed__hover-item'>
                                                                                    <IoChatbubbleSharp
                                                                                        className='myfeed__hover-icon' />
                                                                                    <span>
                                                                                        {item.content.comments.length}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ) : (
                                                                <div
                                                                    className='myfeed__items-link'>
                                                                    <div
                                                                        className='myfeed__inner'>
                                                                        <div
                                                                            className='myfeed__img' />
                                                                        <div
                                                                            className='myfeed__hover-img'>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </MyfeedStyle>
    )
}

export default Myfeed

const MyfeedStyle = styled.div`
  .myfeed {
    display: flex;
    padding-top: 10px;
  }

  .myfeed__items-wrapper {
    width: 100%;
    height: 100%;
    max-width: 980px;
    display: flex;
    flex-direction: column;
    position: absolute;
  }

  .myfeed__items {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }

  .myfeed__items-link {
    color: white;
    max-height: 300px;
    max-width: 300px;
    padding: 0 10px;
    width: 100%;
    height: 100%;
  }

  .myfeed__inner {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .myfeed__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .myfeed__inner:hover .myfeed__hover-img {
    opacity: 1;
  }

  .myfeed__hover-img {
    opacity: 0;
    width: 100%;
    height: 100%;
    max-height: 300px;
    max-width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  .myfeed__hover-items {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0.3);
    justify-content: center;
  }

  .myfeed__hover-item {
    display: flex;
    align-items: center;
    padding: 8px;
  }

  .myfeed__hover-icon {
    padding-right: 3px;
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

  .my-feed__inner {
    border: 1px solid gray;
    width: 100%;
    height: 100%;
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