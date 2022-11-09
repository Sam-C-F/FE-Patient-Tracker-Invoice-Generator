import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PatientCard from "../components/PatientCard";

const Patients: React.FunctionComponent = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [searchPatient, setSearchPatient] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://ts-patient-and-invoices.herokuapp.com/api/patients?search=${search}`
      )
      .then(({ data }) => {
        setPatients(data.patients);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsErr("Something went wrong. Please try again!");
        setIsLoading(false);
        setTimeout(() => {
          setIsErr("");
          setSearchPatient("");
        }, 1000);
      });
  }, [setPatients, search]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPatient(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSearch(searchPatient);
    setSearchPatient("");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isErr ? (
    <p>{isErr}</p>
  ) : (
    <section>
      <Header />
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type="text"
          id="search"
          placeholder="name..."
          value={searchPatient}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <ul className="patient-table">
        {patients.map((patient) => {
          return <PatientCard patient={patient} />;
        })}
      </ul>
    </section>
  );
};

export default Patients;
