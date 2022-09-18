import React from 'react'
import { Link } from 'react-router-dom'

const MyFeedItem = ({ item }) => {
    return (
        <Link to={`/posts/${item.id}`}>
            <div className='my-feed__wrapper'>
                <img
                    className='my-feed__img'
                    src={item.content.image} />
            </div>
        </Link>
    )
}

export default MyFeedItem
