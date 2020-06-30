import React from 'react'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component {
    render(){
        return(
            <nav className='nav'>
                <ul>
                <li>
                    <NavLink to='/' exact  activeStyle={{color:"blue"}} activeClassName='active'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/new' exact activeStyle={{color:"blue"}} activeClassName='active'>New Tweet</NavLink>
                </li>
                </ul>                
            </nav>
        )
    }
}

export default Nav 