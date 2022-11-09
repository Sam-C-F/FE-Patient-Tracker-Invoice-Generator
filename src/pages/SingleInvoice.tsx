import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleInvoice: React.FunctionComponent<{}> = () => {
  const [singleInvoice, setSingleInvoice] = useState({
    invoice_number: 0,
    reference: "",
    address: "",
    date: "",
    patient_name: "",
    description: "",
    solicitor_name: "",
    hours_worked: 0,
    hourly_rate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState("");

  const { invoice_number } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://ts-patient-and-invoices.herokuapp.com/api/invoices/${invoice_number}`
      )
      .then(({ data }) => {
        setSingleInvoice(data.invoice);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsErr("Something went wrong. Refresh and try again!");
        setIsLoading(false);
      });
  }, [invoice_number]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const pageTitle = `INVOICE ${
    singleInvoice.patient_name
  } ${singleInvoice.date.replaceAll("-", " ")}`;

  document.title = pageTitle;

  return isErr ? (
    <p>{isErr}</p>
  ) : (
    <section>
      <title>{pageTitle}</title>
      <h2>
        <b>INVOICE</b>
      </h2>
      <hr />
      <hr />
      <p>
        <b>Patient Tracker & Invoice Generator</b>
      </p>
      <p>
        <b>1 Testington Avenue, Testington, Test, T12 3TT </b>
      </p>
      <p>fakeemail@email.com</p>
      <p>0161 111 11 11</p>
      <p>
        <b>VAT Number: 123 4567 89</b>
      </p>
      <hr />
      <p>
        <b>Invoice Number: {invoice_number}</b>
      </p>
      <p>Date: {singleInvoice.date}</p>
      <hr />
      <p>
        Reference: <b>{singleInvoice.reference}</b>
      </p>
      <p>{singleInvoice.address}</p>
      <hr />
      <p>
        <b> BACS payments to: Sort Code: 00 00 01 Acc. 12345678</b>
      </p>
      <p>
        <b> PLEASE ADDRESS ALL PAYMENTS TO INVOICE GENERATOR</b>
      </p>
      <hr />
      <p>
        <b>{singleInvoice.patient_name}</b>
      </p>
      <p>{singleInvoice.description}</p>
      <p>
        {singleInvoice.hours_worked} hours at £{singleInvoice.hourly_rate} per
        hour -- £{singleInvoice.hours_worked * singleInvoice.hourly_rate}
      </p>
      <p>
        VAT @ 20% -- £
        {singleInvoice.hours_worked * singleInvoice.hourly_rate * 0.2}
      </p>
      <p>
        <b>
          {" "}
          Total -- £
          <u>{singleInvoice.hours_worked * singleInvoice.hourly_rate * 1.2}</u>
        </b>
      </p>
      <hr />
      <p>
        <b>
          NB: FOR DATA PROTECTION PURPOSES ALL RECORDS BOTH ON PAPER AND CD ROM{" "}
          <br />
          WILL BE SECURELY DESTROYED AFTER 3 MONTHS UNLESS OTHERWISE INSTRUCTED.
        </b>
      </p>
      <hr />
    </section>
  );
};

export default SingleInvoice;
