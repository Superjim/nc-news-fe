import React, { useState, createContext } from "react";

const CheckboxContext = createContext();

const CheckboxProvider = (props) => {
  const [checkedTopics, setCheckedTopics] = useState([]);

  return (
    <CheckboxContext.Provider value={{ checkedTopics, setCheckedTopics }}>
      {props.children}
    </CheckboxContext.Provider>
  );
};

export { CheckboxContext, CheckboxProvider };
