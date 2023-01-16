import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  let [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/violators");
    eventSource.onmessage = (e) => {
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
