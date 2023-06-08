import React from 'react'
import Logo from '../img/logo.jpg'
const Footer = ()=>{
    return (
        <footer>
            <img src={Logo} alt="Logo"/>
            <span>
                Copyright 2023 - Precious Ediale <b>ReactJs</b>
            </span>
        </footer>
    )
}

export default Footer;