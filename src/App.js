import React from "react";
import Index from "./pages/Index";
import Dash from "./pages/Dash";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/register" element={<Register />} />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
}

export default App;
