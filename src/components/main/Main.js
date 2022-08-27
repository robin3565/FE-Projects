import styled from "styled-components"
import Feeds from "./Feeds"
import Comments from './Comments'
import RecommendUsers from "./RecommendUsers"
import Story from './Story'


const Main = () => {
    return (
        <MainStyle>
            <div
                className="feed-wrapper">
                <Story />
                <Feeds>
                    <Comments />
                </Feeds>
            </div>
            <RecommendUsers />
        </MainStyle>
    )
}

export default Main

const MainStyle = styled.div`
    // padding: 0 500px;
    margin: auto 460px;    
    display: flex;
    flex-direction: row; 

    .feed-wrapper {
        background-color: white;
        width: 460px;
    }
`
