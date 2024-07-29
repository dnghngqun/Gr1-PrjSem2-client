import axios from "axios";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./Css/Admin.css";
import "./Css/adminEffect.css";
import NavAdmin from "./NavAdmin";
import SideBarAdmin from "./sideBarAdmin";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Admin = ({ isLoggedIn, onLogout }) => {
  const [payments, setPayments] = useState([]);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const time = new Date();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const [yearlyBreakup, setYearlyBreakup] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  //getAllPayment
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/payments/paymentOrder")
      .then((res) => {
        console.log("get all payment success!");
        setPayments(res.data.data);
      })
      .catch((err) => {
        console.error("Err to fetch all payments: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/revenue/monthly", {
        params: { year: year },
      })
      .then((response) => {
        const result = response.data;
        setData({
          labels: Object.keys(result),
          datasets: [
            {
              label: "Revenue",
              data: Object.values(result),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching revenue data:", error));
  }, []);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // Fetch yearly breakup
        const yearlyResponse = await axios.get(
          "http://localhost:8080/api/v1/payments/revenue/yearly"
        );
        setYearlyBreakup(yearlyResponse.data.yearlyBreakup);

        // Fetch monthly earnings for the current year
        const monthlyResponse = await axios.get(
          `http://localhost:8080/api/v1/payments/revenue/monthly?year=${year}`
        );
        setMonthlyEarnings(monthlyResponse.data.monthlyEarnings[month]);
        console.log("Month: ", month);
        console.log(monthlyResponse.data.monthlyEarnings[month]);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRevenueData();
  }, [year]);
  console.log("Month: ", monthlyEarnings);
  return (
    <div>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed">
        {/* left side-bar */}
        <SideBarAdmin onLogout={onLogout} />

        {/* right */}
        <div className="body-wrapper">
          {/* header */}
          <NavAdmin isLoggedIn={isLoggedIn} />
          {/* body */}
          <div
            className="container-fluid"
            style={{ maxWidth: "100%", paddingLeft: "0", paddingRight: "0" }}>
            <div className="row">
              <div className="col-lg-8 d-flex align-items-strech">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                      <div className="mb-3 mb-sm-0">
                        <h2
                          className="card-title fw-semibold "
                          style={{ paddingTop: "1rem" }}>
                          Monthly Revenue
                        </h2>
                      </div>
                    </div>
                    <Line data={data} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card overflow-hidden">
                      <div className="card-body p-4">
                        <h5 className="card-title mb-9 fw-semibold">
                          Yearly Breakup
                        </h5>
                        <div className="row align-items-center">
                          <div className="col-8">
                            <h4 className="fw-semibold mb-3">
                              {yearlyBreakup !== undefined
                                ? currencyFormatter.format(yearlyBreakup)
                                : "Updating..."}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row alig n-items-start">
                          <div className="col-8">
                            <h5
                              className="card-title mb-9 fw-semibold"
                              style={{ paddingTop: "1rem" }}>
                              {" "}
                              Monthly Earnings{" "}
                            </h5>
                            <h4 className="fw-semibold mb-3">
                              {monthlyEarnings !== undefined
                                ? currencyFormatter.format(monthlyEarnings)
                                : "Updating..."}
                            </h4>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-end">
                              <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                <i className="ti ti-currency-dollar fs-6"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">
                      Recent Transactions
                    </h5>
                    <div className="table-responsive">
                      <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                          <tr>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Id</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Name</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Email</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Payment Id</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Course</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Payment Date</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Discount</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Total Amount</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* slice lấy 4 phần tử đầu tiên */}
                          {payments.slice(0, 4).map((item, index) => {
                            const account = item.account;
                            const course = item.orderDetail.course;
                            return (
                              <>
                                <tr key={item}>
                                  <td className="border-bottom-0">
                                    <h6 className="fw-semibold mb-0">
                                      {index + 1}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <h6
                                      className="fw-semibold text-wrap mb-0"
                                      style={{ width: "150px" }}>
                                      {account.fullName}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <h6
                                      className="fw-semibold text-wrap mb-0"
                                      style={{ width: "200px" }}>
                                      {account.email}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <h6
                                      className="fw-semibold text-wrap mb-0"
                                      style={{ width: "150px" }}>
                                      {item.paymentId}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <span
                                      className="fw-semibold text-wrap mb-0"
                                      style={{ width: "100px" }}>
                                      {course.name}
                                    </span>
                                  </td>
                                  <td className="border-bottom-0">
                                    <h6
                                      className="fw-semibold text-wrap mb-0"
                                      style={{ width: "150px" }}>
                                      {item.paymentDate}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <h6
                                      className="badge bg-warning rounded-3 fw-semibold mb-0"
                                      style={{ width: "60px" }}>
                                      {item.discount}
                                    </h6>
                                  </td>{" "}
                                  <td className="border-bottom-0">
                                    <span
                                      className="badge bg-primary rounded-3 fw-semibold"
                                      style={{ width: "90px" }}>
                                      ${item.amount}
                                    </span>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
