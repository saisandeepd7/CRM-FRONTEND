import { useHistory } from "react-router-dom";

export function Header({
  managerToken,
  setmanagerToken,
  employeeToken,
  setEmployeeToken,
  adminToken,
  setAdminToken,
  type,
  setType
}) {
  const history = useHistory();

  const Logout = () => {
    if (type === "Admin") {
      localStorage.setItem("admintoken", "");
      setAdminToken("");
      setType("");
      alert("logged-out-successfully");
      history.push("/");
    } else if (type === "Manager") {
      localStorage.setItem("managertoken", "");
      setmanagerToken("");
      setType("");
      alert("logged-out-successfully");
      history.push("/");
    } else {
      localStorage.setItem("employeetoken", "");
      setEmployeeToken("");
      setType("");
      alert("logged-out-successfully");
      history.push("/");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-black bg-dark" style={{ padding: "10px" }}>
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>CRM APP</b>
        </a>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {type === "Admin" && (
            <button
              style={{ color: "white" }}
              className="btn btn-black"
              onClick={() => history.push("/adduser")}
            >
              <b>ADD USER</b>
            </button>
          )}
          {type === "" ? (
            <>
              <button
                style={{ color: "white" }}
                className="btn btn-black me-md-2"
                onClick={() => history.push("/")}
              >
                <b>HOME</b>
              </button>
              <button
                style={{ color: "white" }}
                className="btn btn-black"
                onClick={() => history.push("/signup")}
              >
                <b>SIGNUP</b>
              </button>

              <button
                style={{ color: "white" }}
                className="btn btn-black"
                onClick={() => history.push("/login")}
              >
                <b>LOGIN</b>
              </button>
            </>
          ) : (
            <>
              <button
                style={{ color: "white" }}
                className="btn btn-black"
                onClick={() => history.push("/dashboard")}
              >
                <b>DASHBOARD</b>
              </button>
              <button
                style={{ color: "white" }}
                className="btn btn-black"
                onClick={() => history.push("/lead")}
              >
                <b>LEAD</b>
              </button>

              <button
                style={{ color: "white" }}
                className="btn btn-black"
                onClick={() => history.push("/contact")}
              >
                <b>CONTACT</b>
              </button>
              <span></span>
              <button
                style={{ color: "white" }}
                className="btn btn-black"
                onClick={() => history.push("/service")}
              >
                <b>SERVICE REQUEST</b>
              </button>
              <button
                style={{ color: "white" }}
                className="btn btn-black"
                onClick={Logout}
              >
                <b>LOGOUT</b>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}