import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./App.css";

export default function ResetPassword() {
  let { id } = useParams();
  let { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const handleSubmit = () => {
    setDisable(true);
    if (password) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch(`https://guvi-crm.herokuapp.com/resetpassword/${id}/${token}`, {
        method: "POST",
        body: JSON.stringify({ password: password }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message) {
            alert(data.message);
            setDisable(false);
            history.push("/login");
          } else {
            alert(data.error);
            setDisable(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter the fields");
      setDisable(false);
    }
  };

  return (
    <div className="container-md forget-password">
      <div className="row">
        <div className="col-md-12 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <img
                  className="Icon"
                  src="http://cdn.onlinewebfonts.com/svg/img_398183.png"
                  alt="signup"
                  border="0"
                />
                <h2 className="text-center">New Password</h2>
                <div autocomplete="off" className="form">
                  <br />
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        placeholder="New Password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    {disable === false ? (
                      <input
                        className="btn btn-lg btn-primary btn-block"
                        value="Reset Password"
                        type="button"
                        onClick={handleSubmit}
                      />
                    ) : (
                      <div
                        className="spinner-border text-danger"
                        role="status"
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}