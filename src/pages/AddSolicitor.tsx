import axios from "axios";
import { useState } from "react";
import Header from "../components/Header";

const AddSolicitor: React.FunctionComponent<{}> = () => {
  const [addSolicitor, setAddSolicitor] = useState({
    name: "",
    location: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    return axios
      .post(
        `https://ts-patient-and-invoices.herokuapp.com/api/solicitors`,
        addSolicitor
      )
      .then(({ data }) => {
        setAddSolicitor(() => {
          return {
            name: "",
            location: "",
            address: "",
          };
        });
        setIsLoading(false);
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
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddSolicitor((previousObject: any) => {
      const newObject = { ...previousObject };
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
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="Name..."
          value={addSolicitor.name}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />
        <br />
        <br />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          placeholder="Town/City..."
          value={addSolicitor.location}
          onChange={(e) => {
            handleOnChange(e);
          }}
          required
        />
        <br />
        <br />
        <label htmlFor="address" className="textarea-label">
          Address:{" "}
        </label>
        <textarea
          id="address"
          cols={30}
          rows={10}
          name="address"
          placeholder="Address..."
          required
          value={addSolicitor.address}
          onChange={(e) => {
            handleOnChange(e);
          }}
        ></textarea>
        <br /> <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddSolicitor;
