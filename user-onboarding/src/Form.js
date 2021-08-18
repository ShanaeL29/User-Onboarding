import React, { useState } from "react";

const formSubmit = (e) => {
  e.preventDefault();
  console.log("submitted");
};

const [formState, setFormState] = useState({
  name: "",
  email: "",
  password: "",
});

export default function UserForm(props) {
  return (
    <form>
      <h4>General information</h4>
      <label>
        Name
        <input
          value={values.name}
          onChange={onChange}
          name="username"
          type="text"
        />
      </label>

      <label>
        Email
        <input
          value={values.email}
          onChange={onChange}
          name="email"
          type="email"
        />
      </label>
      <label>
        Password
        <input
          value={values.password}
          onChange={onChange}
          name="password"
          type="text"
        />
      </label>

      <label>
        Do you agree to the terms and conditions?
        <input type="checkbox" name="terms" />
      </label>
      <button>Submit!</button>
    </form>
  );
}
