import React, { useCallback, useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { dbService } from '../../firebase/config';
import Loader from '../global/Loader';
import { BsCamera } from "react-icons/bs";
import { useAuthState } from '../../context/authContext';
import { Link, useParams } from 'react-router-dom';
import { usePostState } from '../../context/postContext';
import styled from 'styled-components';

const Myfeed = () => {
    const { state } = useAuthState();
    const { postDispatch } = usePostState();
    const [myfeeds, setMyfeeds] = useState([]);
    const [splitFeeds, setSplitFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

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

        setMyfeeds([...myfeeds, ...feed])
        const length = feed.length;
        const divide = Math.floor(length / 3) + (Math.floor(length % 3) > 0 ? 1 : 0);
        const newArray = [];
        for (let i = 0; i < divide; i++) {
            newArray.push(feed.splice(0, 3));
        }
        setSplitFeeds([...splitFeeds, ...newArray])

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
                            className='myfeed_items'>
                            {
                                splitFeeds?.map((items, idx) => (
                                    <div
                                        className='myfeed__items-wrapper'
                                        key={idx}>
                                        {
                                            items.map((item, id) => {
                                                return (
                                                    <Link
                                                        key={id}
                                                        to={`/posts/${item.id}`}>
                                                        <div className='myfeed__inner'>
                                                            <img
                                                                className='myfeed__img'
                                                                src={item.content.image} />
                                                        </div>
                                                    </Link>
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
    width: 100%;
    justify-content: center;
  }

  .myfeed__items-wrapper {
    display: flex;
    flex: 1;
  }

  .myfeed_items {
    display: flex;
    flex-direction: column;
    position: absolute;
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