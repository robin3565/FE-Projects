import styled from "styled-components"
import Loader from "../global/Loader"
import FeedList from "./FeedList"
import RecommendUsers from "./RecommendUsers"
import Story from './Story'

const Feed = () => {
    return (
        <FeedStyle>
            <div
                className="main__feed">
                    {/* <Story /> */}
                    <FeedList/>
                <RecommendUsers />
            </div>
        </FeedStyle>
    )
}

export default Feed

const FeedStyle = styled.main`
    margin: auto;  
    width: 100wh;

    .main__feed {
        display: flex;
    }
`
