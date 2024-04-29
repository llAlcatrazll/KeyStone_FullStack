import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Adminpanel() {
  const [venueData, setVenueData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isPending, setIsPending] = useState([]);
  const [isApproved, setIsApproved] = useState([]);
  const [isDenied, setIsDenied] = useState([]);
  /*
HAVE THE ABILITY TO HIDE USER AND VENUE DATA TO FOCUS ON BOOKINGS

*/
  useEffect(() => {
    // PULLING VENUE DATA
    axios
      .get("http://localhost:5000/venues")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVenueData(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));

    // PULLING USER DATA
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUserData(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
    // PENDING BOOKINGS
    axios
      .get("http://localhost:5000/booking_pending")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsPending(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
    // APPROVED BOOKINGS
    axios
      .get("http://localhost:5000/booking_approved")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsApproved(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
    // DENIED BOOKINGS
    axios
      .get("http://localhost:5000/booking_denied")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsDenied(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="bg-slate-900 min-w-full ps-8 ">test</div>
      <div className="">
        <h1>Admin Panel</h1>
        <div>
          <div className="flex flex-row">
            <div className="bg-slate-950 ps-8 ">
              <table>
                <thead>
                  <tr className="w-52">Venue</tr>
                  <tr>
                    <th className="w-72">Venue ID</th>
                    <th className="w-72">Venue Name</th>
                  </tr>
                </thead>
                <tbody>
                  {venueData.map((venue) => (
                    <tr key={venue.venue_id}>
                      <td className="w-52">{venue.venue_id}</td>
                      <td className="w-52">{venue.venue_name}</td>
                      <td className="w-52">
                        <Link to={`/read/${venue.venue_id}`}>Read</Link>
                        <Link to={`/edit/${venue.venue_id}`}>Edit</Link>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="justify-center w-5/6 bg-slate-900 ps-8 ">
              <table>
                <thead>
                  <tr className="text-justify">Users</tr>
                  <tr>
                    <th className="w-36">User Id</th>
                    <th className="w-36">Username</th>
                    <th className="w-36">Email</th>
                    <th className="w-36">Club</th>
                    <th className="w-36">Account Type</th>
                    <th className="w-36">Position</th>
                    <th className="w-36">College Affiliation</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className="w-56">{user.id}</td>
                      <td className="w-56">{user.username}</td>
                      <td className="w-80">{user.email}</td>
                      <td className="w-56">{user.club}</td>
                      <td className="w-80">{user.account_type}</td>
                      <td className="w-56">{user.position}</td>
                      <td className="w-56">{user.college_affiliation}</td>
                      <td className="w-56">
                        <Link to={`/read/${user.id}`}>Read</Link>
                        <Link to={`/edit/${user.id}`}>Edit</Link>
                      </td>
                      <td className="w-56">
                        {" "}
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Link to={"/"}>
            <button>Back</button>
          </Link>
          <div className="w-full bg-indigo-900 h-96 ps-8 ">
            <div className="flex flex-row justify-center">
              <div className="w-96 bg-gray-900 rounded-md text-center">
                Pending
                <div>
                  {isPending.map((venue) => (
                    <tr key={venue.venue_id}>
                      <td className="w-28 text-xs ">{venue.eventname}</td>
                      <td className="w-28 text-xs ">{venue.event_date}</td>
                      <td className="w-28 text-xs ">
                        {venue.college_afiliation}
                      </td>
                      <td className="w-28 text-xs ">{venue.event_facility}</td>
                      <td className="w-28 text-xs ">
                        <Link to={`/read/${venue.venue_id}`}>Read</Link>
                        <Link to={`/edit/${venue.venue_id}`}>Edit</Link>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </div>
              </div>
              <div className="w-96 bg-gray-900 rounded-md text-center ml-14 mr-14">
                Approved
                <div>
                  {" "}
                  {isApproved.map((venue) => (
                    <tr key={venue.venue_id}>
                      <td className="w-28 text-xs ">{venue.eventname}</td>
                      <td className="w-28 text-xs ">{venue.event_date}</td>
                      <td className="w-28 text-xs ">
                        {venue.college_afiliation}
                      </td>
                      <td className="w-28 text-xs ">{venue.event_facility}</td>
                      <td className="w-28 text-xs ">
                        <Link to={`/read/${venue.venue_id}`}>Read</Link>
                        <Link to={`/edit/${venue.venue_id}`}>Edit</Link>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </div>
              </div>
              <div className="w-96 bg-gray-900 rounded-md text-center">
                Denied
                <div>
                  {" "}
                  {isDenied.map((venue) => (
                    <tr key={venue.venue_id}>
                      <td className="w-28 text-xs ">{venue.eventname}</td>
                      <td className="w-28 text-xs ">{venue.event_date}</td>
                      <td className="w-28 text-xs ">
                        {venue.college_afiliation}
                      </td>
                      <td className="w-28 text-xs ">{venue.event_facility}</td>
                      <td className="w-28 text-xs ">
                        <Link to={`/read/${venue.venue_id}`}>Read</Link>
                        <Link to={`/edit/${venue.venue_id}`}>Edit</Link>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminpanel;
