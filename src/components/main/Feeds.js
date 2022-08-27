import { useCallback, useEffect, useState } from "react"
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { dbService } from "../../firebase/config"
import FeedItem from './FeedItem';

const Feeds = () => {
  const [feedData, setFeedData] = useState([]);

  let lastDoc = null;
  const getDatas = async () => {
    const q = query(collection(dbService, "posts"),
      orderBy("timestamp"),
      startAfter(lastDoc),
      limit(5));

    const querySnapshot = await getDocs(q);

    let posts = [];
    querySnapshot.forEach(doc => posts.push(doc.data()));
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
    window.addEventListener('scroll', handleScroll);
  }, [dbService])

  return (
    <>
      {feedData?.map((item, idx) => {
        return <FeedItem
          key={idx}
          item={item} />
      })
      }
    </>
  )
}

export default Feeds

