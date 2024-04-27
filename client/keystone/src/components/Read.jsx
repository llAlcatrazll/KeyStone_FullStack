import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_booking/${id}`)
      // modify for the whole URL to avoid navigation confusion
      .then((res) => {
        // console.log(res.data); // Add this line to inspect the response
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      <h1>User Details</h1>
      {Array.isArray(data) &&
        data.map((student, index) => {
          return (
            <ul key={index} className="list-group">
              <li>
                <b>ID: </b>
                {student["id"]}
              </li>
              <li>
                <b>Name: </b>
                {student["name"]}
              </li>
              <li>
                <b>Email: </b>
                {student["email"]}
              </li>
              <li>
                <b>Age: </b>
                {student["age"]}
              </li>
              <li>
                <b>Gender: </b>
                {student["gender"]}
              </li>
            </ul>
          );
        })}
    </div>
  );
}

export default Read;
