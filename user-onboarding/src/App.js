import React, { useEffect, useState } from "react";
import "./App.css";
import schema from "./formSchema";
import UserForm from "./UserForm";
import * as yup from "yup";
import axios from "axios";
import User from "./User";

const initialFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  terms: false,
};

const initialFormErrors = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((err) => console.error(err));

    setFormValues(initialFormValues);
  };

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
      })
      .catch((err) => console.error(err));
  };
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormValues({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const formSubmit = () => {
    const newUser = {
      first_name: formValues["first_name"].trim(),
      last_name: formValues["last_name"].trim(),
      email: formValues.email,
      password: formValues.password,
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="App">
      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}
    </div>
  );
}

export default App;
