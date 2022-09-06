import styled from 'styled-components'
import { useAuthState } from '../../context/authContext';
import { Link } from 'react-router-dom';

const RecommendUsers = () => {
    const { state } = useAuthState();
    console.log(state)

    return (
        <RecommendUsersStyle>
            <div
                className='recommend'>
                <div
                    className="recommend__user" >
                    <div
                        className="recommend__user-info">
                        <Link to={`/${state.id}`}>
                            {state.photoUrl
                                ? <img
                                    src={state.photoUrl}
                                    className="user-info--profile" />
                                : <img
                                    src='user-null.jpg'
                                    className="user-info--profile" />}
                        </Link>
                        <StyledLink to="/profile">
                            {state.id ? state.id : "MyUserName"}
                        </StyledLink>
                    </div>
                    <p
                        className='recommned__user-sub'>전환</p>
                </div>
                <div
                    className="main-recommend-line">
                    <span>회원님을 위한 추천</span>
                    <span>모두 보기</span>
                </div>

                <div
                    id="recommed-list">
                    <div
                        className="recommend-user-wrapper">
                        <div
                            className="recommend-user-profile" />
                        <div
                            className="recommend-user-info">
                            <p>UserName</p>
                            <p>Instagram 신규 가입</p>
                        </div>
                    </div>
                    <p>팔로우</p>

                </div>
                <MainFooterStyle>
                    <p>
                        © 2022 INSTAGRAM FROM META
                    </p>
                </MainFooterStyle>
            </div>
        </RecommendUsersStyle>
    )
}

export default RecommendUsers

const StyledLink = styled(Link)`
    text-decoration-line: none;
    color: #2D2D2D;
    font-weight: 500;
`

const RecommendUsersStyle = styled.div`
    .recommend {
        max-height: 400px;
        width: 350px;
        margin: 25px;
        margin-top: 43px;
        font-size: 14px;
    }

    #recommed-list {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .recommend-user-wrapper {
        display: flex;
        align-items: center;
        }

        .recommend-user-profile {
            border: 1px solid #dbdbdb;
            width: 30px;
            height: 30px;
            border-radius: 6em;
            margin-right: 10px;
        }

        .recommend-user-info p{
        margin: 0;
        }
    }

    .recommend__user {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .recommend__user-info {
        display: flex;
        align-items: center;
    }

    .recommned__user-sub {
        color: #0095f6;
        font-weight: 600;
    }

    .user-info--profile {
        border: 1px solid #dbdbdb;
        width: 62px;
        height: 62px;
        border-radius: 70%;
        margin-right: 10px;
        cursor: pointer;
    }

    .main-recommend-line {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    }
`
const MainFooterStyle = styled.footer`
    font-size: 0.9em;
    color: gray;
`