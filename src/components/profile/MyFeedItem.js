import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MyFeedItem = ({ items }) => {
    return (
        <>
            <MyFeedItemStyle>
                {
                    items.map((item, idx) => {
                        return (
                            <Link
                                key={idx}
                                to={`/posts/${item.id}`}>
                                <div className='my-feed__inner'>
                                    <img
                                        className='my-feed__img'
                                        src={item.content.image} />
                                </div>
                            </Link>
                        )
                    })
                }
            </MyFeedItemStyle>
        </>
    )
}

export default MyFeedItem

const MyFeedItemStyle = styled.div`
    display: flex;
    flex: 1;

    .my-feed__inner {
        border: 1px solid gray;
        width: 100%;
        height: 100%;
    }
`