import { useEffect, useMemo, useState } from "react";
import { Chart } from "./Chart";

export function DashBoard() {
  const LeadMONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  );
  const ContactMONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  );
  const ServiceMONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  );

  const [leadCount, setLeadCount] = useState([]);
  const [contactCount, setContactCount] = useState([]);
  const [serviceCount, setServiceCount] = useState([]);
  useEffect(() => {
    fetch("https://guvi-crm.herokuapp.com/countlead", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        const leadList = data.sort(function (a, b) {
          return a._id - b._id;
        });
        leadList.map((item) =>
          setLeadCount((prev) => [
            ...prev,
            {
              name: LeadMONTHS[item._id - 1],
              "New Lead": item.total,
              count: item.total
            }
          ])
        );
      })
      .catch((e) => console.log(e));
    fetch("https://guvi-crm.herokuapp.com/countcontact", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        const contactList = data.sort(function (a, b) {
          return a._id - b._id;
        });
        contactList.map((item) =>
          setContactCount((prev) => [
            ...prev,
            {
              name: ContactMONTHS[item._id - 1],
              "New Contact": item.total,
              count: item.total
            }
          ])
        );
      })
      .catch((e) => console.log(e));
    fetch("https://guvi-crm.herokuapp.com/countservice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        const serviceList = data.sort(function (a, b) {
          return a._id - b._id;
        });
        serviceList.map((item) =>
          setServiceCount((prev) => [
            ...prev,
            {
              name: ServiceMONTHS[item._id - 1],
              "New Service Request": item.total,
              count: item.total
            }
          ])
        );
      })
      .catch((e) => console.log(e));
  }, [LeadMONTHS, ContactMONTHS, ServiceMONTHS]);

  return (
    <div
      className="dashboard"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <Chart
        data={leadCount}
        title="Lead created per Month"
        grid
        dataKey="New Lead"
      />
      <Chart
        data={contactCount}
        title="contact created per Month"
        grid
        dataKey="New Contact"
      />
      <Chart
        data={serviceCount}
        title="Service Request created per Month"
        grid
        dataKey="New Service Request"
      />
    </div>
  );
}