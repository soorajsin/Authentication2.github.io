import React, { useEffect } from "react";

const Dashboard = () => {
  const fetchdatatoken = async () => {
    const token = localStorage.getItem("userdatatoken");
        console.log(token);

    const data = await fetch("http://localhost:4000/login/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
//     console.log(res);
  };

  useEffect(() => {
    fetchdatatoken();
  }, []);

  return (
    <>
      <div className="dash">
        <h1>Dashboard</h1>
        userEmail: soorajsingh7505@gmail.com
      </div>
    </>
  );
};

export default Dashboard;
