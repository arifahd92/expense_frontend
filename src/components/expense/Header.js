import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleBoardFlag,
  clearUserState,
  darkFlagHandel,
  toggleReportFlag,
} from "../../store/slices/header";
import { clearExpenseState } from "../../store/slices/expense";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nightMode, setNightMode] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const userToken = localStorage.getItem("userToken");
  const { boardFlag, darkFlag, reportFlag } = useSelector(
    (state) => state.user
  );
  const { premium } = useSelector((state) => state.expense);
  console.log({ boardFlag });
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure");
    if (confirm) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      navigate("/");
      return;
    }
    return;
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function buyPremium() {
    console.log('buy premium called')
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const userToken = localStorage.getItem("userToken");
    // creating a new order
    const result = await axios.get("/buy-premium", {
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_2Qj7oVzv1mU8TM", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Arif corp",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // this will be called on success payment
        const result = await axios.post(
          "https://expense-g7cl.onrender.com/payment-success",
          data,
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        console.log({ result });
        alert(result.data.message);
      },
      prefill: {
        name: " arif",
        email: "arifahd92@gmail.com",
        contact: "7275890926",
      },
      notes: {
        address: " Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const handleLeaderboard = () => {
    if (!premium) {
      alert("only for premium user's");
      return;
    }
    dispatch(toggleBoardFlag());
  };
  const handleReportCard = () => {
    dispatch(toggleReportFlag());
  };
  const handleNightmode = (e) => {
    console.log(e.target.checked);

    if (premium) {
      setNightMode(!nightMode);
      dispatch(darkFlagHandel(!nightMode));
      return;
    }
    alert("only for premium user's");
  };
  console.log({ darkFlag: darkFlag });
  return (
    <div className={darkFlag && "bg-black text-white"}>
      <div className={`container mt-1 `}>
        <div className="row    ">
          <div className="col text-warning ">{userEmail}</div>

          <div className="col text-end">
            <button className="btn btn-warning    mb-1" onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>

        <div className="row">
          {!premium ? (
            <div className="col-6 col-md-6 col-lg-3   ">
              <button
                className=" btn btn-outline-warning   "
                onClick={buyPremium}>
                buy premium
              </button>
            </div>
          ) : (
            <div className="col-6 col-md-6 col-lg-3   ">
              <span className="text-bg-success  text-center ">
                Premium user
              </span>
            </div>
          )}

          <div className="col-6 col-md-6 col-lg-3   text-secondary text-center text-md-end ">
            <span>dark mode</span>
            <label className="switch mt-1 ">
              <input
                type="checkbox"
                checked={nightMode}
                onChange={handleNightmode}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="col-6 col-md-6 col-lg-3   text-lg-center ">
            <button
              className=" btn btn-outline-warning  mt-1   "
              onClick={handleLeaderboard}>
              {boardFlag ? "Hide" : "Leader board"}
            </button>
          </div>
          <div className="col-6 col-md-6 col-lg-3  text-end">
            <button
              className=" btn btn-outline-warning float-lg-end mt-1   "
              onClick={handleReportCard}>
              {reportFlag ? "Hide" : "Reprt card"}
            </button>
          </div>
        </div>
      </div>
      <hr className="text-warning" />
    </div>
  );
}
