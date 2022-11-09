import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import InvoiceCard from "../components/InvoiceCard";

const SinglePatient: React.FunctionComponent<{}> = () => {
  const [singlePatient, setSinglePatient] = useState({
    reference: "",
    name: "",
    dob: "",
    solicitor: "",
    patient_name: "",
    patient_id: 0,
  });
  const [invoicesForPatient, setInvoicesForPatient] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState("");

  const { patient_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://ts-patient-and-invoices.herokuapp.com/api/patients/${patient_id}`
      )
      .then(({ data }) => {
        setSinglePatient(data.patient);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsErr("Something went wrong. Refresh and try again!");
        setIsLoading(false);
      });
  }, [patient_id]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://ts-patient-and-invoices.herokuapp.com/api/invoices/patient/${patient_id}`
      )
      .then(({ data }) => {
        setInvoicesForPatient(data.invoices);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [patient_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isErr ? (
    <p>{isErr}</p>
  ) : (
    <>
      <Header />
      <ul className="single-patient-table">
        <li className="single-patient-card ">
          Reference Number: {singlePatient.reference}
        </li>
        <li className="single-patient-card ">
          Name: {singlePatient.patient_name}
        </li>
        <li className="single-patient-card ">DOB: {singlePatient.dob}</li>
        <li className="single-patient-card ">
          Solicitor: {singlePatient.solicitor}
        </li>
      </ul>
      <hr />
      <br />
      <Link
        to={`/invoices/add/${singlePatient.patient_id}/${singlePatient.patient_name}`}
      >
        <p>Add New Invoice</p>
      </Link>
      <br />
      <hr />
      {<InvoiceCard invoices={invoicesForPatient} />}
    </>
  );
};

export default SinglePatient;
