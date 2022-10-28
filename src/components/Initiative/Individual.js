import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import styles from "./Individual.module.css";

const Individual = (props) => {
  const removeIndividualHandler = () => {
    props.onRemoveIndividual(props.id);
  };
  return (
    <div className={`${styles[props.className] + " " + styles.row}`}>
      <div>
        {props.name.length > 10 ? (
          <span className={styles.smallFont}>{props.name}</span>
        ) : (
          <span>{props.name}</span>
        )}
      </div>
      <div>{props.num}</div>
      <div>
        <button className={styles.button} onClick={removeIndividualHandler}>
          <FontAwesomeIcon icon={solid("trash")} />
        </button>
      </div>
    </div>
  );
};

export default Individual;
