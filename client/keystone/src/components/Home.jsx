import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("http://localhost:5000/booking")
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
        <Link to="/create">Create Booking</Link>
      </div>
      <table>
        <thead>
          <tr className="grid grid-flow-col justify-stretch w-screen">
            <th>ID</th>
            <th className="w-96">Name</th>
            <th className="w-56">Email</th>
            <th className="w-56">Age</th>
            <th className="w-56">Gender</th>
            <th className="w-56">Status</th>
            <th className="w-56">is Active</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <tbody>
        {Array.isArray(data) &&
          data.map((student) => {
            return (
              <tr key={student.id}>
                <td className="w-56">{student.id}</td>
                <td className="w-56">{student.name}</td>
                <td className="w-56">{student.email}</td>
                <td className="w-56">{student.age}</td>
                <td className="w-56">{student.gender}</td>
                <td className="w-56">{student.status}</td>
                <td className="w-56">{student.Deleted}</td>
                <td className="w-56">
                  <Link to={`/read/${student.id}`}>Read</Link>
                  <Link to={`/edit/${student.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        {/* {data.map((student) => {
            
          })} */}
      </tbody>
    </div>
  );
}

export default Home;
