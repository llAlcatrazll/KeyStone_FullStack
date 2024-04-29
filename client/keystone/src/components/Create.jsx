import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    eventname: "",
    event_purpose: "",
    event_date: "",
    starting_time: "",
    ending_time: "",
    event_facility: "",
    username: "",
    designation: "",
    college_affiliation: "",
    club: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/create_booking", values)

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
            <label htmlFor="">Event Name</label>
            <input
              type="text"
              name="eventname"
              onChange={(e) =>
                setValues({ ...values, eventname: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Event Purpose</label>
            <input
              type="text"
              name="event_purpose"
              onChange={(e) =>
                setValues({ ...values, event_purpose: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Event Date</label>
            <input
              // event_date
              type="text"
              name="event_date"
              onChange={(e) =>
                setValues({ ...values, event_date: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Starting Time</label>
            <input
              // starting_time
              type="text"
              name="starting_time"
              onChange={(e) =>
                setValues({ ...values, starting_time: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Ending Time</label>
            <input
              // ending_time
              type="text"
              name="ending_time"
              onChange={(e) =>
                setValues({ ...values, ending_time: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Event Facility</label>
            <input
              type="text"
              name="event_facility"
              onChange={(e) =>
                setValues({ ...values, event_facility: e.target.value })
              }
            />
          </div>
          <div>.</div>
          <button>Autofill</button>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={(e) =>
                setValues({ ...values, designation: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">College Afiliation</label>
            <input
              type="text"
              name="college_afiliation"
              onChange={(e) =>
                setValues({ ...values, college_afiliation: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Club</label>
            <input
              type="text"
              name="club"
              onChange={(e) => setValues({ ...values, club: e.target.value })}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
