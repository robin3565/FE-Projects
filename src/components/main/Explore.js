import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dbService } from '../../firebase/config';
import Loader from '../global/Loader';
import { IoChatbubbleSharp, IoHeartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Explore = () => {
    const [exFeeds, setExFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFeedDatas = async () => {
        const feeds = []
        const querySnapshot = await getDocs(collection(dbService, "posts"));
        querySnapshot.forEach(doc =>
            feeds.push({
                id: doc.id,
                content: doc.data(),
            }))
        setExFeeds([...exFeeds, ...feeds])
        setLoading(false)
    }

    useEffect(() => {
        getFeedDatas();
    }, [])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <ExploreStyle>
                    <div
                        className='explore-wrapper'>
                        <div
                            className='explore-feed'>
                            {
                                exFeeds.map((item, idx) => (
                                    <Link
                                    className='explore__items-link'
                                    key={idx}
                                    to={`/posts/${item.id}`}>
                                        <div
                                            className='explore-feed-inner'>
                                            <img
                                                className='explore-img'
                                                src={item.content.image}
                                                loading="lazy" />
                                            <div
                                                className='explore__hover-img'>
                                                <div
                                                    className='explore__hover-items'>
                                                    <div
                                                        className='explore__hover-item'>
                                                        <IoHeartSharp
                                                            className='explore__hover-icon' />
                                                        <span
                                                            className='explore__hover-text'>
                                                            {item.content.likes.length}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className='explore__hover-item'>
                                                        <IoChatbubbleSharp
                                                            className='explore__hover-icon' />
                                                        <span
                                                            className='explore__hover-text'>
                                                            {item.content.comments.length}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </ExploreStyle>
            )
            }
        </>
    )
}

export default Explore

const ExploreStyle = styled.div`
    width: 100wh;

    .explore-wrapper {
        margin: auto;
        width: 960px;
        padding-top: 30px;
    }

    .explore-feed {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: start;
        width: 100%;
    }

    .explore-feed-inner {
        position: relative;
    }

    .explore-img {
        width: 300px;
        height: 300px;
        padding: 10px;
        object-fit: cover;
        display: block;
    }

    .explore__items-link {
        color: white;
    }
    
      .explore-feed-inner:hover .explore__hover-img {
        opacity: 1;
      }
    
      .explore__hover-img {
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
      }
    
      .explore__hover-items {
        width: 300px;
        height: 300px;
        display: flex;
        flex-direction: row;
        background-color: rgba(0, 0, 0, 0.3);
        justify-content: center;
      }

      .explore__hover-item {
        display: flex;
        align-items: center;
        padding: 8px;
      }

`