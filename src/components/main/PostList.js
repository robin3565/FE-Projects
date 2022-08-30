import { useCallback, useEffect, useState } from "react"
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { dbService } from "../../firebase/config"
import PostItem from './PostItem';
import { usePostState } from "../../context/postContext";
import throttle from "lodash.throttle";

const PostList = () => {
  const [feedData, setFeedData] = useState([]);
  const { postState } = usePostState();

  useEffect(() => {
    setFeedData([]);
    getDatas();
  }, [postState.posted])


  useEffect(() => {
    // getDatas();
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
    const querySnapshot = await getDocs(q);

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
    <>
      {feedData?.map((item, idx) => {
        return <PostItem
          key={idx}
          item={item} />
      })
      }
    </>
  )
}

export default PostList