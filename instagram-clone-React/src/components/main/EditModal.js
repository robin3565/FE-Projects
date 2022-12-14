import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { usePostState } from '../../context/postContext'

const EditModal = ({ item, setEditing, modalType, post }) => {
  const { postDispatch, removePost } = usePostState();
  const navigate = useNavigate();

  const handleUnset = () => document.body.style.overflow = "unset"

  const onUpdate = () => {
    postDispatch({ type: "UPDATE_POSTED", imageUrl: post.image, content: post.contents });
  }

  const handleModal = () => {
    setEditing(false);
    handleUnset();
  };

  const onRemove = () => {
    removePost(item)
    .then(() => {
      navigate("/")
      handleUnset();
    })
  };
  
  return (
    <EditModalStyle>
      <div
        className='edit-modal'>
        <ul
          className='edit__list'>
          <li
            className='edit__item'>
              {
                modalType === "feed" ? (
                  <StyledLink to={`/posts/${item}`}>
                  게시물로 이동
                  </StyledLink>
                ) : (
                  <p
                    onClick={onUpdate}>
                    수정
                  </p>
                )
              }
          </li>
          <li
            className='edit__item edit__remove'
            onClick={onRemove}>삭제</li>
          <li
            className='edit__item'
            onClick={handleModal}>취소</li>
        </ul>
      </div>
    </EditModalStyle>
  )
}

export default EditModal

const StyledLink = styled(Link)`
    text-decoration-line: none;
    color: black;
`

const EditModalStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;

  .edit-modal {
    width: 450px;
    height: 143px;
    background-color: white;
    border-radius: 8px;
  }

  .edit__list {
    list-style: none;
    width: 100%;
    height: 100%;
  }

  .edit__remove {
    color: #FF3E3E;
  }

  .edit__item {
    border-bottom: 1px solid #dbdbdb;
    padding: 13px;
    text-align: center;
    cursor: pointer;
  }

  .edit__item:last-child {
    border: none;
  } 
`