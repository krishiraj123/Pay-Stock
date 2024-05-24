import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowBalanceSection = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/v1/account/balance",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        setBalance(res.data.balance);
      } catch (error) {
        console.error("Error fetching balance", error);
      }
    };
    fetchBalance();
  }, []);
  return (
    <>
      <h1 className="mt-10 text-2xl font-bold font-mono">
        Your Balance: {balance.toFixed(2)}
      </h1>
    </>
  );
};

export default ShowBalanceSection;
