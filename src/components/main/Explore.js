import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dbService } from '../../firebase/config';

const Explore = () => {
    const [exFeeds, setExFeeds] = useState([]);

    const getFeedDatas = async () => {
        const feeds = []
        const querySnapshot = await getDocs(collection(dbService, "posts"));
        querySnapshot.forEach(doc =>
            feeds.push({
                id: doc.id,
                content: doc.data(),
            }))
        setExFeeds([...exFeeds, ...feeds])
    }

    useEffect(() => {
        getFeedDatas();
    }, [])

    console.log(exFeeds)

    return (
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

export default Explore

const ExploreStyle = styled.div`
    width: 100wh;

    .explore-wrapper {
        margin: auto;
        width: 50%;
        padding-top: 30px;
    }


    .explore-img {
        width: 300px;
        height: 300px;
        padding: 7.5px;
    }

`