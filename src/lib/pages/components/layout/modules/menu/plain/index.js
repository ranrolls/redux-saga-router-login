import React from 'react'
import { Link } from "react-router-dom";
import './plain.css'
const PlainNav = () => {
    return (
        <div>
            <Link to="/">Index</Link>
            <Link to="/index">Index</Link>
            <Link to="/index/about">About</Link>
            <Link to="/index/login">Login</Link>
            <Link to="/indexp">P</Link>
            <Link to="/index/ca">Cancel-Async</Link>
            <Link to="/index/ac">Async-Counter</Link>
            <Link to="/index/extra">Extra</Link>
        </div>
    )
}
export default PlainNav
