import React, { useRef, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import mapIcon from '../../Assets/map.png'

const Navbar = () => {
  const [menu, setMenu] = useState("home")
  const menuRef = useRef();

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={mapIcon} alt="logo" />
            <p>Map DTC</p>
        </div>
        <ul ref={menuRef} className='nav-menu'>
           <li onClick={()=>{setMenu('home')}}><Link to='/' style={{textDecoration:'none'}}>HOME</Link>{menu==='home'? <hr/> : <></>}</li>
           <li onClick={()=>{setMenu('add')}}><Link to='/addLocation' style={{textDecoration:'none'}}>ADD LOCATIONS</Link>{ menu==='add'? <hr/> : <></>}</li>
        </ul>
    </div>
  )
}

export default Navbar
