import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../expense/LoadingSpinner";

export default function ResetPassword() {
  const { reqId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [isLoading, setIsLoading]= useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if (password !== cnfPassword) {
        alert("confirm password did not match with password");
        return;
      }
      const response = await axios.post(
        "https://expense-g7cl.onrender.com/password/update-password",
        { password, cnfPassword, reqId }
      );
      console.log(response.data);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error.message)
    } finally{
      setIsLoading(false)
    }
  };
  return (
    <div>
      <div className="container mt-5   ">
        <div className="text-center text-white">
          <h2>Update Password</h2>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-1 col-lg-8  col-xl-6 offset-xl-3 offset-lg-2 text-secondary">
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Confirm Password:</label>
                <input
                  required
                  type="input"
                  className="form-control"
                  id="password"
                  name="password"
                  value={cnfPassword}
                  onChange={(e) => setCnfPassword(e.target.value)}
                  placeholder="Confirm password"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-4 w-100 "  disabled={isLoading}>
                submit
              </button>
            </form>
            {isLoading && <LoadingSpinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
