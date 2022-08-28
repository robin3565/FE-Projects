import { useState } from "react"
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown, MdOutlineMailOutline, MdHomeFilled, MdExplore, MdFavoriteBorder, MdAddCircleOutline } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom'
import { usePostState } from '../context/postContext';
import Modal from "./Modal";
import FirstModal from "./FirstModal";

const Home = () => {
    const { postState, postDispatch } = usePostState();
    
    console.log(postState.loading)

    const onToggle = () => {
        postDispatch({ type: "LOADING", loading: !postState.loading, uploadPage: 1 })
    }

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
                            <MdExplore
                                className="nav-btn" />
                        </li>
                        <li>
                            <MdFavoriteBorder
                                className="nav-btn" />
                        </li>
                        <li>
                            <Link to="/profile">
                                <FaUserCircle
                                    className="nav-btn nav-btn-profile" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </NavStyle>
            <Outlet />
            {
                postState.loading && <FirstModal/>
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

    .uploading-wrapper {
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .uploading-modal {
        width: 1000px;
        height: 700px;
        background-color: white;
        border-radius: 10px;
    }

    .uploading-nav {
        border-bottom: 1px solid gray;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .uploading-nav p {
        flex-grow: 1;
        padding: 15px;
    }

    .uploading-nav .btn-cancle {
        color: #262626;
        width: 26px;
        height: 26px;
        cursor: pointer;
        margin-right: 10px;
    }
    
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;        
    }
    
    .uploading-container {
        width: 100%;
        height: 100%;
        padding-bottom: 90px;
        display: flex;
    }

    .uploading-file {
        text-align: center;
        margin: auto;
        width: 70%;
    }

    .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0 0 10px 10px;
    }

    .uploading-btn {
        width: 100px;
        height: 100px;
    }

    .uploading-sub {
        font-size: 1.4em;
        font-weight: 200;
        margin-bottom: 10px;
    }

    .uploading-content {
        width: 30%;
        height: 100%;
        border-left: 1px solid gray;
    }
    textarea {
        width: 100%;
    }
`