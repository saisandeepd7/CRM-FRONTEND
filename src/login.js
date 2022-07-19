import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

export default function Login({
  setmanagerToken,
  setEmployeeToken,
  setAdminToken,
  setType
}) {
  const history = useHistory();
  const [email_id, setemail_id] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const handleSubmit = () => {
    setDisable(true);
    if (email_id && password) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://guvi-crm-hackothon.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify({ email_id, password }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.token) {
            if (data.type === "Admin") {
              localStorage.setItem("admintoken", data.token);
              setAdminToken(data.token);
              setType(data.type);
            } else if (data.type === "Manager") {
              localStorage.setItem("managertoken", data.token);
              setmanagerToken(data.token);
              setType(data.type);
            } else {
              localStorage.setItem("employeetoken", data.token);
              setEmployeeToken(data.token);
              setType(data.type);
            }
            setDisable(false);
            alert(data.message);
            setemail_id("");
            setPassword("");
            history.push("/lead");
          } else {
            alert(data.message);
            setDisable(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setDisable(false);
      alert("Please enter the fields");
    }
  };
  return (
    <div className="container-md forget-password">
      <div className="row">
        <div className="col-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <img
                  className="Icon"
                  src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
                  alt="login"
                  border="0"
                />
                <h2 className="text-center">Login</h2>
                <div autocomplete="off" className="form">
                  <br />
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        placeholder="email_id"
                        className="form-control"
                        type="text"
                        value={email_id}
                        onChange={(e) => setemail_id(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <input
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-success" onClick={handleSubmit}>
                      {disable === false ? (
                        "Login"
                      ) : (
                        <div
                          className="spinner-border text-danger"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => history.push("/signup")}
                >
                  Signup
                </button>
                <button
                  className="btn btn-danger ml-4"
                  onClick={() => history.push("/forgetpassword")}
                >
                  Forgot Password
                </button>
                <div>DEMO</div>
                <div>
                  <b>Admin</b> email_id=123@gmail.com ,password=123456
                </div>
                <div>
                  <b> Manager</b> email_id=456@gmail.com ,password=123456
                  ,password=welcome
                </div>
                <div>
                  <b>Employee</b> email_id=789@gmail.com ,password=123456
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}