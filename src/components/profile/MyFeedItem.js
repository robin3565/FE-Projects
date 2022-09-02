import React from 'react'
import { Link } from 'react-router-dom'

const MyFeedItem = ({ item }) => {
    return (
        <Link to={`/posts/${item.id}`}>
            <img
                className='my-feed__img'
                src={item.content.image} />
        </Link>
    )
}

export default MyFeedItem
