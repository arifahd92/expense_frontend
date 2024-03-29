import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../expense/LoadingSpinner";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading]= useState(false)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.post(
        "https://expense-g7cl.onrender.com/password/forgot-password",
        { email }
      );
      console.log(response.data);
      alert(response.data.message);
      setEmail("");
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center text-secondary">
          <h2>Password Recovery Page</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 offset-md-1 col-lg-8 col-xl-6 offset-xl-3 offset-lg-2 text-secondary">
          <div>
            <form onSubmit={handleSubmit} className="pt-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="email">Email:</label>
                  <div className="input-group">
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div style={{cursor:'pointer'}}
                  className="signup  text-primary"
                  onClick={() => navigate("/register")}>
                  Not registered yet? Register
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button type="submit" className="btn btn-primary mt-4 w-100"  disabled={isLoading}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
            {isLoading && <LoadingSpinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
