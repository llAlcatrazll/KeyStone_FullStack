import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  // useEffect(() => {
  //   if (deleted) {
  //     setDeleted(false);
  //     axios
  //       .get("http://localhost:5000/booking")
  //       .then((res) => {
  //         if (Array.isArray(res.data)) {
  //           setData(res.data);
  //         } else {
  //           console.error("Expected an array but received:", res.data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [deleted]);
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("http://localhost:5000/venue_bookings")
        .then((res) => {
          if (Array.isArray(res.data)) {
            setData(res.data);
          } else {
            console.error("Expected an array but received:", res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);
  function handleDelete(id) {
    axios
      .post(`http://localhost:5000/delete_user/${id}`)
      .then((res) => {
        console.log(res.data);
        // Optionally, refresh the data or remove the deleted item from the state
        setDeleted(true); // Trigger a re-fetch of the data
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h3>Bookings</h3>
      <div>
        <Link to="/create">
          <button>Create Booking</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr className="grid grid-flow-col justify-stretch w-screen">
            <th className="w-20">.</th>
            <th className="w-20 text-xs">Booking ID</th>
            <th className="w-20 text-xs">Requested by</th>
            <th className="w-20 text-xs">College</th>
            <th className="w-20 text-xs">Event Date</th>
            <th className="w-20 text-xs">Starting Time</th>
            <th className="w-20 text-xs">Eding Time</th>
            <th className="w-20 text-xs">Event Facility</th>
            <th className="w-20 text-xs">Event Name</th>
            <th className="w-20 text-xs">Event Purpose</th>
            <th className="w-20 text-xs">Event Status</th>
            <th className="w-20 text-xs">Actions</th>
          </tr>
        </thead>
      </table>
      <tbody>
        {Array.isArray(data) &&
          data.map((venue) => {
            return (
              <tr key={venue.id}>
                <td className="w-56">{venue.booking_id}</td>
                <td className="w-56">{venue.booker_id}</td>
                <td className="w-56">{venue.username}</td>
                <td className="w-56">{venue.eventname}</td>
                <td className="w-56">{venue.event_purpose}</td>
                <td className="w-56">{venue.event_date}</td>
                <td className="w-56">{venue.starting_time}</td>
                <td className="w-56">{venue.ending_time}</td>
                <td className="w-56">{venue.event_facility}</td>

                <td className="w-56">{venue.designation}</td>
                <td className="w-56">{venue.college_afiliation}</td>
                <td className="w-56">{venue.status}</td>
                <td className="w-56">{venue.club}</td>
                <td className="w-56">
                  <Link to={`/read/${venue.booking_id}`}>Read</Link>
                  <Link to={`/edit/${venue.booking_id}`}>Edit</Link>
                  <button onClick={() => handleDelete(venue.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        {/* {data.map((student) => {
            
          })} */}
      </tbody>
      <Link to={`/Adminpanel`}>
        <button>Admin Controls</button>
      </Link>
    </div>
  );
}

export default Home;
