import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import SinglePatient from "./pages/SinglePatient";
import AddPatient from "./pages/AddPatient";
import AddSolicitor from "./pages/AddSolicitor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:patient_id" element={<SinglePatient />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/solicitors/add" element={<AddSolicitor />} />
      </Routes>
    </div>
  );
}

export default App;
