import { useCallback, useEffect, useState } from "react"
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { dbService } from "../../firebase/config"
import styled from "styled-components"
import { usePostState } from "../../context/postContext"
import Loader from "../global/Loader"
import FeedItem from "./FeedItem"
import throttle from "lodash.throttle";
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/authContext";

const Feed = () => {
    const [loading, setLoading] = useState(true);
    const { postState } = usePostState();
    const { getAllUsersData, getUserData, dispatch } = useAuthState();
    const [feedData, setFeedData] = useState([]);
    const [filterUser, setFilterUser] = useState([]);
    const state = JSON.parse(localStorage.getItem('userInfo'));
    const [users, setUsers] = useState([]);
    const [myInfo, setMyInfo] = useState([]);

    // 무한스크롤 기능 구현
    let handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { scrollTop } = document.documentElement;
        if (innerHeight + scrollTop + 100 >= scrollHeight) {
            getDatas();
        }
    }

    handleScroll = throttle(handleScroll, 1000)

    let lastDoc = null;
    const getQuery = (postRef, lastDoc) => {
        if (lastDoc === null) {
            return query(postRef,
                orderBy("timestamp", "desc"),
                limit(5));
        } else {
            return query(postRef,
                orderBy("timestamp", "desc"),
                startAfter(lastDoc),
                limit(5));
        }
    }

    useEffect(() => {
        setFeedData([]);
        getDatas();
    }, [postState.posted])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])

    // 전체 피드 데이터 가져오기
    const getDatas = useCallback(async () => {
        const postRef = collection(dbService, "posts");
        const q = getQuery(postRef, lastDoc);
        const querySnapshot = await getDocs(q)
            .then(setLoading(false))

        let posts = [];
        querySnapshot.forEach(doc =>
            posts.push({
                id: doc.id,
                data: doc.data(),
            }));

        setFeedData(prev => [...prev, ...posts])
        lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        if (querySnapshot.empty) {
            console.log('empty')
            window.removeEventListener('scroll', handleScroll)
        }
    });

    const getFeedData = useCallback(async () => {
         // 전체 유저 데이터 가져오기
        await getAllUsersData()
            .then((user) => {
                setFilterUser(user.filter((item) => item.id !== state.id))
                setUsers([...users, ...filterUser]);
            })

        // userId에 해당하는 유저 데이터 가져오기
        await getUserData(state.id)
        .then((data) => {
            setMyInfo(...data);
            dispatch({ type: "SET_USERINFO", photoUrl: data[0]?.photoUrl});
        })
    })

    useEffect(() => {
        getFeedData();
    }, [])

    return (
        <FeedStyle>
            <div
                className="main__feed">
                <div
                    className="feed__list">
                    {loading ?
                        (
                            <div
                                className="feed__loader">
                                <Loader />
                            </div>
                        )
                        : (
                            feedData?.map((item, idx) => {
                                return <FeedItem
                                    key={idx}
                                    item={item}
                                    state={state} />
                            })
                        )}
                </div>

                {/* recommend user */}
                <div
                    className='recommend'>
                    <div
                        className="recommend__user" >
                        <div
                            className="recommend__user-info">
                            <Link to={`/${state.id}`}>
                                <img 
                                    alt="user-profile"
                                    src={myInfo?.photoUrl ? myInfo?.photoUrl : 'user-null.jpg'}
                                    className="user-info--profile" />
                            </Link>
                            <StyledLink to={`/${state.id}`}>
                                {state.id ? state.id : "MyUserName"}
                            </StyledLink>
                        </div>
                        {/* <p className='recommend__user-sub'>전환</p> */}
                    </div>
                    {/* <div
                        className="recommend__line">
                        <span>회원님을 위한 추천</span>
                    </div>
                    <div
                        className="recommend__uses-list">
                        {
                            users.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="recommend__list">
                                        <div
                                            className="recommend__item">
                                            {
                                                item.photoUrl ? (
                                                    <img
                                                        src={item.photoUrl}
                                                        className="recommend-user-profile" />
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
                                        <p
                                            className='recommend__user-sub'>
                                            팔로우
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div> */}
                    <footer>
                        © 2022 INSTAGRAM FROM META
                    </footer>
                </div>
            </div>
        </FeedStyle>
    )
}

export default Feed

const FeedStyle = styled.main`
    width: 100wh;

    .main__feed {
        display: flex;
    }
    
    .feed__list {
        width: 470px;
        margin-top: 40px;
    }

    .feed__loader {
        margin: 0 auto;
        width: 50px;
        height: 50px;
      }

    //   recommend user
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
        color: var(--color-primary);
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

const StyledLink = styled(Link)`
    text-decoration-line: none;
    color: #2D2D2D;
    font-weight: 500;
`