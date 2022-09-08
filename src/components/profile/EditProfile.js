import { useState } from 'react';
import styled from 'styled-components'
import { useAuthState } from '../../context/authContext'

const EditProfile = () => {
    const { state, updateUserInfo } = useAuthState();
    const [userUrl, setUserUrl] = useState(state.photoUrl)
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(state.id);
    const [userEmail, setUserEmail] = useState(state.userInfo.email);

    const onFileChange = (e) => {
        const reader = new FileReader();
        // 받은 파일 중 첫 번째 파일만 가져온다.
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (finishedEvent) => {
            setUserUrl(finishedEvent.target.result);
        }
    }

    const handleUserInfo = (e) => {
        e.preventDefault();
        updateUserInfo(state, userUrl, userName, userId, userEmail)
    }

    return (
        <EditProfileStyle>
            <div
                className='edit-profile'>
                <div
                    className='edit-profile__menu'>
                    <ul
                        className='menu__list'>
                        <li>프로필 편집</li>
                        <li>비밀번호 변경</li>
                    </ul>
                    <div>
                        <p
                            className='menu__explain'>
                            스토리 및 게시물 공유, 로그인 등 
                            Instagram, Facebook 앱, Messenger 간에 
                            연결된 환경에 대한 설정을 관리하세요.
                        </p>
                    </div>
                </div>
                <article
                    className='edit-profile__form'>
                    <div
                        className='form__inner'>
                        <div
                            className='form__user'>
                            <aside
                                className='form__aside'>
                                {userUrl ? (
                                    <img
                                        src={userUrl}
                                        className='form__user--url'/>
                                ):(
                                    <img
                                    src='/user-null.jpg'
                                    className='form__user--url' />
                                )}
                            </aside>
                            <div
                                className='form__user--info'>
                                <p>{state.id}</p>
                                <div
                                    className='form__user--file'>
                                    <label
                                        htmlFor='on-file'>
                                        프로필 사진 바꾸기
                                    </label>
                                    <input
                                        type="file"
                                        id='on-file'
                                        onChange={onFileChange}/>
                                </div>
                            </div>
                        </div>
                        <form
                            className='form'
                            onSubmit={handleUserInfo}>
                            <div
                                className='form__name'>
                                <aside
                                    className='form__aside'>
                                    <label htmlFor="name">
                                        이름
                                    </label>
                                </aside>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='이름'
                                        id="name"
                                        onChange={(e) => setUserName(e.target.value)} />
                                </div>
                            </div>
                            <div
                                className='form__id'>
                                <aside
                                    className='form__aside'>
                                    <label htmlFor="id">
                                        사용자 이름
                                    </label>
                                </aside>
                                <div>{userId}</div>
                                {/* <input
                                    type="text"
                                    placeholder='사용자 이름'
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    id="id" /> */}
                            </div>
                            <div
                                className='form__intro'>
                                <aside
                                    className='form__aside'>
                                    <label htmlFor="intro">
                                        소개
                                    </label>
                                </aside>
                                <textarea
                                    type="text"
                                    id="intro" />
                            </div>
                            <div
                                className='form__email'>
                                <aside
                                    className='form__aside'>
                                    <label htmlFor="email">
                                        이메일
                                    </label>
                                </aside>
                                <input
                                    type="text"
                                    placeholder='이메일'
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    id="email" />
                            </div>
                            <div
                                className='form__phone'>
                                <aside
                                    className='form__aside'>
                                    <label htmlFor="phone">
                                        전화번호
                                    </label>
                                </aside>
                                <input
                                    type="text"
                                    placeholder='전화번호'
                                    id="phone" />
                            </div>
                            <div>
                                <input
                                    type="submit"
                                    className='form__submit' />
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        </EditProfileStyle>
    )
}

export default EditProfile

const EditProfileStyle = styled.div`
    .form__submit {
        background-color: #0095f6;
        border: none;
        height: 30px;
        width: 45px;
        border-radius: 2px;
        color: white;
        cursor: pointer;
    }

    .edit-profile__menu {
        width: 30%;
        border-right: 1px solid #dbdbdb;
    }

    .menu__list {
        list-style:none;
        padding: 20px;
        border-bottom: 1px solid #dbdbdb;
    }

    .edit-profile__menu li {
        padding-bottom: 20px;
    }

    .edit-profile__form {
        width: 70%;
    }

    .form__inner { 
        width: 80%;
        margin: auto;
    }

    .form__user, .form__name,
    .form__id, .form__intro,
    .form__email, .form__phone {
        display: flex;
        flex-direction: row;
        margin: 20px;
        align-items: center;
    }

    .form__aside {
        width: 100px;
        font-weight: 600;
        text-align: right;
        margin-right: 30px;
    }


    input[type="text"] {
        padding: 0 10px;
        border-radius: 3px;
        border: 1px solid #dbdbdb;
        height: 32px;
        width: 300px;
        font-size: 1em;
    }

    .form__user--url {
        width: 40px;
        height: 40px;
        border-radius: 70%;
        border: 1px solid #dbdbdb;
    }

    .form__user--info {
        display: flex;
        flex-direction: column;
    }

    .form__user--info p {
        font-size: 1.2em;
    }

    .form__user--file label{
        display: inline-block;
        color: #0998f6;
        font-weight: 600;
        line-height: normal;
        vertical-align: middle;
        cursor: pointer;
        border: none;
    }

    .form__user--file input{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip:rect(0,0,0,0);
        border: 0;
    }

    .menu__explain, .form__name--explain{
        font-size: 0.8em;
        padding: 20px;
    }

`
