import React, { useState, useContext, useRef, useEffect } from 'react'
import AuthService from '../Services/AuthServices'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'
import twitterIcon from '../images/sign-in-with-twitter.png'

// Twitter login component
const LoginTwitter = (props) => {
  const [user, setUser] = useState({username: "", role: ""})
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext);
  let timerID = useRef(null) 
  
  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  useEffect(() => {
    AuthService.isAuthenticated().then(data => {
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        setMessage({msgBody:`User: ${user} successfully logged in`})
        props.history.push('/reservations')
      }            
  });
    
  }, [])
  
// Login for user with Twitter account 
  return (
    <div>
      <a href="http://localhost:5000/user/auth/twitter">
        <button
          type="button"
          className="btn btn-lg btn-primary btn-block"
        >            
          <img src={twitterIcon} alt="Twitter login"/> 
        </button>
      </a>
      {message ? <Message message={message} /> : null}
    </div>
  );
}

export default LoginTwitter;