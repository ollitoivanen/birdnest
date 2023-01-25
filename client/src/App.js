import React, { useEffect, useState } from "react";

function App() {
  let [apiResponse, setApiResponse] = useState([]);

  //Persistent connection to API
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/violators");
    eventSource.onmessage = (e) => {
      setApiResponse(JSON.parse(e.data).reverse());
      console.log(JSON.parse(e.data));
    };
    return () => {
      eventSource.close();
    };
  }, []);

  function formatDate(date) {
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

    return (
      date.getHours() +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    );
  }

  function formatDistance(distance) {
    return distance / 1000 + " m";
  }

  function createList() {
    return (
      <table style={table}>
        <thead>
          <th style={table_header}>Name</th>
          <th style={table_header}>Last seen</th>
          <th style={table_header}>Latest violation</th>
          <th style={table_header}>Closest distance</th>
          <th style={table_header}>Phone</th>
          <th style={table_header}>Email</th>
        </thead>
        {apiResponse.map((violator) => (
          <tr>
            <td style={table_row}>
              {violator.firstName + " " + violator.lastName}
            </td>
            <td style={table_row}>
              {formatDate(new Date(violator.lastSeenInTheArea))}
            </td>
            <td style={table_row}>
              {formatDate(new Date(violator.latestViolation))}
            </td>
            <td style={table_row}>
              {formatDistance(violator.closestDistance)}
            </td>
            <td style={table_row}>{violator.phoneNumber}</td>
            <td style={table_row}>{violator.email}</td>
          </tr>
        ))}
      </table>
    );
  }

  return <div className="App">{createList()}</div>;
}

const table = {
  width: "100%",
  position: "relative",
  fontFamily: "Arial",
};

const table_row = {
  borderBottom: "1px solid black",
  padding: 16,
  textAlign: "center",
};

const table_header = {
  position: "sticky",
  top: 0,
  background: "lightGray",
  padding: 16,
};
export default App;
