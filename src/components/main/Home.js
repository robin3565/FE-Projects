import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineMailOutline,
    MdHomeFilled,
    MdOutlineExplore,
    MdFavoriteBorder,
    MdAddCircleOutline
} from "react-icons/md";
import { Link, Outlet } from 'react-router-dom'
import { usePostState } from '../../context/postContext';
import PlusModal from "./PlusModal";
import { useAuthState } from '../../context/authContext';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../../firebase/config';

const Home = () => {
    const { postState, onToggle } = usePostState();
    const { state } = useAuthState();
    const [userInfo, setUserInfo] = useState([]);
    const [searchedId, setSearchedId] = useState("");
    const [filteredId, setFiltetedId] = useState([]);

    const getUserData = useCallback(async () => {
        const querySnapshot = await getDocs(collection(dbService, "userInfo"));
        let arr = [];
        querySnapshot.forEach((doc) => {
            const { photoUrl, id } = doc.data().user;
            let userObj = {};
            userObj.id = id;
            userObj.photoUrl = photoUrl;
            arr.push(userObj);
        })
        setUserInfo(arr);
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
                        <Link to="/">
                            <img
                                className='logo'
                                src='logo.png' />
                        </Link>
                        <MdOutlineKeyboardArrowDown
                            className="logo__btn" />
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
                                    <StyledLink
                                        to={`/${item.id}`}
                                        key={idx}>
                                        <li
                                            className='search__user'>
                                            {item.photoUrl
                                                ? <div className="user--profile" />
                                                : <FaUserCircle
                                                    className='user--profile-null user--profile' />
                                            }
                                            <p>{item.id}</p>
                                        </li>
                                    </StyledLink>
                                ))
                            }
                        </ul>
                    </div>
                    <nav>
                        <ul
                            className='nav__list'>
                            <li
                                className='nav__item'>
                                <Link to="/">
                                    <MdHomeFilled
                                        className="nav__item--btn" />
                                </Link>
                            </li>
                            <li
                                className='nav__item'>
                                <MdOutlineMailOutline
                                    className="nav__item--btn" />
                            </li>
                            <li
                                className='nav__item'>
                                <MdAddCircleOutline
                                    className="nav__item--btn"
                                    onClick={onToggle} />
                            </li>
                            <li
                                className='nav__item'>
                                <Link to="/explore">
                                    <MdOutlineExplore
                                        className="nav__item--btn" />
                                </Link>
                            </li>
                            <li
                                className='nav__item'>
                                <MdFavoriteBorder
                                    className="nav__item--btn" />
                            </li>
                            <li
                                className='nav__item'>
                                <Link to={`/${state.id}`}>
                                    <FaUserCircle
                                        className="nav__item--btn nav__item--profile" />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </HeaderStyle>
            <Outlet />
            {
                postState.loading && <PlusModal />
            }

        </HomeStyle>
    )
}

export default Home

const StyledLink = styled(Link)`
    text-decoration-line: none;
    color: #2d2d2d;
`
const HomeStyle = styled.section`
    display: flex;
    flex-direction: column;
`

const HeaderStyle = styled.header`
    border-bottom: 1px solid #d6d6d6;
    background-color: white;
    width: 100%;

    .header__logo {
        display: flex;
        flex-direction: row;
        text-align: center;
    }

    
    .logo {
        width: 6.5rem;
        display: inline-block;
        position: relative;
    }

    .logo__btn{
        width: 20px;
        height: 20px;
        margin-top: 3px;
        cursor: pointer;
    }

    .header__search {

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
        background-color: white;
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
        padding: 10px 0;
        font-weight: 500;
    }

    nav {
        margin-right: 20px;
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
        color: #262626;
    }

    .nav__item--profile {
        color: #ddd;
    }
`