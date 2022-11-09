import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

type Solicitor = {
  solicitor_id: number;
  name: string;
  location: string;
};

const AddPatient: React.FunctionComponent<{}> = () => {
  const navigate = useNavigate();
  const [solicitors, setSolicitors] = useState([]);
  const [addPatient, setAddPatient] = useState({
    patient_name: "",
    dob: "",
    reference: "",
    solicitor_id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://ts-patient-and-invoices.herokuapp.com/api/solicitors`)
      .then(({ data }) => {
        setSolicitors(data.solicitors);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsErr("Something went wrong. Refresh and try again!");
        setIsLoading(false);
      });
  }, []);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    return axios
      .post(
        `https://ts-patient-and-invoices.herokuapp.com/api/patients`,
        addPatient
      )
      .then(({ data }) => {
        setAddPatient(() => {
          return {
            patient_name: "",
            dob: "",
            reference: "",
            solicitor_id: 0,
          };
        });
        navigate(`/patients/${data.patient.patient_id}`);
      })
      .catch((err) => {
        setIsErr("Something went wrong. Refresh and try again!");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAddPatient((previousObject: any) => {
      const newObject = {
        ...previousObject,
      };
      newObject[e.target.id] = e.target.value;
      return newObject;
    });
  };

  return isErr ? (
    <p>{isErr}</p>
  ) : (
    <section>
      <Header />
      <hr />
      <form
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <label htmlFor="patient_name">Name: </label>
        <input
          type="text"
          id="patient_name"
          placeholder="name..."
          value={addPatient.patient_name}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />{" "}
        <br /> <br />
        <label htmlFor="dob">Date of Birth: </label>
        <input
          type="date"
          id="dob"
          value={addPatient.dob}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />{" "}
        <br />
        <br />
        <label htmlFor="reference">Reference: </label>
        <input
          type="text"
          id="reference"
          placeholder="ABC123"
          value={addPatient.reference}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />{" "}
        <br /> <br />
        <label htmlFor="solicitor_id">Solicitor: </label>
        <select
          id="solicitor_id"
          name="solicitor"
          required
          value={addPatient.solicitor_id}
          onChange={(e) => {
            handleOnChange(e);
          }}
        >
          <option value="" disabled>
            choose a solicitor
          </option>
          {solicitors.map((solicitor: Solicitor) => {
            return (
              <option
                key={solicitor.solicitor_id}
                value={solicitor.solicitor_id}
              >
                {solicitor.name} -- {solicitor.location}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddPatient;
