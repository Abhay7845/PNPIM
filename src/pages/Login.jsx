import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "../component/InputField";
import PersonIcon from "@material-ui/icons/Person";
import PublicIcon from "@material-ui/icons/Public";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Logo from "../images/Tanishq_Logo1.png";
import axios from "axios";
import { Button, Container, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import HostManager from "../HostManager/HostManager";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "../Style/Login";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorSms, setErrorSms] = useState("");
  const [ValidUser, setValidUser] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginData, setLoginData] = useState({
    uname: "",
    pwd: "",
    rso: "",
  });
  const [flag, setFlag] = useState(false);
  const [level, setLevel] = useState("");
  const OnChangeInput = (event) => {
    const { name, value } = event.target;
    setImmediate(() => {
      setLoginData(function (preData) {
        switch (name) {
          case "uname":
            return {
              ...preData,
              [name]: value,
            };
          case "pwd":
            return {
              ...preData,
              [name]: value,
            };
          case "rso":
            return {
              ...preData,
              [name]: value,
            };
          default:
            break;
        }
      });
    });
  };

  const fieldValidator = (fieldValue, fieldName) => {
    if (fieldValue === "") {
      setErrorSms(`${fieldName} is required`);
      return undefined;
    } else {
      return fieldValue;
    }
  };
  const OnClickHandler = (inputFrom) => {
    let inputData = {
      userID: fieldValidator(loginData.uname, "Useranme"),
      password: fieldValidator(loginData.pwd, "Password"),
      region: fieldValidator(loginData.rso, "RSO name"),
      role: "",
      status: "",
      validInvalid: "",
    };

    if (inputData.userID && inputData.password && inputData.region) {
      setValidUser(true);
      axios
        .post(`${HostManager.mainHost}/npim/user/login`, inputData)
        .then((response) => {
          localStorage.setItem("store_value", response.data.value.role);
          localStorage.setItem("store_code", response.data.value.userID);
          setImmediate(() => {
            setLevel(response.data.value.role);
          });

          if (response.data.value.status === "open") {
            if (inputFrom === "DNPIM") {
              if (
                response.data.value.role === "L1" ||
                response.data.value.role === "L2"
              ) {
                navigate(
                  `/feedbackL1andL2/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "L3") {
                navigate(
                  `/indentL3/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "Admin") {
                navigate(
                  `/AdminHome/${response.data.value.userID}/${loginData.rso}`
                );
              }
            } else if (inputFrom === "PNPIM") {
              if (
                response.data.value.role === "L1" ||
                response.data.value.role === "L2"
              ) {
                navigate(
                  `/FeedbackL1AndL2/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "L3") {
                navigate(
                  `/indentL3/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "Admin") {
                navigate(
                  `/AdminHome/${response.data.value.userID}/${loginData.rso}`
                );
              }
            }
          } else if (response.data.value.status === "close") {
            setImmediate(() => {
              setFlag(true);
            });
          }
          setValidUser(false);
        })
        .catch((error) => {
          console.log("login page==>", error);
          setErrorSms("Please Enter Valid Username and Password!");
          setValidUser(false);
        });
    }
  };

  const handleClose = () => {
    setImmediate(() => {
      setFlag(false);
    });
  };
  const goHandler = () => {
    navigate(`/PortelCloseReport/${loginData.uname}/${loginData.rso}/${level}`);
  };

  // SHOW AND HIDE PASSWORD
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <React.Fragment>
      <div>
        <Dialog
          open={flag}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h6" color="secondary" align="center">
              NPIM Portel Closed...!
            </Typography>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
              >
                You can see the Report
              </Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>

            <Button onClick={goHandler} color="primary" autoFocus>
              Go TO Report
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className={classes.root}>
        <Container
          maxWidth="lg"
          align="center"
          className={classes.containerStyle}
        >
          <div className="card">
            <div className="card-body ">
              <div className="text-center mb-2  ">
                <img
                  src={Logo}
                  className="rounded"
                  alt="not Loaded"
                  width="80"
                  height="60"
                />
              </div>
              <div className="text-sm-center">
                <span className=" mb-3 text-danger">
                  {errorSms !== "" ? errorSms : null}
                </span>
              </div>
              <InputField
                value={loginData.uname}
                name="uname"
                labelName={<PersonIcon />}
                placeholderName="Enter Username"
                onHendler={OnChangeInput}
                type="text"
              />
              <InputField
                value={loginData.pwd}
                name="pwd"
                labelName={
                  passwordShown === false ? (
                    <VisibilityOffIcon
                      onClick={togglePassword}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={togglePassword}
                      style={{ cursor: "pointer" }}
                    />
                  )
                }
                placeholderName="Enter Password "
                onHendler={OnChangeInput}
                type={passwordShown ? "text" : "password"}
              />
              <InputField
                value={loginData.rso}
                name="rso"
                labelName={<PublicIcon />}
                placeholderName="Enter RSO"
                onHendler={OnChangeInput}
                type="text"
              />
              <button
                className="btn btn-warning w-100"
                onClick={() => OnClickHandler("PNPIM")}
              >
                {ValidUser ? (
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span>LOGIN</span>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Login;
