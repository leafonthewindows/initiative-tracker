import React, { useState } from "react";

import Button from "../UI/Button";
import styles from "./NewInitiative.module.css";

const NewInitiative = (props) => {
  const [nameShown, setNameShown] = useState("");
  const nameChangeHandler = (event) => {
    setNameShown(event.target.value);
  };

  const [numShown, setNumShown] = useState("");
  const numChangeHandler = (event) => {
    setNumShown(event.target.value);
  };

  const nameInput = React.createRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const initiativeData = {
      id: `${event.target.name.value}` + Math.random().toString(),
      name: event.target.name.value,
      num: event.target.num.value,
      highlight: "",
    };

    props.onAddInitiative(initiativeData);

    setNameShown("");
    setNumShown("");

    nameInput.current.focus();
  };

  return (
    <section className={styles["new-initiative"]}>
      <h1>Enter New Initiative</h1>
      <form className={styles["initiative-form"]} onSubmit={submitHandler}>
        <input
          required
          placeholder="Name"
          id="name"
          name="name"
          value={nameShown}
          onChange={nameChangeHandler}
          ref={nameInput}
        ></input>
        <input
          required
          placeholder="Initiative"
          id="num"
          name="num"
          type="number"
          value={numShown}
          onChange={numChangeHandler}
        ></input>
        <button className={styles["add-button"]} type="submit">
          Add
        </button>
      </form>
    </section>
  );
};

export default NewInitiative;
