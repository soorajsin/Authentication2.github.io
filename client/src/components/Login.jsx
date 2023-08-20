import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./mix.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
  });


  // const history=useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };
  console.log(inpVal);

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inpVal;

    if (email === "") {
      alert("Please enter your Email");
    } else if (!email.includes("@")) {
      alert("Invalid Email");
    } else if (password === "") {
      alert("Password is required");
    } else {
      console.log("Login User Successfully...");

      const data = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        // alert("User login Successfullly");
        localStorage.setItem("userdatatoken", res.result.token);
        // history("/dash");
        setInpVal({ ...inpVal, email: "", password: "" });
      }
    }
  };

  return (
    <>
      <div className="register">
        <Typography className="h4" variant="h4">
          Welcome to Login
        </Typography>
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
            type="password"
            name="password"
            value={inpVal.password}
            onChange={setVal}
            InputProps={{ style: { fontSize: "30px" } }}
            className="text"
            label="Enter Passowrd here ..."
            variant="standard"
          />
        </div>
        <div className="form">
          <Button onClick={loginUser} variant="contained">
            Login
          </Button>
        </div>
        <div className="form">
          <Typography variant="h6">
            Your Already Account? <NavLink to={"/"}>Sign Up</NavLink>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Register;
