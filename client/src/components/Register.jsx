import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./mix.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };
  console.log(inpVal);

  const addUser = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = inpVal;

    if (name === "") {
      alert("Name is required");
    } else if (email === "") {
      alert("Email id is required");
    } else if (!email.includes("@")) {
      alert("Please enter a valid Email");
    } else if (password === "") {
      alert("Password field cannot be empty!");
    } else if (password.length < 6) {
      alert(`Minimum length of the Password should be 6`);
    } else if (cpassword === "") {
      alert("Password field cannot be empty!");
    } else if (cpassword.length < 6) {
      alert(`Minimum length of the Confirm Password should be 6`);
    } else if (password !== cpassword) {
      alert("Password and confirm password does not match");
    } else {
      console.log("login successfully");

      const data = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      console.log(res);
    }
  };

  return (
    <>
      <div className="register">
        <Typography className="h4" variant="h4">
          Welcome to Register
        </Typography>
        <div className="form">
          <TextField
            type="text"
            name="name"
            value={inpVal.name}
            onChange={setVal}
            InputProps={{ style: { fontSize: "30px" } }}
            className="text"
            label="Enter Name here ..."
            variant="standard"
          />
        </div>
        <div className="form">
          <TextField
            type="email"
            name="email"
            value={inpVal.email}
            onChange={setVal}
            InputProps={{ style: { fontSize: "30px" } }}
            className="text"
            label="Enter Email here ..."
            variant="standard"
          />
        </div>
        <div className="form">
          <TextField
            InputProps={{ style: { fontSize: "30px" } }}
            className="text"
            name="password"
            value={inpVal.password}
            onChange={setVal}
            type="password"
            label="Enter Passowrd here ..."
            variant="standard"
          />
        </div>
        <div className="form">
          <TextField
            InputProps={{ style: { fontSize: "30px" } }}
            className="text"
            name="cpassword"
            value={inpVal.cpassword}
            onChange={setVal}
            type="password"
            label="Enter Confirm  Passowrd here ..."
            variant="standard"
          />
        </div>
        <div className="form">
          <Button onClick={addUser} variant="contained">
            Register
          </Button>
        </div>
        <div className="form">
          <Typography variant="h6">
            Your Already Account? <NavLink to={"/login"}>Sign In</NavLink>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Register;
