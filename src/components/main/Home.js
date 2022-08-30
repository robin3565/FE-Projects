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

const Home = () => {
    const { postState, onToggle } = usePostState();
    const { state } = useAuthState();
    return (
        <HomeStyle>
            <NavStyle>
                <div
                    className="nav-wrapper">
                    <div
                        className="logo-imgs">
                        <Link to="/">
                            <img src='logo.png' />
                        </Link>
                        <MdOutlineKeyboardArrowDown
                            className="logo-side-btn" />
                    </div>
                    <input
                        type="text"
                        placeholder="검색"
                        className='nav-search' />
                    <ul
                        className='nav-btn-group'>
                        <li>
                            <Link to="/">
                                <MdHomeFilled
                                    className="nav-btn" />
                            </Link>
                        </li>
                        <li>
                            <MdOutlineMailOutline
                                className="nav-btn" />
                        </li>
                        <li>
                            <MdAddCircleOutline
                                className="nav-btn"
                                onClick={onToggle} />
                        </li>
                        <li>
                            <Link to="/explore">
                                <MdOutlineExplore
                                        className="nav-btn" />
                            </Link>
                        </li>
                        <li>
                            <MdFavoriteBorder
                                className="nav-btn" />
                        </li>
                        <li>
                            <Link to={`/${state.id}`}>
                                <FaUserCircle
                                    className="nav-btn nav-btn-profile" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </NavStyle>
            <Outlet />
            {
                postState.loading && <PlusModal />
            }
        </HomeStyle>
    )
}

export default Home


const NavStyle = styled.nav`
    border-bottom: 1px solid #d6d6d6;
    background-color: white;
    width: 100%;

    .logo-imgs {
        display: flex;
        flex-direction: row;
        text-align: center;
    }

    .logo-imgs .logo-side-btn{
        width: 20px;
        height: 20px;
        margin-top: 3px;
        cursor: pointer;
    }

    img {
        width: 6.5rem;
        display: inline-block;
        position: relative;
    }

    .nav-search {
        width: 250px;
        height: 35px;
        border-radius: 10px;
        border: none;
        outline: none;
        background-color: #efefef;
        padding-left: 10px;
        margin-left: 100px;
    }

    .nav-btn-group {
        display: flex;
        justify-content: space-between;
        list-style: none;
        margin-right: 20px;
    }

    .nav-btn-group .nav-btn {
        width: 26px;
        height: 26px;
        cursor: pointer;
        color: #262626;
        padding: 8px;
    }

    .nav-btn-group .nav-btn-profile {
        color: #ddd;
    }
`

const HomeStyle = styled.div`
    display: flex;
    flex-direction: column;
`