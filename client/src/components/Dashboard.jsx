import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const history = useNavigate();

  const fetchdatatoken = async () => {
    const token = localStorage.getItem("userdatatoken");
    //         console.log(token);

    const data = await fetch("http://localhost:4000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    //     console.log(res);

    if (res.status === 401 || !res) {
      //       console.log("Error page");
      history("*");
    } else {
      console.log("user verify");
      history("/dash");
    }
  };

  useEffect(() => {
    fetchdatatoken();
  });

  return (
    <>
      <div className="dash" style={{ textAlign: "center" }}>
        <h1>Dashboard</h1>
        <div className="img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLcappFIgUTtt8vHLvmdq_jMS13Ilw7doh0WhGidSf&s"
            alt="img"
          />
        </div>
        <div className="email">User Email: soorajsingh7505@mail.com</div>
      </div>
    </>
  );
};

export default Dashboard;
