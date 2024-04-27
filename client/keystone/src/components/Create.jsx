import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/add_user", values)

      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  return (
    <div>
      <div>
        <h3>Add A Booking</h3>
        <button>
          <Link to="/">Home</Link>
        </button>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Age</label>
            <input
              type="text"
              name="age"
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Gender</label>
            <input
              type="text"
              name="gender"
              onChange={(e) => setValues({ ...values, gender: e.target.value })}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
