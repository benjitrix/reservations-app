import React, { useState, useContext, useRef, useEffect } from 'react'
import AuthService from '../Services/AuthServices'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'
import { GoogleLogin } from "react-google-login";

// Google login component
const LoginGoogle = (props) => {
  const [user, setUser] = useState({username: "", role: ""})
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext);
  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);
  
// Login for user with Gmail account using 'react-google-login'
const responseSuccessGoogle = (response) => {
  const googleUserToken = response.tokenId
  const role = "user"; // needed during registration
  AuthService.googleLogin(googleUserToken, role).then(data => {
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        setMessage({msgBody:`User: ${user} successfully logged in`})
        props.history.push('/reservations')
      } else if (message.msgError === false) {
        setMessage(message)
        timerID = setTimeout(() => {
          props.history.push('/login')
        }, 2000);
      } else {
        setMessage(message)
      }       
  });
};

const responseErrorGoogle = (response) => {
  console.log(response);
}

  return (
    <div>
      <GoogleLogin
        clientId="420666988303-649msd0n7q2l6v4hq4n3lflq9jlgo0jo.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
        className="btn btn-lg btn-primary btn-block"
      />
      {message ? <Message message={message} /> : null}
    </div>
  );
}

export default LoginGoogle;