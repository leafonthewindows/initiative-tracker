import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./NewInitiative.module.css";

const NewInitiative = (props) => {
  //REACT-HOOK-FORM EXTRACTIONS
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", num: null } });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const checkWhitespace = (aString) => {
    if (aString.trim().length === 0) {
      return "Name can't be whitespace";
    }
    return true;
  };

  //SUBMITTING FORM
  const submitHandler = (event) => {
    //SEND INITIATIVE DATA UP TO APP
    const initiativeData = {
      id: `${event.name}` + Math.random().toString(),
      name: event.name,
      num: event.num,
      highlight: "",
    };
    props.onAddInitiative(initiativeData);

    //REFOCUS TO NAME AFTER SUBMITTING
    setFocus("name");

    //RESET THE FORM
    reset({ name: "", num: "" });
  };

  return (
    <section className={styles["new-initiative"]}>
      <h1>Enter New Initiative</h1>
      <form
        id="newInitiativeForm"
        className={styles["initiative-form"]}
        onSubmit={handleSubmit(submitHandler)}
      >
        <input
            placeholder="Name" type="string" {...register("name", {
            required: "Name is required",
            validate: (v) => checkWhitespace(v),
            onChange:(e) => {
              const value = e.target.value;
              if (value.length > 0 && value.trim().length === 0) {
                setError("name", {
                  type: "custom",
                  message: "Name can't be whitespace",
                });
              } else if (value.length === 0) {
                clearErrors("name");
                setError("name", { type: "custom", message: "Name is required" });
              } else {
                clearErrors("name");
              }
            }}
          )}
        />
        <input
          placeholder="Initiative" type="number" step="any" {...register("num", { required: "Initiative is required",
            valueAsNumber: true,
            onChange:(e) => {
              const value = e.target.value;
                if (value.length === 0) {
                setError("num", { type: "custom", message: "Initiative is required" });
              } else {
                clearErrors("num");
              }
            }
            }
          )}
        />
        <button className={styles["add-button"]} type="submit">
          Add
        </button>
        {errors.name && (
          <p className={styles["error-message"]}>{errors.name.message}</p>
        )}
        {errors.num && (
          <p className={styles["error-message"]}>{errors.num.message}</p>
        )}
      </form>
    </section>
  );
};

export default NewInitiative;
