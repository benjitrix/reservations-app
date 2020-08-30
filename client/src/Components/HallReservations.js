import React, {useState, useContext, useEffect} from 'react'
import ReservationService from '../Services/ReservationService.js'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'
import '../css/AllReservations.css'


const HallReservations = ({ onCountChange = () => {} }) => {
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext);
  const [seatNr, setSeatNr] = useState(null)

  const { user, setUser, reservation, setReservation, allReservations, setAllReservations } = authContext;

  const [seatsA, setSeatsA] = useState([])
  const [seatsB, setSeatsB] = useState([]);
  const [seatsC, setSeatsC] = useState([]);

  useEffect(() => {
    populateHall()
    ReservationService.getAllReservations().then(data => {
      setAllReservations(data.allreservations);
    })
  }, [])

  useEffect(() => {
    displayOccupiedSeats()
  }, [allReservations])

  // Populate seats
  const populateHall = () => {
    let arrA = []; let arrC = [];
    Array.apply(null, { length: 24 }).map((e, i) => {
      arrA.push({ id: `A${i+1}`, vacancy: true });
      arrC.push({ id: `C${i+1}`, vacancy: true  });
      setSeatsA(arrA);
      setSeatsC(arrC);
    })
    let arrB = [];
    Array.apply(null, { length: 56 }).map((e, i) => {
      arrB.push({ id: `B${i+1}`, vacancy: true });
      setSeatsB(arrB);
    });
  }

  // show reserved seats
  const displayOccupiedSeats = () => {
      allReservations.forEach((item, i) => {
        let seatID = item.seat
        let seat = document.querySelector(`.inner-box_${seatID}`);
        seat.style.transform = "rotateY(180deg)";
        seat.style.pointerEvents = "none";
    })
  };

    // Select seat
  const onSeatReserve = (i, id) => (e) => {
    if (user.role !== "") {
      const seat = e.currentTarget
      seat.style.transform = "rotateY(180deg)";
      const x = seat.className;
      setSeatNr(x.slice(x.indexOf("_") + 1, x.length));
      let allSeats = [...seatsA, ...seatsB, ...seatsC];
      let isVacant = allSeats[i].vacancy
      isVacant = false
      console.log(id, allSeats[i].vacancy, x);
      setReservation({seat: id, vacant: isVacant, role: user.role})
      console.log(reservation)
    } 
  }; 

  
  return (
    <div className="container hall_dashboard">
      <div className="hall">
        <div className="hall1">
          {seatsA.map((e, i) => (
            <div className="seats" key={i}>
              <div className={`flip-box box_A${i+1}`}>
                  <div className={`flip-box-inner inner-box_A${i+1}`} onClick={onSeatReserve(i, e.id)}>
                    <div className="flip-box-front">
                      <h2 className="symbol">{e.id}</h2>
                    </div>
                    <div className={`flip-box-back box-back_A${i+1}`}>
                      <h2 >R</h2>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hall2">
          {seatsB.map((e, i) => (
            <div className="seats" key={i}>
              <div className={`flip-box box_B${i+1}`}>
                  <div className={`flip-box-inner inner-box_B${i+1}`} onClick={onSeatReserve(i, e.id)}>
                    <div className="flip-box-front">
                      <h2 className="symbol">{e.id}</h2>
                    </div>
                    <div className={`flip-box-back box-back_B${i+1}`}>
                      <h2 >R</h2>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hall3">
          {seatsC.map((e, i) => (
            <div className="seats" key={i}>
              <div className={`flip-box box_C${i+1}`}>
                  <div className={`flip-box-inner inner-box_C${i+1}`} onClick={onSeatReserve(i, e.id)}>
                    <div className="flip-box-front">
                      <h2 className="symbol">{e.id}</h2>
                    </div>
                    <div className={`flip-box-back box-back_C${i+1}`}>
                      <h2 >R</h2>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default HallReservations
