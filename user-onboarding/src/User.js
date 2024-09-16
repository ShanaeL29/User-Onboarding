import React from "react";

function User({ details }) {
  if (!details) {
    return <h3>Working fetching your user&apos;s details...</h3>;
  }

  return (
    <div className="user container">
      <img src={details.avatar} />
      <h2>
        {details["first_name"]} {details["last_name"]}
      </h2>
      <p>Email: {details.email}</p>
      {/* <p>Password: {details.password}</p>  we don't want these details to actually show on screen to be seen
      <p>Terms: {details.terms}</p> */}
    </div>
  );
}

export default User;
