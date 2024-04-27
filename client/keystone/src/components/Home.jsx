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
  return (
    <div>
      <h3>Bookings</h3>
      <div>
        <Link to="/create">Create Booking</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>
                    <Link to={`/read/${student.id}`}>Read</Link>
                    <Link to={`/edit/${student.id}`}>Edit</Link>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          {/* {data.map((student) => {
            
          })} */}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
