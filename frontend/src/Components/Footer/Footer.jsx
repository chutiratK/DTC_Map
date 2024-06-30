import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/2-15.svg'
import ig_icon from '../Assets/ig_icon.webp'
import tt_icon from '../Assets/tt_icon.png'
import yt_icon from '../Assets/yt_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt=''/>
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={yt_icon} alt=''/>
            </div>
            <div className="footer-icons-container">
                <img src={tt_icon} alt=''/>
            </div>
            <div className="footer-icons-container">
                <img src={ig_icon} alt=''/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2024 - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer