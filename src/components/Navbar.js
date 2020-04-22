import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = props => {
    return (
        <div>
            <Link to="/draft" className="profile-btn">Draft</Link>
            <Link to="/rankings" className="profile-btn">Edit Rankings</Link>
            <Link to="/drafts" className="profile-btn">Previous Drafts</Link>
        </div>
    )
}

export default Navbar