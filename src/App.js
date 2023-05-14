import React from "react";
import Login from "./pages/Login";
import Dash from "./pages/Dash";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/register" element={<Register />} />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
}

export default App;
