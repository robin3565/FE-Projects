import { useEffect, useState } from "react"
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { dbService } from "../../firebase/config"
import PostItem from './PostItem';
import { usePostState } from "../context/postContext";

const PostList = () => {
  const { postState } = usePostState();
  const [feedData, setFeedData] = useState([]);

  let lastDoc = null;
  const getDatas = async () => {
    const q = query(collection(dbService, "posts"),
      orderBy("timestamp"),
      startAfter(lastDoc),
      limit(5));

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
  };

  const handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (innerHeight + scrollTop + 1 >= scrollHeight) {
      getDatas();
    }
  }

  useEffect(() => {
    getDatas();
  }, [postState.posted])
 
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [])

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

