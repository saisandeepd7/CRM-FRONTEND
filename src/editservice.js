import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
export function EditService() {
  let { _id } = useParams();
  const history = useHistory();
  const [service, setService] = useState({});
  const [name, setName] = useState("");
  const [problem, setProblem] = useState("");
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState("");

  function Edit(e) {
    e.preventDefault();
    setDisable(true);
    if (name && problem && status) {
      fetch(`https://guvi-crm.herokuapp.com/servicetable/${_id}`, {
        method: "PATCH",
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
          alert(data.message);
          setName("");
          setProblem("");
          setDisable(false);
          setStatus("");
          history.push("/service");
        });
    } else {
      alert(
        "clear the default value(default value helps you to know what written earlier) and write "
      );
      setDisable(false);
    }
  }

  function LoadOneService() {
    fetch(`https://guvi-crm.herokuapp.com/servicetable/${_id}`, {
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

          history.push("/service");
        } else {
          setService(data);
        }
      });
  }

  useEffect(() => {
    LoadOneService();
  }, []);

  return (
    <div>
      <br />
      {service._id ? (
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
              defaultValue={service.client}
              aria-describedby="emailHelp"
            />
          </div>
          <br />
          <div className="form-group">
            <label for="exampleInputNumber">
              <b>Describe the Issue</b>
            </label>
            <textarea
              type="text"
              rows="5"
              cols="33"
              onChange={(event) => setProblem(event.target.value)}
              className="form-control"
              id="exampleInputNumber"
              placeholder="enter the Issue"
              defaultValue={service.problem}
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
              defaultValue={service.status}
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
              EDIT SERVICE REQUEST
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      ) : (
        "hai"
      )}
    </div>
  );
}