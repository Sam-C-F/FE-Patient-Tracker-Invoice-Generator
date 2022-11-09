import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <section>
      <Link to="/">Home</Link>
      &nbsp; &nbsp;
      <Link to="/patients">Patients</Link>
      &nbsp; &nbsp;
      <Link to="/patients/add">Add Patient</Link>
      &nbsp; &nbsp;
      <Link to="/solicitors/add">Add Solicitor</Link>
      &nbsp; &nbsp;
      <NavLink to="/invoices">Invoices</NavLink>
      <hr />
    </section>
  );
};

export default Navbar;
