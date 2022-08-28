import styled from "styled-components"
import PostList from "./PostList"
import Comments from './Comments'
import RecommendUsers from "./RecommendUsers"
import Story from './Story'


const Feed = () => {
    return (
        <FeedStyle>
            <div
                className="feed-wrapper">
                <div
                    className="post-wrapper">
                    <Story />
                    <PostList>
                        <Comments />
                    </PostList>
                </div>
                <RecommendUsers />
            </div>
        </FeedStyle>
    )
}

export default Feed

const FeedStyle = styled.div`
    margin: auto;  
    width: 100wh;

    .feed-wrapper {
        display: flex;
    }

    .post-wrapper {
        width: 460px;
    }
`
