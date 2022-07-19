import { useEffect, useState } from "react";

export function UserType() {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [verify, setVerify] = useState(false);
  const [disable, setDisable] = useState(false);
  function AddUser(e) {
    e.preventDefault();
    setDisable(true);
    if (email && type) {
      fetch("https://guvi-crm-hackothon.herokuapp.com/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("admintoken")
        },
        body: JSON.stringify({
          email_id: email,
          type: type
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setDisable(false);
          setEmail("");
          setType("");
          setVerify(!verify);
        });
    } else {
      alert("enter all field");
      setDisable(false);
    }
  }

  function LoadUser() {
    fetch("https://guvi-crm-hackothon.herokuapp.com/listuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("admintoken")
      }
    })
      .then((data) => data.json())
      .then((data) => setUser(data));
  }

  useEffect(() => {
    LoadUser();
  }, [verify]);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <br />
        <form className="Myform">
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

          <br />

          <div className="form-group">
            <label for="exampleFormControlSelect1">Select Lead Status</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option>----------------------------- \/</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Employee</option>
            </select>
          </div>
          {disable === false ? (
            <button
              type="submit"
              className="btn btn-success"
              onClick={(e) => AddUser(e)}
            >
              ADD USER
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      </div>
      <div className="TableList">
        <h4>User List(only they can signup/login)</h4>
        <table className="table table-striped">
          {user.length ? (
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email_id</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {user.length ? (
              user.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>

                  <td>{user.email_id}</td>
                  <td>{user.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h3 className="text-center">No User</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}