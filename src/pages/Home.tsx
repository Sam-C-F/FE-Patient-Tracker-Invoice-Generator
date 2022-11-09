import React from "react";
import Header from "../components/Header";

const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header />
      <section className="slug">
        <p>
          Welcome to my patient tracker and invoice generator. This is
          specifically designed for medico-legal expert witnesses. It allows new
          patients and solicitors to be added, and holds them in a database. It
          then easily allows new invoices to be generated and saves these for
          accounting.
        </p>
      </section>
    </React.Fragment>
  );
};

export default Home;
