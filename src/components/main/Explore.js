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
    const [splitExploreFeeds, setSplitExploreFeeds] = useState([]);

    const getFeedDatas = async () => {
        const feeds = []
        const querySnapshot = await getDocs(collection(dbService, "posts"));
        querySnapshot.forEach(doc =>
            feeds.push({
                id: doc.id,
                content: doc.data(),
            }))
        setExFeeds([...exFeeds, ...feeds])
        const length = feeds.length;
        let output = Math.floor(length % 3);
        const divide = Math.floor(length / 3) + (output > 0 ? 1 : 0);
        if (output > 0) {
            for (let i = 0; i <= output; i++) {
                feeds.push(0);
            }
        }
        const newArray = [];
        for (let i = 0; i < divide; i++) {
            newArray.push(feeds.splice(0, 3));
        }
        setSplitExploreFeeds([...newArray])
        setLoading(false)
    }

    console.log(splitExploreFeeds)

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
                        className='explore__items-wrapper'>
                        {
                            splitExploreFeeds?.map((items, idx) => (
                                <div
                                    key={idx}
                                    className='explore__items'>
                                    {
                                        items.map((item, index) => (
                                            item.content ? (
                                                <Link
                                                    className='explore__items-link'
                                                    key={index}
                                                    to={`/posts/${item.id}`}>
                                                    <div
                                                        className='explore-feed-inner'>
                                                        <img
                                                            className='explore__img'
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
                                            ) : (
                                                <div
                                                    className='explore__items-link'>
                                                    <div
                                                        className='explore-feed-inner'>
                                                        <div
                                                            className='explore__img' />
                                                        <div
                                                            className='explore__hover-img'>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </ExploreStyle>
            )
            }
        </>
    )
}

export default Explore

const ExploreStyle = styled.main`
    max-width: 980px;
    width: 100%;

    .explore__items-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 980px;
        margin-top: 20px;
    }

    .explore__items {
        display: flex;
        width: 100%;
        padding: 10px 0;
        justify-content: center;
    }

    .explore__items-link {
        padding: 0 10px;
        max-height: 300px;
        max-width: 300px;
        color: white;
        width: 100%;
        height: 100%;
    }

    .explore-feed-inner {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .explore__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
      .explore-feed-inner:hover .explore__hover-img {
        opacity: 1;
      }
    
      .explore__hover-img {
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
    
      .explore__hover-items {
        width: 100%;
        height: 100%;
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