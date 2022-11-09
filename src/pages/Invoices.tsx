import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import InvoiceCard from "../components/InvoiceCard";

const Invoices: React.FunctionComponent<{}> = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://ts-patient-and-invoices.herokuapp.com/api/invoices`)
      .then(({ data }) => {
        setInvoices(data.invoices);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsErr("Something went wrong. Please try again!");
        setIsLoading(false);
        setTimeout(() => {
          setIsErr("");
        }, 1000);
      });
  }, [setInvoices]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isErr ? (
    <p>{isErr}</p>
  ) : (
    <section>
      <Header />
      {<InvoiceCard invoices={invoices} />}
    </section>
  );
};

export default Invoices;
