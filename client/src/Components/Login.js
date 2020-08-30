import React, {useState, useContext} from 'react';
import AuthService from '../Services/AuthServices'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'

// user login component
const Login = (props) => {
  const [user, setUser] = useState({username: "", password: "", role: ""});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  // capture username and password from input boxes, add to array
  const onChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  // Login for user registered user using username and password
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      console.log(data)
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        if (user.role === "user") {
          props.history.push('/reservations');
        } else {
          props.history.push("/admin");
        }
      } else {
        setMessage(message);
      }
    }) 
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
      <h3>Please sign in</h3>
      <label htmlFor="username" className="sr-only">Username: </label>
      <input  type="text" 
              name="username" 
              onChange={onChange} 
              className="form-control" 
              placeholder="Enter username" />
      <input  type="password" 
              name="password" 
              onChange={onChange} 
              className="form-control" 
              placeholder="Enter password" />

      <button type="submit" className="btn btn-lg btn-primary btn-block">Log in</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Login
