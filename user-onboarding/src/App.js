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
  initialFormErrors: "",
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  //below should generally only be local to itself. App should not typically be holding these
  const [users, setUsers] = useState(initialUsers);
  //controlled inputs versus uncontrolled input (not necessary)
  const [formValues, setFormValues] = useState(initialFormValues); //initializing here (from post). you need a slice of state to keep track of form state as new inputs are inserted
  const [formErrors, setFormErrors] = useState(initialFormErrors); //need to be able to keep track of errors from schema validation. Need a place to put errors so need this slice of state here.
  const [disabled, setDisabled] = useState(initialDisabled); //if you don't want submit to work if all required validation is not met

  const postNewUser = (newUser) => {
    //sending the new item info into the database.
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([...users, res.data]); //sent new user to database then taking current users in state and adding new one to the list
      })
      .catch((err) => console.error(err));

    setFormValues(initialFormValues); //resetting the values back to inital state
  };

  const getUsers = () => {
    //getting the data/shape and then setting the new state (line 51)
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        // console.log(res);
        setUsers(res.data.data); //need to understand the shape of the data response
      })
      .catch((err) => console.error(err));
  };
  const validate = (name, value) => {
    //"validate" can be anything. takes 2 arguments (names can be anything)
    yup //library (yup docs)
      .reach(schema, name) //reach into the schema and compare the input field(name, email, whatever) with the value currently saved in vvv form values. name = name of form values
      .validate(value) //validate with value being typed in compared to schema
      .then(() => setFormErrors({ ...formErrors, [name]: "" })) //if there are no errors, spread out the old error and override [] to set back to an empty string. validates one at a time.
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] })); //err is the error being caught inside the catch. errors is a property in the error object
  };

  const inputChange = (name, value) => {
    //checking every time a new character is input.  getting passed into form component as a prop. this gets called inside the event handler for onChange in the form. (((onChange raises the event. handleChange handles the event. inside handleChange we call inputChange)))
    validate(name, value); //same as above
    setFormValues({ ...formValues, [name]: value }); //same as errors but with the form values
  };

  const formSubmit = () => {
    //want to account for ALL fields most likely. onSubmit this will all be transferred to the server which will connect to the database.
    //creating the new item
    const newUser = {
      first_name: formValues["first_name"].trim(),
      last_name: formValues["last_name"].trim(),
      email: formValues.email,
      password: formValues.password,
      terms: true,
    };
    postNewUser(newUser); //being called from post
  };

  useEffect(() => {
    //when app first mounts this gets called. this will only run the first time App gets mounted. the useEffect is exclusive to the component it is called in
    getUsers(); //the actual calling of getUsers happens here. we are calling the getUsers function that is getting all users from the database and setting them in state. Only happens once.
  }, []);

  useEffect(() => {
    //being run on each character input and if valid then set disable to opposite boolean
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]); //every time formValues is changed

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
