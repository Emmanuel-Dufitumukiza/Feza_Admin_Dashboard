import react, { useEffect, useState } from "react";
import LeftBar from "./LeftBar";
import TopBar from "./TopBar";
import box from "../assets/images/box.png";
import box2 from "../assets/images/box2.png";
import Add from "@material-ui/icons/Add";
import Email from "@material-ui/icons/Email";
import EnhancedTable from "./EnhancedTable";
import Footer from "./Footer";
import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import {
  BrowserRouter,
  Routes,
  Link,
  unstable_HistoryRouter,
  useParams,
  useNavigate,
} from "react-router-dom";
import { axiosInstance } from "../../config";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SMB = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(async () => {
    let token = localStorage.getItem("token");
    if (token) {
      let decoded = jwt_decode(token);
      let userId = decoded.userId;

      if (userId) {
        axiosInstance
          .get("/auth/admin/" + userId)
          .then((res) => {
            setCurrentUser(res.data);
          })
          .catch((error) => {
            return navigate("/check");
          });
      } else {
        return navigate("/check");
      }
    } else {
      return navigate("/check");
    }
  }, []);

  const [clicked, setClicked] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const dangernotify = () =>
    toast.error("Please Complete All fields", {
      autoClose: 3000,
      theme: "colored",
    });

  const successnotify = () =>
    toast.success("Samall Business Created Successfully!", {
      autoClose: 3000,
      theme: "colored",
    });

  const successnotify2 = () =>
    toast.success("Samall Business deleted Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [value, setValue] = useState("");
  const [country, setCountry] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value.label);
    setValue(value);
  };

  useEffect(async () => {
    checkAuth();
  }, []);

  const [smbData, setSmbData] = useState({});
  const [userData, setUserData] = useState({});

  const getSMBData = (user, smb) => {
    setUserData(user[0]);
    setSmbData(smb);
  };

  const checkAuth = async () => {
    let token = localStorage.getItem("token");

    if (!token) {
      return navigate("/");
    }

    try {
      let res = await axiosInstance.get("/auth/checkAuth", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data.loggedIn) {
        localStorage.removeItem("token");
        return navigate("/");
      }
    } catch (error) {
      return navigate("/check");
    }
  };

  const [errors, setErrors] = useState(false);
  const [pValue, setPValue] = useState(false);

  const addSMB = async (e) => {
    e.preventDefault();

    try {
      if (!pValue) {
        setErrors(false);
        setClicked(true);
        setEmailError(null);

        let email = document.getElementById("emails").value?.trim();
        let fullname = document.getElementById("fullname").value?.trim();
        let password = document.getElementById("passwords").value;
        let bname = document.getElementById("bname").value?.trim();
        let bind = document.getElementById("bind").value?.trim();
        let bphone = document.getElementById("bphone").value?.trim();
        let badd = document.getElementById("badd").value?.trim();
        let job = document.getElementById("jobs").value?.trim();

        if (
          country?.length > 0 &&
          job?.length > 0 &&
          email.length > 0 &&
          fullname.length > 0 &&
          password?.length > 0 &&
          bname?.length > 0 &&
          bind?.length > 0 &&
          bphone?.length > 0 &&
          badd?.length > 0
        ) {
          setErrors(false);

          let data = {
            user: {
              email: email,
              fullname: fullname,
              country: country,
              jobPosition: job,
              password: password,
            },
            business: {
              user: null,
              business_name: bname,
              business_industry: bind,
              business_phone: bphone,
              business_address: badd,
            },
          };

          let res = await axiosInstance.post("/auth/register", data);

          setClicked(false);

          if (res.data.message?.length > 0) {
            setEmailError(res.data.message);
            return;
          } else {
            getBusinesses();
            document.getElementById("emails").value = "";
            document.getElementById("fullname").value = "";
            document.getElementById("passwords").value = "";
            document.getElementById("bname").value = "";
            document.getElementById("bind").value = "";
            document.getElementById("bphone").value = "";
            document.getElementById("badd").value = "";
            document.getElementById("jobs").value = "";
            setCountry(null);
            setTimeout(() => {
              document.getElementById("closeSMBCreate").click();
            }, 2000);
            if (document.getElementById("successBtn")) {
              return document.getElementById("successBtn").click();
            }
          }
        } else {
          setClicked(false);
          setErrors(true);
          if (document.getElementById("showError"))
            document.getElementById("showError").click();
        }
      }
    } catch (error) {
      setClicked(false);
      console.log(error);
      alert("An error occured, please try again");
    }
  };

  const checkPhone = () => {
    let bphone = document.getElementById("bphone").value?.trim();

    if (bphone.length != 10) {
      setPValue(true);
    } else {
      setPValue(false);
    }
  };

  const [notPass, setNotPass] = useState(null);
  const [allBusinesseses, setAllBusinesseses] = useState([]);
  const [busMon, setBusMon] = useState(null);
  const [allIndustries, setAllIndustries] = useState(null);

  const getBusinesses = async () => {
    let res = await axiosInstance.get(
      "/auth/getbusinesses/20222finance360appapiadmin"
    );
    setAllBusinesseses(res.data);
    let industries = [];
    let total = 0;

    for (let i = 0; i < res.data?.length; i++) {
      let y = new Date(res.data[i]?.createdAt)?.getFullYear();
      let mon = new Date(res.data[i]?.createdAt)?.getMonth();

      if (y == new Date().getFullYear() && mon == new Date().getMonth()) {
        total++;
      }

      if (!industries?.includes(res.data[i]?.business_industry)) {
        industries.push(res.data[i]?.business_industry);
      }
    }
    setAllIndustries(industries?.length);
    setBusMon(total);

    if (document.getElementById("getBs")) {
      document.getElementById("getBs").click();
    }
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  const deletesmb = async (e) => {
    e.preventDefault();
    let pass = document.getElementById("myPass").value;
    setNotPass(null);
    setClicked(true);

    let res = await axiosInstance.post("/auth/deletesmb", {
      dbPass: currentUser?.password,
      password: pass,
      business: smbData?._id,
      user: userData?._id,
    });
    setClicked(false);

    if (res.data.error) {
      setNotPass(res.data.error);
    } else {
      setNotPass(null);
      document.getElementById("successBtn2").click();
      document.getElementById("getBs").click();
      getBusinesses();
      document.getElementById("myPass").value = "";

      setTimeout(() => {
        document.getElementById("closeDele").click();
      }, 3000);
    }
  };

  return (
    <>
      <div className="smb-page px-3 pt-3 pb-3">
        <LeftBar active={"smb"}></LeftBar>

        <div className="left-conts px-3 pe-2 pb-0">
          <TopBar title={"Small Business"}></TopBar>
          {/* <NotificationContainer/> */}

          <div className="boxes-cont w-100 d-flex mt-3">
            <div className="box1 bg-white p-3 py-1 d-flex rounded shadow-sm me-3">
              <div className="mt-3 me-3">
                <h4 className="fw-bold">+{busMon} SMBs</h4>
                <p className="text-muted">this Month</p>
              </div>
              <div className="img-cont">
                <img src={box} alt="" />
              </div>
            </div>

            <div className="box1 bg-white p-3 py-1 d-flex rounded shadow-sm me-3">
              <div className="mt-3 me-3">
                <h4 className="fw-bold">{allIndustries} Industry</h4>
                <p className="text-muted">Total Industries</p>
              </div>
              <div className="img-cont">
                <img src={box} alt="" />
              </div>
            </div>

            <div className="box1 bg-white p-3 py-1 d-flex rounded shadow-sm">
              <div className="mt-3 me-3">
                <h4 className="fw-bold">
                  {allBusinesseses?.length} Total SMBs
                </h4>
                <p className="text-muted">In Total</p>
              </div>
              <div className="img-cont">
                <img src={box2} alt="" />
              </div>
            </div>
          </div>

          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-default logoutBtn fw-bold shadow-none float-end mb-5 mt-3"
          >
            <Add /> &nbsp;Addd SMB
          </button>
          <div className="all-cont mt-5 w-100">
            <span className="alltext fw-bold px-4">All</span>
          </div>

          {allBusinesseses?.length > 0 ? (
            <>
              <div className="table-cont border rounded mt-4 mb-5 shadow-sm">
                <EnhancedTable getSMBData={getSMBData}></EnhancedTable>
              </div>
            </>
          ) : (
            <>
              <br />
              <br />
              <br />
              <br />
              <h5 className="text-center my-5 fw-bold">
                No Businesses Available
              </h5>
            </>
          )}

          <Footer />
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="exampleModalLabel">
                Register SMB
              </h5>
              <button
                type="button"
                id="closeSMBCreate"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form method="POST" onSubmit={addSMB} className="modal-body">
              <div>
                <button
                  id="showError"
                  style={{ display: "none" }}
                  type="button"
                  onClick={dangernotify}
                >
                  Notify!
                </button>
                <ToastContainer autoClose={3000} />
              </div>
              <div>
                <button
                  id="successBtn"
                  style={{ display: "none" }}
                  type="button"
                  onClick={successnotify}
                >
                  Notify!
                </button>
                <ToastContainer autoClose={3000} />
              </div>
              <div className="d-flex w-100 px-3">
                <div className="personal-detail-form w-50 h-100 px-3 pe-5">
                  <h5 className="text-center mb-4">Personal Detail</h5>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-user"></i>
                    <input
                      required
                      id="fullname"
                      maxLength={"50"}
                      name="email"
                      type="text"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-envelope"></i>
                    <input
                      id="emails"
                      required
                      maxLength={"90"}
                      name="email"
                      type="email"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Email address"
                    />
                  </div>
                  {emailError ? (
                    <>
                      <small className="text-danger fw-bold">
                        {emailError}
                      </small>
                      <br />
                      <br />
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="inp-cont2 w-100 ps-0 mb-2">
                    <Select
                      options={options}
                      placeholder="Select country"
                      className="select-input"
                      value={value}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-lock"></i>
                    <input
                      required
                      maxLength={"25"}
                      name="email"
                      id="passwords"
                      type="password"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Password"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-user-graduate"></i>
                    <select
                      required
                      name=""
                      id="jobs"
                      className="form-select shadow-none"
                    >
                      <option value="">Job Position</option>
                      <option value="1">Business Owner</option>
                      <option value="2">Business Manager</option>
                      <option value="3">Accountant</option>
                    </select>
                  </div>
                </div>

                <div className="business-detail-form w-50 mb-5 px-3 ps-5 h-100">
                  <h5 className="text-center mb-4">Business Details</h5>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-briefcase"></i>
                    <input
                      required
                      maxLength={"70"}
                      name="email"
                      type="text"
                      id="bname"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Name"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-industry"></i>
                    <input
                      required
                      maxLength={"70"}
                      name="email"
                      type="text"
                      id="bind"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Industry"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-phone"></i>
                    <input
                      required
                      name="email"
                      onBlur={checkPhone}
                      type="number"
                      id="bphone"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Phone"
                    />
                  </div>
                  {pValue ? (
                    <>
                      <small className="text-danger fw-bold">
                        Invalid Phone number
                      </small>
                      <br />
                      <br />
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-address-card"></i>
                    <input
                      required
                      id="badd"
                      maxLength={"80"}
                      name="email"
                      type="text"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Address"
                    />
                  </div>

                  {clicked ? (
                    <button
                      type="button"
                      className="btn shadow-none btn-default w-25 float-end fw-bold logoutBtn mt-3"
                    >
                      <span className="spinner spinner-border spinner-border-sm"></span>{" "}
                      Sign up..
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn shadow-none btn-default w-25 float-end fw-bold logoutBtn mt-3"
                    >
                      Sign up
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* view more modal */}

      <div
        className="modal fade"
        id="viewMoreSMB"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="exampleModalLabel">
                SMB Account Details
              </h5>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p
                className="text-muted text-center my-3 fw-bold"
                style={{ fontSize: "18px" }}
              >
                User ID: {userData?.companyId}
              </p>

              <div className="d-flex w-100 px-3">
                <div className="personal-detail-form w-50 h-100 px-3 pe-5">
                  <h5 className="text-center mb-4">Personal Detail</h5>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-user"></i>
                    <input
                      required
                      value={userData?.fullname}
                      name="email"
                      type="text"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-envelope"></i>
                    <input
                      value={userData?.email}
                      required
                      name="email"
                      type="email"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="inp-cont2 w-100 ps-0 mb-2">
                    <Select
                      options={options}
                      defaultInputValue={userData?.country}
                      placeholder="Select country"
                      className="select-input"
                      onChange={changeHandler}
                    />
                  </div>

                  {/* <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
            <i className="fa fa-lock"></i>
           <input required  value={userData?.password} name="email" type="password" className="form-control shadow-none w-100 border-0" placeholder="Password"/>
         </div> */}

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-user-graduate"></i>
                    <select name="" id="" className="form-select shadow-none">
                      <option disabled>Job Position</option>
                      {userData?.jobPosition == "1" ? (
                        <>
                          <option selected value="1">
                            Business Owner
                          </option>
                          <option value="2">Business Manager</option>
                          <option value="3">Accountant</option>
                        </>
                      ) : userData?.jobPosition == "2" ? (
                        <>
                          <option value="1">Business Owner</option>
                          <option value="2" selected>
                            Business Manager
                          </option>
                          <option value="3">Accountant</option>
                        </>
                      ) : userData?.jobPosition == "3" ? (
                        <>
                          <option selected value="1">
                            Business Owner
                          </option>
                          <option value="2">Business Manager</option>
                          <option value="3" selected>
                            Accountant
                          </option>
                        </>
                      ) : (
                        <></>
                      )}
                    </select>
                  </div>
                </div>

                <div className="business-detail-form w-50 mb-5 px-3 ps-5 h-100">
                  <h5 className="text-center mb-4">Business Details</h5>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-briefcase"></i>
                    <input
                      value={smbData?.business_name}
                      required
                      name="email"
                      type="text"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Name"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-industry"></i>
                    <input
                      value={smbData?.business_industry}
                      required
                      name="email"
                      type="text"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Industry"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-phone"></i>
                    <input
                      value={smbData?.business_phone}
                      required
                      name="email"
                      type="text"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Phone"
                    />
                  </div>

                  <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                    <i className="fa fa-address-card"></i>
                    <input
                      value={smbData?.business_address}
                      required
                      name="email"
                      type="text"
                      className="form-control shadow-none w-100 border-0"
                      placeholder="Business Address"
                    />
                  </div>

                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#deleteSMBModal"
                    data-bs-dismiss="modal"
                    className="btn shadow-none btn-default w-25 float-end fw-bold logoutBtn mt-3 delUser"
                  >
                    Delete User
                  </button>
                  <button
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn shadow-none btn-default float-end me-5 fw-bold logoutBtn mt-3"
                    onClick={() => navigate("/dashboard/" + userData?._id)}
                  >
                    View Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* delete smb modal */}

      <div
        className="modal fade"
        id="deleteSMBModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div>
            <button
              id="successBtn2"
              style={{ display: "none" }}
              type="button"
              onClick={successnotify2}
            >
              Notify!
            </button>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {smbData?.business_name}
              </h5>
              <button
                id="closeDele"
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form method="POST" onSubmit={deletesmb} className="modal-body">
              <p className="mb-3 fw-bold">
                Are you sure, you want to delete this small business?{" "}
              </p>
              <label htmlFor="myPass">
                <span className="text-muted  mb-4">
                  Enter Password To Delete This Business
                </span>
              </label>
              <br />
              <div className="inp-cont2 d-flex w-100 ps-0 mb-3">
                <i className="fa fa-lock"></i>
                <input
                  required
                  maxLength={"25"}
                  name="email"
                  id="myPass"
                  type="password"
                  className="form-control shadow-none w-100 border-0"
                  placeholder="Password"
                />
              </div>
              {notPass ? (
                <p className="text-danger alert-danger text-center p-2 fw-bold rounded">
                  {notPass}
                </p>
              ) : (
                <></>
              )}
              <button
                type="submit"
                className="btn btn-danger shadow-none mt-3 float-end"
              >
                {clicked ? (
                  <span className="spinner spinner-border spinner-border-sm me-2"></span>
                ) : (
                  <></>
                )}
                Delete SMB
              </button>
            </form>
            {/* <div className="modal-footer"> */}
            {/* <button type="button" className="btn btn-secondary shadow-none" data-bs-dismiss="modal">Close</button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SMB;
