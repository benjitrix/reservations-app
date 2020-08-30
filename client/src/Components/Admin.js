import React, {useState, useContext, useEffect} from 'react'
import ReservationService from '../Services/ReservationService.js'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'
import "../css/Admin.css";

const Admin = (props) => {
  const [reservations, setReservations] = useState([])
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext);
  const [seatNr, setSeatNr] = useState(null)
  const [newSeatNr, setNewSeatNr] = useState(null)

  const { user, setUser, reservation, setReservation, allReservations, setAllReservations } = authContext;
  console.log(user.role)
  console.log(reservation)

  const [seatsA, setSeatsA] = useState([])
  const [seatsB, setSeatsB] = useState([]);
  const [seatsC, setSeatsC] = useState([]);
  const [vacancy, setVacancy] = useState(false)

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
      seat.style.backgroundColor = "green";
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
    if (reservations.length >= 6) {
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

  // capture reservation from delete input box
  const onChangeDelete = (e) => {
        setSeatNr({seat: e.target.value})
  }

  // capture reservation from update input box
  const onChangeUpdate_oldSeat = (e) => {
    setSeatNr({seat: e.target.value})
  }

   // capture reservation from update input box
  const onChangeUpdate_newSeat = (e) => {
    setNewSeatNr({seat: e.target.value})
  }

  // DELETE reservation
  const deleteHandler = (e) => {
    e.preventDefault();
    const seatNrUppercase = (seatNr.seat).toUpperCase()
    allReservations.forEach(item => {
      if (seatNrUppercase === item.seat) {
        const seatToDelete = item._id
        ReservationService.deleteReservation(seatToDelete).then(data => {
          console.log(data)
          const {reservation, message } = data;
          console.log(message.msgBody)
          setMessage(message)
          getReservations(message);
          // resetForm();
        })
      } else {
        setMessage({msgBody: "The reservation you entered for deletion is not occupied" })
      }
    })
  }

  // UPDATE reservation
  const updateHandler = (e) => {
    e.preventDefault();
    const oldSeatNrUppercase = (seatNr.seat).toUpperCase()
    const newSeatNrUppercase = (newSeatNr.seat).toUpperCase()
    allReservations.forEach(item => {
      if (oldSeatNrUppercase === item.seat) {
        const seatToUpdate = item._id
        const newSeat = {seat: newSeatNrUppercase}
        ReservationService.updateReservation(seatToUpdate, newSeat).then(data => {
          console.log(data)
          const {reservation, message } = data;
          console.log(message.msgBody)
          setMessage(message)
          getReservations(message);
        })
      }
    })
  }

  return (
    <div>
      <div className="container">
        <div className="row row-1">
          <div className="col-sm">
            <h5 className="row">Reservations:</h5>
              <ul className=" row list-group">
              {reservations.map((reservation, index) => {
                return (
                  <div className="reservations" key={reservation._id}>
                    <li className="reservation">Seat: {reservation.seat}</li>
                  </div>
                );
              })}
              </ul>    
          </div>
          <div className="col-sm">
          </div>
          <div className="col-sm">
            <div className="colour-key"><div className="vacant key"></div><div className="meaning"><h6>Vacant</h6></div></div>
            <div className="colour-key"><div className="reserved key"></div><div className="meaning"><h6>Reserved</h6></div></div>
            <div className="colour-key"><div className="admin key"></div><div className="meaning"><h6>Admin reservations</h6></div></div>
          </div>
        </div>
        <div className="row row-2">
          <div className="col-4">
            <form>
              <label htmlFor="reservation">
                <h5>Submit Reservation</h5>
              </label>
              <input
                type="text"
                name="reservation"
                value={reservation.seat}
                readOnly
                className="form-control"
                placeholder="Seat to reserve"
              />
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block"
                onClick={submitHandler}
              >
                Submit Reservation
              </button>
            </form>
          </div>
          <div className="col-3">
            <form>
              <label htmlFor="reservation">
                <h5>Delete Reservation</h5>
              </label>
              <input
                type="text"
                name="reservation"
                onChange={onChangeDelete}
                className="form-control"
                placeholder="Enter seat"
              />
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </form>
          </div>
          <div className="col-5">
            <form>
              <label htmlFor="reservation">
                <h5>Update Reservation</h5>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  name="reservation"
                  onChange={onChangeUpdate_oldSeat}
                  className="form-control"
                  placeholder="Enter current seat"
                />
                <input
                  type="text"
                  name="reservation"
                  onChange={onChangeUpdate_newSeat}
                  className="form-control"
                  placeholder="Enter new seat"
                />
              </div>        
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block"
                onClick={updateHandler}
              >
                Update
              </button>
            </form>
          </div>
        </div>
        {message ? <Message message={message} /> : null}
      </div>  
    </div>   
  );
}

export default Admin
