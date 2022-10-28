import "./App.css";
import React, { useState } from "react";

import NewInitiative from "./components/NewInitiative/NewInitiative";
import Initiative from "./components/Initiative/Initiative";
import Modal from "./components/UI/Modal";

function App() {
  const [initiative, setInitiative] = useState([]);
  const [currentCombat, setCurrentCombat] = useState(false);
  const [modalVis, setModalVis] = useState(false);

  const addInitiativeHandler = (addNew) => {
    setInitiative((prev) => {
      return [...prev, addNew].sort(
        (a, b) => parseFloat(b.num) - parseFloat(a.num)
      );
    });
  };

  const removeIndividualHandler = (removalID) => {
    //IF CALLED ON OBJECT WITH HIGHLIGHT
    const highlightIndex = initiative.findIndex((el) => {
      return el.highlight === "highlight";
    });
    const removalIndex = initiative.findIndex((el) => {
      return el.id === removalID;
    });
    if (highlightIndex === removalIndex) {
      highlightNextHandler();
    }

    //REMOVE OBJECT FROM INITIATIVE
    setInitiative((prev) => {
      return prev.filter((item) => item.id !== removalID);
    });

    //IF THIS IS LAST THE INDIVIDUAL, CHANGE CURRENT COMBAT
    if (initiative.length === 1) {
      setCurrentCombat(false);
    }
  };

  const beginCombatHandler = () => {
    if (initiative.length > 0) {
      let beginInitiative = [...initiative];
      beginInitiative[0].highlight = "highlight";
      setInitiative(beginInitiative);
      setCurrentCombat(true);
    }
  };

  const highlightNextHandler = () => {
    if (initiative.length > 0) {
      let nextInitiative = [...initiative];
      let highlightIndex = nextInitiative.findIndex((el) => {
        return el.highlight === "highlight";
      });
      nextInitiative[highlightIndex].highlight = "";
      nextInitiative[(highlightIndex + 1) % initiative.length].highlight =
        "highlight";
      setInitiative(nextInitiative);
    }
  };

  const openModal = () => {
    setModalVis(true);
  };

  const closeModal = () => {
    setModalVis(false);
  };

  const clearListHandler = () => {
    setInitiative([]);
    setCurrentCombat(false);
    setModalVis(false);
    //show modal that asks "Are you sure?"
  };

  return (
    <main>
      {modalVis && (
        <Modal
          title={"Clear All?"}
          message={"Do you want to discard all items on this list?"}
          cancelButtonText={"No"}
          onRemoveModal={closeModal}
          continueButtonText={"Yes"}
          onClearList={clearListHandler}
        ></Modal>
      )}
      <NewInitiative onAddInitiative={addInitiativeHandler} />
      <Initiative
        classname={"initiative"}
        key={initiative}
        data={initiative}
        currentCombat={currentCombat}
        onRemoveIndividual={removeIndividualHandler}
        onOpenModal={openModal}
        onClearList={clearListHandler}
        onBeginCombat={beginCombatHandler}
        onHighlightNext={highlightNextHandler}
      />
    </main>
  );
}

export default App;
