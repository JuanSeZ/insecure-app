import React, { useState } from "react";
import { Button, Input } from "reakit";

const URLInjection = () => {
  // https://9432-161-22-31-212.ngrok-free.app/images/document.cookie
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (value.startsWith("https://assets.pokemon.com")) {
        setSubmitted(true);
        setError(null)
      }
        else {
            setError("The image must be from https://assets.pokemon.com")
        }
  }
  return (
    <div style={{ margin: "8px 24px" }}>
      <h1>Insert your image</h1>
      <form
        style={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        <Input
          style={{ width: "100%" }}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button style={{ width: "50%" }} onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      {error && <p>{error}</p>}
      {submitted && <img width={"90%"} height={"500px"} src={value} />}
    </div>
  );
};

export default URLInjection;
