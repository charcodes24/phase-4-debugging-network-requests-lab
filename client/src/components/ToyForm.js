import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  //make the function async to enable the await keyword
  async function handleSubmit(event) {
    event.preventDefault();
    const newToy = {
      ...formData,
      likes: 0,
    };
    //fetch returns a Promise, we must await it
    const response = await fetch("/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      //response.json() returns a Promise, we must await it
    const data = await response.json();
    if (response.ok) {
      onAddToy(data)
    } else {
      setErrors(data.errors)
    }
    setFormData({
      name: "",
      image: "",
    });
  }

  return (
    <div className="container">
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
