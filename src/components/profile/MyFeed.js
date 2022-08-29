import styled from 'styled-components'
import { BsCamera } from "react-icons/bs";
import { usePostState } from '../context/postContext';


const MyFeed = ({ item }) => {
  const { postState, postDispatch, onToggle } = usePostState();

  return (
    <>
      <img
        className='my-feed-img'
        src={item.content.image}/>
      {/* <div
        className='myfeed-null-wrapper'>
        <BsCamera
          className='myfeed-btn' 
          onClick={onToggle}/>
        <p
          className='myfeed-sub'>
          사진 공유
        </p>
        <p>d
          사진을 공유하면 회원님의 프로필에 표시됩니다.
        </p>
        <a
          className='myfeed-upload'
          onClick={onToggle}>
          첫 사진 공유하기
        </a>
      </div> */}
    </>
  )
}

export default MyFeed

const MyFeedStyle = styled.div`
  .myfeed-null-wrapper {
    margin: auto;
    width: 48%;
    text-align: center;
  }

  .myfeed-btn {
    height: 80px;
    width: 80px;
    padding-top: 70px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .myfeed-sub {
    font-size: 2em;
    font-weight: 100;
    margin-bottom: 10px;
  }

  .myfeed-upload {
    color: #0095f6;
    font-weight: 900;
    cursor: pointer;
  }
`
