import React, { useState } from "react";

export default function UserForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    submit();
    console.log("submitted");
  };

  const onChange = (event) => {
    const { name, value, checked, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form onSubmit={onSubmit}>
      <h4>General information</h4>
      <label>
        First Name
        <input
          value={values.name}
          onChange={onChange}
          name="first_name"
          type="text"
        />
      </label>
      <label>
        Last Name
        <input
          value={values.name}
          onChange={onChange}
          name="last_name"
          type="text"
        />
      </label>
      <label>
        Email
        <input
          value={values.email}
          onChange={onChange}
          name="email"
          type="text"
        />
      </label>
      <label>
        Password
        <input
          value={values.password}
          onChange={onChange}
          name="password"
          type="password"
        />
      </label>

      <label>
        Do you agree to the terms and conditions?
        <input type="checkbox" name="terms" />
      </label>
      <button disabled={disabled}>Submit!</button>
      <div className="errors">
        <div>{errors["first_name"]}</div>
        <div>{errors["last_name"]}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
      </div>
    </form>
  );
}
