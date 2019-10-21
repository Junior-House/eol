import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "../navigation";
import MapContainer from "../home";

const App = () => (
  <Router>
    <Navigation />
    <MapContainer />
  </Router>
);

export default App;
