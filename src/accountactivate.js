import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
export function Activate() {
  const history = useHistory();
  const { email_id } = useParams();
  const { token } = useParams();
  const [disable, setDisable] = useState(false);
  function Account(event) {
    setDisable(true);
    event.preventDefault();
    fetch(
      `https://guvi-crm-hackothon.herokuapp.com/activate_account/${email_id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        setDisable(false);
        history.push("/login");
      });
  }

  return (
    <div>
      <br />
      <br />
      <br />
      {disable === false ? (
        <button type="button" className="btn btn-primary" onClick={Account}>
          Click to Activate your Account
        </button>
      ) : (
        <div className="spinner-border text-danger" role="status"></div>
      )}
    </div>
  );
}