import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
export default function ReportCard() {
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading]= useState(false)
  const [onceFetched, setOnceFetched]=useState(false)
  //const {premium}= useSelector((state)=>)
  const { darkFlag, premium } = useSelector((state) => state.user);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          "https://expense-g7cl.onrender.com/premium/report-card",
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        const data = response.data;

        console.log("from report card");
        setReport(data);
        console.log(data);
        //setUser(userInfo);
      } catch (error) {
        console.log(error.response);
        alert("Add atleast two expense  ");
      }
      finally{
        setIsLoading(false)
        setOnceFetched(true)
      }
    };
    fetchUser();
  }, []);
  const downloadReport = () => {
    if (!premium) {
      return alert("Only for premium user");
    }
    const csvData = convertToCSV(report);

    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(csvBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();

    // Clean up by revoking the URL.
    window.URL.revokeObjectURL(url);
  };

  // Function to convert JSON data to CSV format.
  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    return [header, ...rows].join("\n");
  };

  return (
    <div
      className={`leaderboardContainer border  ${
        darkFlag && "bg-black text-info"
      } `}
      style={{
        position: "absolute",
        minHeight: "80vh",
        width: "100vw",
        top: "170px",
        zIndex: 5,
        backgroundColor: "GrayText",
      }}>
      {report.length >=2 && (
        <div
          class="container bg-body-secondary table-responsive border border-danger  "
          style={{
            minHeight: "calc(100vh - 100px)",
          }}>
          <div className="container">
            <div className="row">
              <div className=" col m-4 text-primary">
                {report[0]?.name}'s Report Card
              </div>
              <div className=" col m-4 text-primary ">{report[0]?.email}</div>
              <div className=" col m-4 d-flex justify-content-between  ">
                <div className="text-primary">
                  {" "}
                  Total Expense: {report[0]?.totalExpenseAmount}${" "}
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary "
                    onClick={downloadReport}>
                    download
                  </button>
                </div>
              </div>
            </div>
          </div>

          <table class="table table-bordered ">
            <thead>
              <tr className="p-3 ">
                <th>
                  <div className="pt-1 pb-1 text-center ">#</div>
                </th>
                <th>
                  <div className="pt-1 pb-1 text-center">Catagory</div>
                </th>
                <th>
                  <div className="pt-1 pb-1 text-center">Description</div>
                </th>
                <th>
                  <div className="pt-1 pb-1 text-center">Expense</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {report.length >= 1 &&
                report.map((item, ind) => {
                  console.log({item})
                  return (
                    < >
                      {ind !== 0   && (
                              
                          item.expenses.map((item,index)=>{
                            
                            return(
                            <tr key={item._id} className="text-center ">
                          
                               <td>#</td>
                               <td>{item.category}</td>
                               <td>{item.description}</td>
                               <td>{item.amount}$</td>
                           
                             </tr>
                            )
                          })
                        
                   
                      )}
                      {
                        ind !=0 &&
                     
                  <tr className="text-center ">
               
                  <td></td>
                  <td className=" text-primary bg-light ">Total Expence of {item._id} </td>
                  <td></td>
                  <td className=" text-warning bg-primary  ">
                    {item.total}$
                  </td>
              
              </tr>
                }
                    </>
                  );
                })}
              <tr className="text-center ">
                <>
                  <td></td>
                  <td className=" text-warning bg-light ">Total Expence </td>
                  <td></td>
                  <td className=" text-warning bg-black  ">
                    {report[0]?.totalExpenseAmount}$
                  </td>
                </>
              </tr>
            </tbody>
          </table>
        </div>
      )}
       {isLoading && <LoadingSpinner />}
      {report.length < 2 && onceFetched && (
        <div class="alert alert-warning text-bg-info text-center  ">
          Add atleast 2 expenses...
        </div>
      )}
    </div>
  );
}
