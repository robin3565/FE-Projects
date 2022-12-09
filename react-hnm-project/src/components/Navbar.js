import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const menuList = ['여성', 'Divided', '남성', '유아', '아동', 'Sale', 'Home']
    return (
        <div className='nav'>
            <div className='header'></div>
            <div className='login-button'>
                <FontAwesomeIcon icon={faUser} />
                <div>로그인</div>
            </div>
            <div className='nav-section'>
                <img
                    width={100}
                    src="https://logos-download.com/wp-content/uploads/2016/04/HM_logo_logotype_emblem.png" />
            </div>
            <div className='menu-area'>
                <ul className="menu-list">
                    {menuList.map((item)=> (
                        <li>{item}</li>
                    ))}
                </ul>
                <div className='search-area'>
                    <FontAwesomeIcon icon={faSearch}/>
                    <input type="text"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
