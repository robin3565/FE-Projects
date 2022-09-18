import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dbService } from '../../firebase/config';
import Loader from '../global/Loader';

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
                                    <>
                                        <img
                                            key={idx}
                                            className='explore-img'
                                            src={item.content.image} />
                                    </>
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
        width: 980px;
        padding-top: 30px;
    }

    .explore-feed {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }


    .explore-img {
        width: 300px;
        height: 300px;
        padding: 10px;
        object-fit: cover;
    }

`