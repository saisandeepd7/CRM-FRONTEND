import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function Service() {
  const history = useHistory();
  const [service, setService] = useState([]);
  const [verify, setVerify] = useState(false);
  const [name, setName] = useState("");
  const [problem, setProblem] = useState("");
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState("");

  function AddService(e) {
    e.preventDefault();
    setDisable(true);
    if (name && problem && status) {
      fetch("https://guvi-crm-hackothon.herokuapp.com/service_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          "x-auth-token":
            localStorage.getItem("admintoken") ||
            localStorage.getItem("managertoken")
        },
        body: JSON.stringify({
          client: name,
          problem: problem,

          status: status
        })
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.type) {
            alert(data.message);
            setName("");
            setProblem("");
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

  function DeleteService(_id) {
    fetch(`https://guvi-crm-hackothon.herokuapp.com/servicetable/${_id}`, {
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
  function LoadService() {
    fetch("https://guvi-crm-hackothon.herokuapp.com/servicetable", {
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
      .then((data) => setService(data));
  }

  useEffect(() => {
    LoadService();
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
            <label for="exampleInputNumber">
              <b>Discribe the Issue</b>
            </label>
            <textarea
              type="text"
              onChange={(event) => setProblem(event.target.value)}
              className="form-control"
              id="exampleInputNumber"
              placeholder="enter the issue Number"
              value={problem}
              rows="5"
              cols="33"
              aria-describedby="emailHelp"
            />
          </div>
          <br />

          <div className="form-group">
            <label for="exampleFormControlSelect1">
              <b>Select Service Request Status</b>
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
              onClick={(e) => AddService(e)}
            >
              ADD SERVICE REQUEST
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      </div>
      <div className="TableList">
        <h5>LIST OF SERVICE REQUEST</h5>
        <table className="table table-striped">
          {service.length ? (
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client Name</th>
                <th scope="col">Problem</th>

                <th scope="col">Date&Time</th>
                <th scope="col">Status</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {service.length ? (
              service.map((service, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{service.client}</td>
                  <td>{service.problem}</td>
                  <td>{service.date}</td>
                  <td>{service.status}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() =>
                        history.push(`/editservice/${service._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => DeleteService(service._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h3 className="text-center">No Service Request</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}