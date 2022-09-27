import styled from 'styled-components'
import { PlusModalPortal } from '../../app/Portal';
import PlusModal from "../global/Modal/PlusModal"
import {
    MdOutlineMailOutline,
    MdHomeFilled,
    MdOutlineExplore,
    MdFavoriteBorder,
    MdAddCircleOutline,
} from "react-icons/md";
import { Link, NavLink, Outlet } from 'react-router-dom'
import { usePostState } from '../../context/postContext';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../../firebase/config';

const Home = () => {
    const { postState, postDispatch } = usePostState();
    const state = JSON.parse(localStorage.getItem('userInfo'));
    const [userInfo, setUserInfo] = useState([]);
    const [searchedId, setSearchedId] = useState("");
    const [filteredId, setFiltetedId] = useState([]);

    // 게시물 생성 모달창 열기
    const openModal = () => {
        postDispatch({ type: "POP_MODAL", uploadPage: 1 });
        document.body.style.overflow = "hidden";
    }

    const getUserData = useCallback(async () => {
        const querySnapshot = await getDocs(collection(dbService, "userInfo"));
        let arr = [];
        querySnapshot.forEach((doc) => {
            const { photoUrl, id } = doc.data();
            let userObj = {};
            userObj.id = id;
            userObj.photoUrl = photoUrl;
            arr.push(userObj);
            setUserInfo(arr);
        })
    });


    const filterUser = (e) => {
        setSearchedId(e.target.value);
        if (e.target.value == "") setFiltetedId([]);
        else {
            setFiltetedId(userInfo.filter((user) => user.id.toLowerCase().includes(searchedId.toLowerCase())));
        }
    }

    useEffect(() => {
        getUserData();
    }, [])


    return (
        <HomeStyle>
            <HeaderStyle>
                <div
                    className="header">
                    <div
                        className="header__logo">
                        <Link
                            to="/">
                            <img
                                alt='logo'
                                className='logo'
                                src='Instagram_logo.svg' />
                        </Link>
                    </div>

                    <div
                        className='header__search'>
                        <input
                            className='search__input'
                            type="text"
                            placeholder="검색"
                            onChange={filterUser} />
                        <ul
                            className='search__info'>
                            {
                                filteredId.map((item, idx) => (
                                    <Link
                                        className='search__link'
                                        to={`/${item.id}`}
                                        key={idx}>
                                        <li
                                            className='search__user'>
                                            <img
                                                alt='user-profile'
                                                className="user--profile"
                                                src={item.photoUrl ? item.photoUrl : 'user-null.jpg'}/>
                                            <p>{item.id}</p>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>

                    <nav>
                        <ul
                            className='nav__list'>
                            <NavLink
                                to="/">
                                <li
                                    className='nav__item'>
                                    <MdHomeFilled
                                        className="nav__item--btn" />
                                </li>
                            </NavLink>
                            {/* <li
                                className='nav__item'>
                                <MdOutlineMailOutline
                                    className="nav__item--btn" />
                            </li> */}
                            <li
                                className='nav__item'>
                                <MdAddCircleOutline
                                    className="nav__item--btn"
                                    onClick={openModal} />
                            </li>
                            <NavLink
                                to="/explore">
                                <li
                                    className='nav__item'>
                                    <MdOutlineExplore
                                        className="nav__item--btn" />
                                </li>
                            </NavLink>
                            {/* <li
                                className='nav__item'>
                                <MdFavoriteBorder
                                    className="nav__item--btn" />
                            </li> */}
                            <NavLink to={`/${state.id}`}>
                                <li
                                    className='nav__item'>
                                    <img
                                        alt='user-profile'
                                        src={state.photoUrl ? state.photoUrl : '/user-null.jpg'}
                                        className="nav__item--btn nav__item--profile" />
                                </li>
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </HeaderStyle>
            {/* isModal이 true이면 모달창을 띄운다. */}
            {
                postState.isModal && (
                    <PlusModalPortal>
                        <PlusModal />
                    </PlusModalPortal>
                )
            }
            <Outlet />
        </HomeStyle>
    )
}

export default Home

const HomeStyle = styled.section`
    display: flex;
    flex-direction: column;
`

const HeaderStyle = styled.header`
    .header__logo {
        display: flex;
        flex-direction: row;
        text-align: center;
    }

    .logo {
        width: 6.5rem;
    }

    .search__input {
        width: 250px;
        height: 35px;
        border-radius: 10px;
        border: none;
        outline: none;
        background-color: #efefef;
        padding-left: 10px;
        margin-left: 100px;
    }

    .search__info {
        background-color: var(--color-background-white);
        z-index: 9999;
        display: block;
        margin: 0.9em 3.2em;
        position: absolute;
        list-style-type: none;
        width: 350px;
        border-radius: 4px;
        max-height: 20em;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .search__user {
        display: flex;
        align-items: center;
        padding: 10px 0;
        font-weight: var(--fontWeight-medium);
    }

    .search__user p {
        color: var(--color-text);
    }

    .nav__list {
        display: flex;
        justify-content: space-between;
        list-style: none;
    }

    .nav__item {
        padding: 8px;
    }
    
    .nav__item--btn {
        width: 26px;
        height: 26px;
        cursor: pointer;
        color: var(--color-button);
    }

    .nav__item--profile {
        color: #ddd;
        border-radius: 70%;
        border: 1px solid var(--color-border);
    }
`