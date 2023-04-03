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
import { useHistory } from "react-router";
import HostManager from "../HostManager/HostManager";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "../Style/Login";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errorSms, setErrorSms] = useState("");
  const [ValidUser, setValidUser] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginData, setLoginData] = useState({
    uname: "",
    pwd: "",
    rso: "",
  });
  const [flag, setFlag] = useState(false);
  console.log("ValidUser==>", ValidUser);
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
      userID: fieldValidator(loginData.uname, "Username"),
      password: fieldValidator(loginData.pwd, "Password"),
      region: fieldValidator(loginData.rso, "RSO name"),
      role: "",
      status: "",
      validInvalid: "",
    };
    console.log("inputData-->", inputData);
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
                history.push(
                  `/feedbackL1andL2/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "L3") {
                history.push(
                  `/indentL3/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "Admin") {
                history.push(
                  `/AdminHome/${response.data.value.userID}/${loginData.rso}`
                );
              }
            } else if (inputFrom === "PNPIM") {
              if (
                response.data.value.role === "L1" ||
                response.data.value.role === "L2"
              ) {
                history.push(
                  `/FeedbackL1AndL2/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "L3") {
                history.push(
                  `/indentL3/${response.data.value.userID}/${loginData.rso}`
                );
              } else if (response.data.value.role === "Admin") {
                history.push(
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
          console.log("error==>", error);
          setValidUser(false);
          setErrorSms("Please Enter Valid Username and Password!");
        });
    }
  };

  const handleClose = () => {
    setImmediate(() => {
      setFlag(false);
    });
  };
  const goHandler = () => {
    history.push(
      `/PortelCloseReport/${loginData.uname}/${loginData.rso}/${level}`
    );
  };

  // SHOW AND HIDE PASSWORD
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
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
    </>
  );
};
export default Login;
