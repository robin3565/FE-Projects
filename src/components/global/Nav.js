import React from 'react'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown, MdOutlineMailOutline, MdHomeFilled, MdExplore, MdFavoriteBorder, MdAddCircleOutline } from "react-icons/md";
import { Link } from 'react-router-dom'
import { usePostState } from '../context/postContext';

const Nav = () => {
    const { postState, postDispatch } = usePostState();

    const onToggle = () => {
        postDispatch({ type: "LOADING", loading: !postState.loading })
    }

    return (
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
                    className='input-header' />
                <div
                    className='btn-group'>
                    <MdHomeFilled
                        className="nav-btn" />
                    <MdOutlineMailOutline
                        className="nav-btn" />
                    <MdAddCircleOutline
                        className="nav-btn"
                        onClick={onToggle} />
                    <MdExplore
                        className="nav-btn" />
                    <MdFavoriteBorder
                        className="nav-btn" />
                    <Link to="/profile">
                        <FaUserCircle
                            className="nav-btn" />
                    </Link>
                </div>
            </div>
        </NavStyle>
    )
}

export default Nav

const NavStyle = styled.nav`
    border-bottom: 1px solid #d6d6d6;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-wrapper {
        display: flex;
        flex-direction: row;
        padding: 20px;
        justify-content: space-between;
        width: 50%;
    }

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
        padding-left: 2rem;
    }

    .btn-group {
        display: flex;
        justify-content: space-between;
        width: 250px;
    }

    .btn-group .nav-btn {
        width: 26px;
        height: 26px;
        cursor: pointer;
        color: ##262626;
    }

    .btn-group .nav-btn:last-child {
        color: #DDDDDD;
    }

    .btn-group div {
        margin-right: 50px;
    }
`

