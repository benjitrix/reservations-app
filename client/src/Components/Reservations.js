import React, {useState, useContext, useEffect} from 'react'
import ReservationService from '../Services/ReservationService.js'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'
import '../css/Reservations.css'

const Reservations = (props) => {
  const [reservations, setReservations] = useState([])
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext);

  const { user, reservation, setReservation, allReservations } = authContext;
  console.log(user.role)
  console.log(reservation)

  useEffect(() => {
    ReservationService.getReservations().then(data => {
      setReservations(data.reservations)
    })
  }, [])

  useEffect(() => {
    displayUserReservedSeats();
  }, [reservations]);
  
  // show reserved seats
  const displayUserReservedSeats = () => {
      reservations.forEach(item => {
      let seatID = item.seat
      let seat = document.querySelector(`.box-back_${seatID}`);
      seat.style.backgroundColor = "red";
    })
  };

  //  reset todo to empty  
  const resetForm = () => {
    setReservation({seat: ""})
  }

  // GET reservations 
  const getReservations = (message) => {
      // if todo is successfully created
      if (!message.msgError) {
        ReservationService.getReservations().then(getData => {
          setReservations(getData.reservations);
          setMessage(message)
          console.log(reservations)
          console.log(message.msgBody)
        })
        // if JWT token expires
      } else if (message.msgBody === "Unauthorized") {
          setMessage(message);
          authContext.setUser({username: "", role: ""})
          authContext.setIsAuthenticated(false)
      } else {
          setMessage(message) // if user sends empty string
      }
  }
  
  // POST reservation
  const submitHandler = (e) => {
    e.preventDefault()
    if (reservations.length >= 3) {
      setMessage({msgBody: "You have reached the maximum of 3 reservations" });
    } else {
      ReservationService.postReservation(reservation).then(data => {
      console.log('onSubmit:', reservation);
      const { message } = data;
      setMessage(message);
      getReservations(message);
      resetForm();
    })
    }  
  }

  return (
    <div className="container">
      <div className="reserve-input-list">
        <div className="row reservations">
          <div className="col-8">
            <h5>Reservations:</h5>
            <ul className="list-group col-9">
              {reservations.map((reservation, index) => {
                return (
                  <div className="reservations" key={reservation._id}>
                    <li className="reservation">Seat: {reservation.seat}</li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="reservation-key col-3">
            <div className="colour-key"><div className="vacant key"></div><div className="meaning"><h6>Vacant</h6></div></div>
            <div className="colour-key"><div className="reserved key"></div><div className="meaning"><h6>Reserved</h6></div></div>
            <div className="colour-key"><div className="user key"></div><div className="meaning"><h6>Your reservations</h6></div></div>
          </div>
        </div>
        <form>
          <label htmlFor="reservation">
            <h5>Seat Reserved</h5>
          </label>
          <input
            type="text"
            name="todo"
            value={reservation.seat}
            readOnly
            className="form-control"
            placeholder="Reserved seat"
          />
          <button
            type="button"
            className="btn btn-lg btn-primary btn-block"
            onClick={submitHandler}
          >
            Reserve
          </button>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </div>
  );
}

export default Reservations
