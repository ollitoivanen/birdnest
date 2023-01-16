import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  let [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    console.log("Getting data from server");
    const eventSource = new EventSource("http://localhost:8000/violators");
    eventSource.onmessage = (e) => {
      console.log("new update from server");
      setApiResponse(e.data);
    };
    return () => {
      console.log("closing");
      eventSource.close();
    };
  }, []);

  return (
    <div className="App">
      <p>{apiResponse}</p>
    </div>
  );
}

export default App;
