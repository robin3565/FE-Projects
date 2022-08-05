import TodayMotivation from './Motivation/components/TodayMotivation';
import Background from './Background/components/Background';
import Bookmark from './Bookmark/components/Bookmark';
import Nav from './Nav/Nav';
import { useState } from 'react';
import { stateContext } from './utils/stateContext';
import motivations from './utils/motivations.json';
import Footer from './Footer/components/Footer';

function App() {
  const [ver, setVer] = useState(false);
  const [num, setNum] = useState(Math.floor(Math.random() * motivations.length));
  const [info, setInfo] = useState([{ name: '바로가기 추가', url: '', type: false, imgUrl: 0 }]);
  const [query, setQuery] = useState('calm');

  return (
    <stateContext.Provider value={{ ver, setVer, num, setNum, info, setInfo, query, setQuery }}>
      <Background />
      <Nav />
      <TodayMotivation />
      <Bookmark />
      <Footer />
    </stateContext.Provider>
  );
}

export default App;