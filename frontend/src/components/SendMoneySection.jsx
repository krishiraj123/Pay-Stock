import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SendMoneySection = () => {
  const [amount, setAmount] = useState(0);
  const queryParams = new URLSearchParams(location.search);
  const receiverId = queryParams.get("receiverId");
  const firstname = queryParams.get("firstname");
  const lastname = queryParams.get("lastname");
  const navigate = useNavigate();

  const handleTransfer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/account/transfer",
        { receiverId, amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Transfer Successful!",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/");
    } catch (error) {
      console.error("Error initiating transfer", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Transfer Failed Invalid Amount!",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="flex flex-col m-x-5 p-5 bg-white shadow-2xl border border-gray-200 w-full md:w-1/3">
        <p className="text-2xl font-mono font-extrabold text-center mb-4">
          Send Money
        </p>
        <div className="flex items-center mb-4">
          <p className="rounded-full bg-green-500 w-16 h-16 flex items-center justify-center text-2xl text-white font-bold">
            {firstname.charAt(0) + lastname.charAt(0)}
          </p>
          <p className="ml-4 text-xl font-medium">
            {firstname + " " + lastname}
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-2 text-lg font-medium">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter amount in $"
          />
          <button
            className="bg-green-500 rounded-lg mt-3 p-2 text-lg font-medium tracking-wider text-white"
            onClick={handleTransfer}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneySection;
