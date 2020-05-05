import React from 'react'
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = props => {
    return (
        <div className='navbar'>
            <Link to="/draft" className="nav-link">Draft</Link>
            <Link to="/rankings/2" className="nav-link">Edit Rankings</Link>
            <Link to="/drafts" className="nav-link">Previous Drafts</Link>
        </div>
    )
}

export default Navbar