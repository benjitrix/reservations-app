import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../Services/AuthServices'
import Message from './Message'

// user register component
const Register = (props) => {
  const [user, setUser] = useState({username: "", password: "", role: ""});
  const [message, setMessage] = useState(null)
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, []);

  // capture username and password from input boxes, add to array
  const onChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  // resets input boxes to empty
  const resetForm = () => {
      setUser({username: "", password: "", role: ""})
  }

  // Registration for new user using username and password
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then(data => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push('/login')
        }, 2000);
      }
    }) 
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
      <h3>Please register</h3>
      <label htmlFor="username" className="sr-only">Username: </label>
      <input  type="text" 
              name="username" 
              value={user.username}
              onChange={onChange} 
              className="form-control" 
              placeholder="Enter username" />
      <label htmlFor="password" className="sr-only">Password: </label>
      <input  type="password" 
              name="password" 
              value={user.password}
              onChange={onChange} 
              className="form-control" 
              placeholder="Enter password" />
      <label htmlFor="role" className="sr-only">Role: </label>
      <input  type="text" 
              name="role" 
              value={user.role}
              onChange={onChange} 
              className="form-control" 
              placeholder="Enter role (admin/user)" />
      <button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Register
