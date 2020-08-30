import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../Services/AuthServices'
import { AuthContext } from '../Context/AuthContext'

// Navbar component
const  Navbar = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    setUser(user)
  }, [user])

  // LOGOUT function
  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    })
  };

  // Navbar: unauthenticated
  const unauthenticatedNavBar = () => {
    return (
        <>
          <Link to="/">
            <li className="nav-item nav-link">
              Home
            </li>
          </Link>
          <Link to="/login">
            <li className="nav-item nav-link">
              Login
            </li>
          </Link>
          <Link to="/register">
            <li className="nav-item nav-link">
              Register
            </li>
          </Link>
          <Link to="/googleLogin">
            <li className="nav-item nav-link">
              Login/Register with Google
            </li>
          </Link>
          <Link to="/twitterLogin">
            <li className="nav-item nav-link">
              Login/Register with Twitter
            </li>
          </Link>
        </>
    )
  }

  // Navbar: authenticated
  const authenticatedNavBar = () => {
    return (
        <>
          <Link to="/">
            <li className="nav-item nav-link">
              Home
            </li>
          </Link>
          { 
            user.role === 'user' ?
            <Link to="/reservations">
            <li className="nav-item nav-link">
              Reservations
            </li>
          </Link> : null
          }
          {
            user.role === 'admin' ?
            <Link to="/admin">
            <li className="nav-item nav-link">
              Admin
            </li>
          </Link> : null
          }
          <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>Logout</button>
          <li className="nav-item nav-link">User: {user.username}</li>
        </>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/">
      <div className="navbar-brand">Dashboard</div>
    </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
