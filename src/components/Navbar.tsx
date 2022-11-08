import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section>
      <Link to="/">Home</Link>
      <br />
      <Link to="/patients">Patients</Link>
      <hr />
    </section>
  );
};

export default Navbar;
