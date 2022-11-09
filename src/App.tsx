import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import SinglePatient from "./pages/SinglePatient";
import AddPatient from "./pages/AddPatient";
import AddSolicitor from "./pages/AddSolicitor";
import Invoices from "./pages/Invoices";
import SingleInvoice from "./pages/SingleInvoice";
import AddInvoice from "./pages/AddInvoice";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:patient_id" element={<SinglePatient />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/solicitors/add" element={<AddSolicitor />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/:invoice_number" element={<SingleInvoice />} />
        <Route
          path="/invoices/add/:patient_id/:patient_name"
          element={<AddInvoice />}
        />
      </Routes>
    </div>
  );
}

export default App;
