import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

export default function ForgetPassword() {
  const history = useHistory();
  const [email_id, setemail_id] = useState("");
  const [disable, setDisable] = useState(false);
  const handleSubmit = () => {
    setDisable(true);
    if (email_id) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://guvi-crm-hackothon.herokuapp.com/forgetpassword", {
        method: "POST",
        body: JSON.stringify({ email_id }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message) {
            alert(data.message);
            setDisable(false);
            history.push("./login");
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
    <div>
      <div className="container-md forget-password">
        <div className="row">
          <div className="col-md-12 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <img
                    className="Icon"
                    src="http://cdn.onlinewebfonts.com/svg/img_398183.png"
                    alt="password"
                    border="0"
                  />
                  <h2 className="text-center">Reset Password</h2>
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
                    </div>
                    <p className="text-danger">
                      Link will be valid for only an hour
                    </p>
                    <p className="text-secondary">
                      Kindly check inside the <b>Spam</b>
                    </p>
                    <div className="form-group">
                      {disable === false ? (
                        <input
                          className="btn btn-lg btn-primary btn-block"
                          value="Send email_id"
                          type="button"
                          onClick={handleSubmit}
                        />
                      ) : (
                        <div
                          className="spinner-border text-danger"
                          role="status"
                        ></div>
                      )}
                      <br />
                      <input
                        className="btn btn-secondary"
                        value="Back"
                        type="button"
                        onClick={() => history.goBack()}
                      />
                    </div>
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