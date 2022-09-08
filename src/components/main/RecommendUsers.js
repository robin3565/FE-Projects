import styled from 'styled-components'
import { useAuthState } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../../firebase/config';
import { useCallback, useEffect, useState } from 'react';

const RecommendUsers = () => {
    const { state } = useAuthState();
    const [users, setUsers] = useState([]);

    const getUserInfo = useCallback(async () => {
        const querySnapshot = await getDocs(collection(dbService, "userInfo"));
        const user = []
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
        })
        setUsers([...users, ...user]);
    })

    console.log(users)

    useEffect(() => {
        getUserInfo();
    }, [])

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
                        className='recommend__user-sub'>전환</p>
                </div>
                <div
                    className="recommend__line">
                    <span>회원님을 위한 추천</span>
                    {/* <span>모두 보기</span> */}
                </div>

                <div
                    className="recommend__uses-list">
                    {
                        users.map(item => {
                            return (
                                <>
                                    <div
                                        className="recommend__list">
                                        <div
                                            className="recommend__item">
                                            {
                                                item.photoUrl ?  (
                                                    <img
                                                        src={item.photoUrl}
                                                        className="recommend-user-profile"/>
                                                ) : (
                                                    <img
                                                        src='/user-null.jpg'
                                                        className="recommend-user-profile" />
                                                )
                                            }
                                            <div
                                                className="recommend-user-info">
                                                <p>{item.id}</p>
                                            </div>
                                        </div>
                                        <p>팔로우</p>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <footer>
                    © 2022 INSTAGRAM FROM META
                </footer>
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
    font-size: 14px;

    .recommend {
        max-height: 400px;
        width: 350px;
        margin: 25px;
        margin-top: 43px;
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

    .recommend__user-sub {
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

    .recommend__line {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .recommend__uses-list {
        display: flex;
        flex-direction: column;
    }

    .recommend__list {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;

        .recommend__item {
            display: flex;
            align-items: center;
        }

        .recommend-user-profile {
            border: 1px solid #dbdbdb;
            width: 30px;
            height: 30px;
            border-radius: 70%;
            margin-right: 10px;
        }

        .recommend-user-info p{
            margin: 0;
        }
    }

    footer {
        color: gray;
    }
`