import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const AddInvoice: React.FunctionComponent<{}> = () => {
  const { patient_id, patient_name } = useParams();
  const [addInvoice, setAddInvoice] = useState({
    description: "",
    hours_worked: "",
    hourly_rate: 250,
    patient_id: patient_id,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    return axios
      .post(
        `https://ts-patient-and-invoices.herokuapp.com/api/invoices`,
        addInvoice
      )
      .then(({ data }) => {
        setAddInvoice(() => {
          return {
            description: "",
            hours_worked: "",
            hourly_rate: 250,
            patient_id: patient_id,
          };
        });
        setIsLoading(false);
        window.open(`/invoices/${data.invoice.invoice_number}`, `_blank`);
      })
      .catch((err) => {
        setIsErr("Something went wrong. Refresh and try again!");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddInvoice((previousObject: any) => {
      const newObject = { ...previousObject };
      newObject[e.target.id] = e.target.value;
      return newObject;
    });
  };

  const handleNumbersOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddInvoice((previousObject: any) => {
      const newObject = { ...previousObject };
      newObject[e.target.id] = +e.target.value;
      return newObject;
    });
  };

  return isErr ? (
    <p>{isErr}</p>
  ) : (
    <section>
      <Header />
      <hr />
      <h2>Generate invoice for {patient_name}</h2>
      <form
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <label htmlFor="desciption">Reason for invoice: </label>
        <input
          type="text"
          id="description"
          placeholder="To the..."
          value={addInvoice.description}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />{" "}
        <br /> <br />
        <label htmlFor="hours_worked">Hours Worked: </label>
        <input
          type="number"
          id="hours_worked"
          placeholder="hours..."
          value={addInvoice.hours_worked}
          onChange={(e) => {
            handleNumbersOnChange(e);
          }}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="number">Hourly Rate: £</label>
        <input
          type="decimal"
          id="number"
          placeholder="£250"
          value={addInvoice.hourly_rate}
          onChange={(e) => {
            handleNumbersOnChange(e);
          }}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddInvoice;
