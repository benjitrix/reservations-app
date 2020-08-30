// CRUD Reservation routes 
export default {
  getReservations: () => {
    return fetch('/user/reservations')
      .then(res => {
        if (res.status != 401) {
          return res.json().then(data => data)
        } else {
          return {message: {msgBody: "Unauthorized"}, msgError: true}
        }
      })
  },
  getAllReservations: () => {
    return fetch('/user/reservations/all')
      .then(res => {
        if (res.status != 401) {
          return res.json().then(data => data)
        } else {
          return {message: {msgBody: "Unauthorized"}, msgError: true}
        }
      })
  },
  postReservation: reservation => {
    return fetch('/user/reservation', {
      method: "POST",
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status != 401) {
        return res.json().then(data => data)
      } else {
        return {message: {msgBody: "Unauthorized"}, msgError: true}
      }
    })
  },
  deleteReservation: (id) => {
    return fetch(`/user/delete/reservation/${id}`)
      .then(res => {
        if (res.status != 401) {
          return res.json().then(data => data)
        } else {
          return {message: {msgBody: "Unauthorized"}, msgError: true}
        }
      })
  },
  updateReservation: (id, reservation) => {
    console.log(id + " " + reservation)
    return fetch(`/user/update/reservation/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
        if (res.status != 401) {
          return res.json().then(data => data);
        } else {
          return {message: {msgBody: "Authorized"}, msgError: false}
        }
    });
  }
}