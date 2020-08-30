import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../Services/AuthServices'

export const AuthContext = createContext()

// Sets global variables accessible to all components
export default ({ children }) => {
  const [user, setUser] = useState({username: "", role: ""});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reservation, setReservation] = useState({seat: "", vacant: true, role: ""})
  const [allReservations, setAllReservations] = useState([])

  useEffect(() => {
      AuthService.isAuthenticated().then(data => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true)
      });
  }, [])

  return (
    <div>
      {!isLoaded ? <h1>Loading...</h1> :
        <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, reservation, setReservation, allReservations, setAllReservations}}>
          {children}
        </AuthContext.Provider>}
    </div>
  )
}
