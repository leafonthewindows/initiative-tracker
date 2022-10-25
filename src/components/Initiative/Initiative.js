import React, { useState, useEffect } from "react";
import Individual from "./Individual";
import Button from "../UI/Button";

import styles from "./Initiative.module.css";

const Initiative = (props) => {
  const modalHandler = () => {
    props.onOpenModal();
  };

  return (
    <div>
      <section className={styles.initiative}>
        <div className={styles.control}>
          {props.currentCombat ? (
            <Button
              className={styles["control-buttons"]}
              onClick={props.onHighlightNext}
            >
              Next
            </Button>
          ) : (
            <Button
              className={styles["control-buttons"]}
              onClick={props.onBeginCombat}
            >
              Begin Combat
            </Button>
          )}
          <Button className={styles["control-buttons"]} onClick={modalHandler}>
            Clear List
          </Button>
        </div>
        <div className={props.data.length > 0 ? styles.table : ""}>
          {props.data.map((row, index) => (
            <Individual
              key={row.id}
              id={row.id}
              name={row.name}
              num={row.num}
              onRemoveIndividual={props.onRemoveIndividual}
              className={`${
                props.data[index].highlight ? props.data[index].highlight : ""
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Initiative;
