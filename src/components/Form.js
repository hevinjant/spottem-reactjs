import React from "react";
import { useState } from "react";
import "../styles/Form.css";

function Form({ formLabel, placeholder, handleFormSubmit }) {
  const [input, setinput] = useState("");

  const handleInputOnChange = (event) => {
    setinput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit(input);
    setinput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{formLabel}</label>
        <input
          type="text"
          value={input}
          onChange={handleInputOnChange}
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}

export default Form;
