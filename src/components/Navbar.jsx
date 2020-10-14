import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
// https://react-icons.github.io/
import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import { Button } from '../button/Button';
import { IconContext } from 'react-icons/lib';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const _onHandleClick = () => {
        setClick(!click);
    }

    const _closeMenuOnMobile = () => {
        setClick(false);
    }

    // Close the NavBar menu if the window size is equal mobile size
    const buttonWindowHandle = () => {
        if(window.innerHeight <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        buttonWindowHandle();
    }, []);

    // When the screen size is changed
    window.addEventListener('resize', buttonWindowHandle);

    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <div className="navbar-container container">
                        <Link to='/' className="navbar-logo" onClick={_closeMenuOnMobile}>
                            <BsSearch className="navbar-icon"/>
                            NetSearch
                        </Link>
                        <div className="menu-icon" onClick={_onHandleClick}>
                            {click ? <FaTimes/> : <GiHamburgerMenu/>}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <Link to ='/' className="nav-links nav-itemRight" onClick={_closeMenuOnMobile}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to ='/pinItems' className="nav-links" onClick={_closeMenuOnMobile}>
                                    Pin Items
                                </Link>
                            </li>
                            <li to="/search" className="nav-btn">
                                {button ? (
                                    <Link className="btn-link">
                                        <Button buttonStyle='btn--outline'
                                        onClick={_closeMenuOnMobile}
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                ): (
                                    <Link className="btn-link">
                                        <Button buttonStyle='btn-outline'
                                            buttonSize='btn-mobile'
                                            onClick={_closeMenuOnMobile}
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default Navbar
