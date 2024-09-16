import React from "react";

export default function UserForm(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (event) => {
    //better to call handleSubmit because submit is the event and this is the handler
    event.preventDefault();
    submit();
    console.log("submitted");
  };

  const onChange = (event) => {
    //better to call this handleChange
    const { name, value, checked, type } = event.target; //can console log this. name, value, checked, type are the actual names in the DOM of event
    const valueToUse = type === "checkbox" ? checked : value; //if the type of input is a checkbox we want a true or false b/c value will come back null
    change(name, valueToUse);
  };
  //anytime there is onSomething, that will raise the event and you have to pass an event handler. you want the event handler to be named correspondingly onChange -> handleChange
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1>New User Form</h1>
      <label>
        First Name
        <input
          value={values["first_name"]}
          onChange={onChange} //better --> onchange={handleChange}
          name="first_name"
          type="text"
        />
      </label>
      <label>
        Last Name
        <input
          value={values["last_name"]}
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
          type="email"
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
        <input
          type="checkbox"
          name="terms"
          onChange={onChange}
          value={values.terms}
        />
      </label>
      <div className="errors">
        <div>{errors["first_name"]}</div>
        <div>{errors["last_name"]}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
      </div>
      <button disabled={disabled} id="submitButton">
        Submit!
      </button>
    </form>
  );
}
