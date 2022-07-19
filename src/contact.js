import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function Contact() {
  const history = useHistory();
  const [contact, setContact] = useState([]);
  const [verify, setVerify] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState("");

  function AddContact(e) {
    e.preventDefault();
    setDisable(true);
    if (name && mobile && email && status) {
      fetch("https://guvi-crm-hackothon.herokuapp.com/contact", {
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

  function DeleteContact(_id) {
    fetch(`https://guvi-crm-hackothon.herokuapp.com/contacttable/${_id}`, {
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
  function LoadContact() {
    fetch("https://guvi-crm-hackothon.herokuapp.com/contacttable", {
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
      .then((data) => setContact(data));
  }

  useEffect(() => {
    LoadContact();
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
              <b>Select Contact Status</b>
            </label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option>----------------------------- \/</option>
              <option>Created</option>
              <option>Open</option>
              <option>In process</option>
              <option>Released</option>
              <option>Cancelled</option>
              <option>Completed</option>
            </select>
          </div>
          {disable === false ? (
            <button
              type="submit"
              className="btn btn-success"
              onClick={(e) => AddContact(e)}
            >
              ADD CONTACT
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      </div>
      <div className="TableList">
        <h5>LIST OF CONTACT</h5>
        <table className="table table-striped">
          {contact.length ? (
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client Name</th>
                <th scope="col">Email_id</th>
                <th scope="col">Mobile_No</th>
                <th scope="col">Date&Time</th>
                <th scope="col">Status</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {contact.length ? (
              contact.map((contact, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{contact.client}</td>
                  <td>{contact.email_id}</td>
                  <td>{contact.mobile_no}</td>
                  <td>{contact.date}</td>
                  <td>{contact.status}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() =>
                        history.push(`/editcontact/${contact._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => DeleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h3 className="text-center">No Contact</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}