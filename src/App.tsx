import React from "react";
import "./App.css";
import "./style.module.scss";
import { BrowserRouter as Router } from "react-router-dom";
import DefaultLayout from "@components/layout";


function App() {
  return (
    <div className="App" style={{ position: "relative", overflowX: "hidden" }}>
      <Router>
        <DefaultLayout />
      </Router>
    </div>
  );
}

export default App;
