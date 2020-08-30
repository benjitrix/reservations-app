import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import LoginGoogle from './Components/LoginGoogle';
import LoginTwitter from './Components/LoginTwitter';
import Reservations from './Components/Reservations'
import Admin from './Components/Admin'
import HallReservations from './Components/HallReservations'
import PrivateRoute from './hocs/PrivateRoute'
import UnPrivateRoute from './hocs/UnPrivateRoute'
import './App.css';

// App routes
function App() {
  return (
    <Router>
      <Navbar />
      <UnPrivateRoute path="/googleLogin" component={LoginGoogle} />
      <UnPrivateRoute path="/twitterLogin" component={LoginTwitter} />
      <HallReservations />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path='/login' component={Login} />
      <UnPrivateRoute path='/register' component={Register} />
      <PrivateRoute path="/reservations" roles={['user', 'admin']} component={Reservations} />
      <PrivateRoute path="/admin" roles={['admin']} component={Admin} />
    </Router>
  );
}

export default App;
