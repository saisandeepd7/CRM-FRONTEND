import "./App.css";
import { Header } from "./header";

import { Switch, Route } from "react-router-dom";
import { FirstPage } from "./FirstPage";
import SignUp from "./signup";
import Login from "./login";
import ForgetPassword from "./forgetpassword";
import { Activate } from "./accountactivate.js";
import ResetPassword from "./resetpassword";
import { Contact } from "./contact";
import { Lead } from "./lead";
import { Service } from "./service";
import { EditLead } from "./editlead";
import { EditContact } from "./editcontact";
import { EditService } from "./editservice";
import { DashBoard } from "./Dashboard.js";
import { UserType } from "./addusertype";
import { useState } from "react";
export default function App() {
  const managertoken = !localStorage.getItem("managertoken") && "";
  const [managerToken, setmanagerToken] = useState(managertoken);
  const employeetoken = !localStorage.getItem("employeetoken") && "";
  const [employeeToken, setEmployeeToken] = useState(employeetoken);
  const admintoken = !localStorage.getItem("admintoken") && "";
  const [adminToken, setAdminToken] = useState(admintoken);
  const [type, setType] = useState("");
  return (
    <div className="App">
      <Header
        managerToken={managerToken}
        setmanagerToken={setmanagerToken}
        employeeToken={employeeToken}
        setEmployeeToken={setEmployeeToken}
        adminToken={adminToken}
        setAdminToken={setAdminToken}
        type={type}
        setType={setType}
      />
      <Switch>
        <Route exact path="/">
          <FirstPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login
            setmanagerToken={setmanagerToken}
            setEmployeeToken={setEmployeeToken}
            setAdminToken={setAdminToken}
            setType={setType}
          />
        </Route>

        <Route path="/lead">
          <Lead />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/service">
          <Service />
        </Route>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/adduser">
          <UserType />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/editlead/:_id">
          <EditLead />
        </Route>
        <Route path="/editcontact/:_id">
          <EditContact />
        </Route>
        <Route path="/editservice/:_id">
          <EditService />
        </Route>

        <Route path="/password-reset/:id/:token">
          <ResetPassword />
        </Route>
        <Route path="/account-activation/:email_id/:token">
          <Activate />
        </Route>
      </Switch>
    </div>
  );
}