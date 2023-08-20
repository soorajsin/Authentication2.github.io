import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./mix.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="register">
        <Typography className="h4" variant="h4">
          Welcome to Login
        </Typography>
        <div className="form">
          <TextField
            type="email"
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
            type="password"
            label="Enter Passowrd here ..."
            variant="standard"
          />
        </div>
        <div className="form">
          <Button variant="contained">Login</Button>
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
