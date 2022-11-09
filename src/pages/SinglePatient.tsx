import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const SinglePatient: React.FunctionComponent<{}> = () => {
  const [singlePatient, setSinglePatient] = useState({
    reference: "",
    name: "",
    dob: "",
    solicitor: "",
    patient_name: "",
  });
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
    </>
  );
};

export default SinglePatient;
