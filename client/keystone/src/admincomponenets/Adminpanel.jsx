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
  //
  //  STORE DATA FOR NEW VENUE
  const [values, setValues] = useState({
    venue_name: "",
  });
  //
  // ADD A NEW VENUE TO DATABASE
  //
  function handleSubmit() {
    // function handleSubmit(e) {
    // e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:5000/add_venue", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  //
  // ADD NEW USER
  const [uservalues, setUserValues] = useState({
    email: "",
    password: "",
    username: "",
    college_affiliation: "",
    club: "",
    position: "",
    account_type: "",
  });
  function handleuserSubmit() {
    // function handleSubmit(e) {
    // e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:5000/add_newuser", uservalues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }

  return (
    <>
      <div className="bg-slate-900 min-w-full ps-8 "></div>
      <div className="">
        <h1>Admin Panel</h1>
        <div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="bg-slate-950 ps-8 h-full ">
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
              <div>
                <Link>
                  <button>Add Venue</button>
                </Link>
              </div>
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
                  <component />
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

          <div className="w-full bg-indigo-900 h-96 ps-8 ">
            <div className="flex flex-row justify-center">
              <div className="w-96 bg-gray-900 rounded-md text-center">
                Pending
                <hr />
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
                <hr />
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
                <hr />
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

          <button>Back</button>
          <div className="flex flex-row">
            <div className="bg-gray-500 w-96 p-10 pr-10">
              <form action="" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="">Add Venue</label>
                  <input
                    type="text"
                    name="venue_name"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        venue_name: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
            {/* 
            // 
            // 
            // 
            //  */}
            <div className="ml-20 bg-slate-600 h-80 p-10 pt-10">
              Right
              <form action="" onSubmit={handleuserSubmit}>
                <div>
                  <label htmlFor="">Event Name</label>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Event Name</label>
                  <input
                    type="text"
                    name="password"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Event Name</label>
                  <input
                    type="text"
                    name="username"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Event Name</label>
                  <input
                    type="text"
                    name="college_affiliation"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        college_affiliation: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Event Name</label>
                  <input
                    type="text"
                    name="club"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        club: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Event Name</label>
                  <input
                    type="text"
                    name="position"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        position: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Event Name</label>
                  <input
                    type="text"
                    name="account_type"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        account_type: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminpanel;
