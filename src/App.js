import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard.js";
import AllLeads from "./components/Dashboard/AllLeads/AllLeads";
import { BrowserRouter } from "react-router-dom";
import Route from "react-router-dom/Route";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Dashboard} />
        <Route path="/leads" exact component={AllLeads} />
      </div>
    </BrowserRouter>
  );
}

export default App;
