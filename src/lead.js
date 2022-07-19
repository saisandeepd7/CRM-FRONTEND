import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function Lead() {
  const history = useHistory();
  const [lead, setLead] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState("");
  const [verify, setVerify] = useState(false);

  function AddLead(e) {
    e.preventDefault();
    setDisable(true);
    if (name && mobile && email && status) {
      fetch("https://guvi-crm-hackothon.herokuapp.com/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":
            localStorage.getItem("admintoken") ||
            localStorage.getItem("managertoken")
        },
        body: JSON.stringify({
          client: name,
          mobile_no: mobile,
          email_id: email,

          status: status
        })
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.type) {
            alert(data.message);
            setName("");
            setMobile("");
            setEmail("");
            setDisable(false);
            setStatus("");
            setVerify(!verify);
          } else {
            alert(data.message);
            setDisable(false);
          }
        });
    } else {
      alert("fill all fields");
      setDisable(false);
    }
  }

  function DeleteLead(_id) {
    fetch(`https://guvi-crm-hackothon.herokuapp.com/leadtable/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          localStorage.getItem("admintoken") ||
          localStorage.getItem("managertoken")
      }
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          setVerify(!verify);
        }
      });
  }
  function LoadLead() {
    fetch("https://guvi-crm-hackothon.herokuapp.com/leadtable", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          localStorage.getItem("admintoken") ||
          localStorage.getItem("managertoken") ||
          localStorage.getItem("employeetoken")
      }
    })
      .then((data) => data.json())
      .then((data) => setLead(data));
  }

  useEffect(() => {
    LoadLead();
  }, [verify]);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <br />
        <form className="Myform">
          <div className="form-group">
            <label for="exampleInputName">
              <b>Client Name</b>
            </label>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="enter the client name"
              value={name}
              aria-describedby="emailHelp"
            />
          </div>
          <br />

          <div className="form-group">
            <label for="exampleInputEmail">
              <b>Email_id</b>
            </label>
            <input
              type="url"
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="enter the email_id"
              value={email}
              aria-describedby="emailHelp"
            />
          </div>
          <br />
          <div className="form-group">
            <label for="exampleInputNumber">
              <b>Mobile_No</b>
            </label>
            <input
              type="number"
              onChange={(event) => setMobile(event.target.value)}
              className="form-control"
              id="exampleInputNumber"
              placeholder="enter the Mobile Number"
              value={mobile}
              aria-describedby="emailHelp"
            />
          </div>
          <br />

          <div className="form-group">
            <label for="exampleFormControlSelect1">
              <b>Select Lead Status</b>
            </label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option>----------------------------- \/</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
              <option>Cancelled</option>
              <option>Confirmed</option>
            </select>
          </div>
          {disable === false ? (
            <button
              type="submit"
              className="btn btn-success"
              onClick={(e) => AddLead(e)}
            >
              ADD Lead
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      </div>
      <div className="TableList">
        <h4>LEAD TABLE</h4>
        <table className="table table-striped">
          {lead.length ? (
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client Name</th>
                <th scope="col">Mobile_No</th>
                <th scope="col">Email_id</th>
                <th scope="col">Date&Time</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {lead.length ? (
              lead.map((lead, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{lead.client}</td>
                  <td>{lead.mobile_no}</td>
                  <td>{lead.email_id}</td>
                  <td>{lead.date}</td>
                  <td>{lead.status}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => history.push(`./editlead/${lead._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => DeleteLead(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h3 className="text-center">No Lead</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}