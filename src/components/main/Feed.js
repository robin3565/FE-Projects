import { useCallback, useEffect, useState } from "react"
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { dbService } from "../../firebase/config"
import styled from "styled-components"
import { usePostState } from "../../context/postContext"
import Loader from "../global/Loader"
import FeedItem from "./FeedItem"
import RecommendUsers from "./RecommendUsers"
import throttle from "lodash.throttle";

const Feed = () => {
    const [loading, setLoading] = useState(true);
    const { postState } = usePostState();
    const [feedData, setFeedData] = useState([]);


    console.log(JSON.parse(localStorage.getItem('userInfo')))
    
    useEffect(() => {
        setFeedData([]);
        getDatas();
    }, [postState.posted])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])

    let handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { scrollTop } = document.documentElement;
        console.log(scrollHeight)
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
                                    item={item} />
                            })
                        )}
                </div>
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
    
    .feed__list {
        width: 470px;
        margin-top: 40px;
    }

    .feed__loader {
        margin: 0 auto;
        width: 50px;
        height: 50px;
      }
`