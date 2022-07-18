import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
export function EditContact() {
  let { _id } = useParams();
  const history = useHistory();
  const [contact, setContact] = useState({});
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState("");

  function Edit(e) {
    e.preventDefault();
    setDisable(true);
    if (name && mobile && email && status) {
      fetch(`https://guvi-crm.herokuapp.com/contacttable/${_id}`, {
        method: "PATCH",
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
          alert(data.message);
          setName("");
          setMobile("");
          setEmail("");
          setDisable(false);
          setStatus("");
          history.push("/contact");
        });
    } else {
      alert(
        "clear the default value(default value helps you to know what written earlier) and write "
      );
      setDisable(false);
    }
  }

  function LoadOneContact() {
    fetch(`https://guvi-crm.herokuapp.com/contacttable/${_id}`, {
      method: "GET",
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

          history.push("/contact");
        } else {
          setContact(data);
        }
      });
  }

  useEffect(() => {
    LoadOneContact();
  }, []);

  return (
    <div>
      <br />
      {contact._id ? (
        <form className="Editform">
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
              defaultValue={contact.client}
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
              defaultValue={contact.email_id}
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
              defaultValue={contact.mobile_no}
              aria-describedby="emailHelp"
            />
          </div>
          <br />

          <div className="form-group">
            <label for="exampleFormControlSelect1">Select Lead Status</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={contact.status}
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
              onClick={(e) => Edit(e)}
            >
              EDIT CONTACT
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      ) : (
        ""
      )}
    </div>
  );
}