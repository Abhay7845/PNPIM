import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
} from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import UpperHeader from "../Components/UpperHeader";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import {
  AdminLoginCredentials,
  DataGridForAdmin,
  SelectOfMUI,
  TextFieldOfMUI,
} from "../Components/ComponentFroAdmin";
import { useParams } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import HostManager from "../HostManager/HostManager";
import SideAppBar from "../Components/SideAppBar";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import UpdateIcon from "@material-ui/icons/Update";
import { AdminLoginHeading } from "../DataCenter/DataList";
const useStyle = makeStyles({
  root: {
    margin: "0%",
    padding: "0%",
  },
});

function AdminHome(props) {
  const classes = useStyle();
  const { storeCode, rsoName } = useParams();
  const [barOpener, setBarOpener] = useState(false);
  const [adminLoginData, setAdminLoginData] = useState([]);
  const [adminDeskBoardInput, setAdminDeskBoardInput] = useState({
    fromDate: "",
    fromStoreCode: "",
    toStoreCode: "",
    level: "",
    status: "",
  });
  const [masterFile, setMasterFile] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [alertState, setAlertState] = useState({
    alertFlag1: false,
    alertFlag2: false,
    alertFlag3: false,
    alertSeverity: "",
    alertMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [toStoreList, setToStoreList] = useState([]);
  const [masterExcels, setMasterExcels] = useState({
    rows: [],
    cols: [],
  });
  useEffect(() => {
    if (adminDeskBoardInput.fromDate) {
      restServicesCaller("storeList");
    }
  }, [adminDeskBoardInput.fromDate]);

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/AdminHome/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 2,
      name: "Day End Report",
      link: `/dayEndReportForAdmin/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
    {
      id: 4,
      name: "Send Store Report",
      link: `/SendStoreReportAdmin/${storeCode}/${rsoName}`,
      icon: "SendIcon",
    },
  ];

  function onChangeInputHandler(event) {
    let { name, value } = event.target;
    if (name === "fromDate") {
      setImmediate(() => {
        setAdminDeskBoardInput({
          fromDate: value,
          fromStoreCode: "",
          toStoreCode: "",
        });
      });
    } else {
      setImmediate(() => {
        setAdminDeskBoardInput((old) => {
          return {
            ...old,
            [name]: value,
          };
        });
      });
    }
  }

  const copyIndentsStore = () => {
    if (
      !adminDeskBoardInput.fromStoreCode ||
      !adminDeskBoardInput.toStoreCode
    ) {
      setAlertState({
        alertFlag1: true,
        alertSeverity: "error",
        alertMessage: "Please Select Valid Input",
      });
    } else {
      setLoading(true);
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/store/response/copy/${adminDeskBoardInput.fromStoreCode}/${adminDeskBoardInput.toStoreCode}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag1: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            setLoading(false);
          } else if (response.data.code === "1001") {
            setAlertState({
              alertFlag1: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
            setLoading(false);
          }
        })
        .catch((error) => console.log("error==>", error));
    }
  };

  function restServicesCaller(triggerFrom) {
    setImmediate(() => {
      setAlertState({
        alertFlag1: false,
        alertFlag2: false,
        alertFlag3: false,
        alertSeverity: "success",
        alertMessage: "initial",
      });
    });
    setImmediate(() => {
      setLoading(true);
    });
    if (triggerFrom === "toStoreList") {
      setTimeout(() => {
        axios
          .get(`${HostManager.mailHostAdmin}/npim/to/store/list`)
          .then((response) => {
            console.log("response==>", response.data);
            if (response.data.code === "1000") {
              setImmediate(() => {
                setToStoreList(response.data.value);
              });
            } else {
              setImmediate(() => {
                setAlertState({
                  alertFlag1: true,
                  alertSeverity: "error",
                  alertMessage: response.data.value,
                });
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    } else if (triggerFrom === "storeList") {
      if (adminDeskBoardInput.fromDate) {
        axios
          .get(
            `${HostManager.mailHostAdmin}/npim/from/store/list/${adminDeskBoardInput.fromDate}`
          )
          .then(
            (response) => {
              console.log(response.data);
              if (response.data.code === "1000") {
                setImmediate(() => {
                  setStoreList(response.data.value);
                });
                setImmediate(() => {
                  setAlertState({
                    alertFlag1: false,
                    alertFlag2: false,
                    alertFlag3: false,
                    alertSeverity: "error",
                    alertMessage: response.data.value,
                  });
                });
              } else {
                setImmediate(() => {
                  setAlertState({
                    alertFlag1: true,
                    alertSeverity: "error",
                    alertMessage: response.data.value,
                  });
                });
              }
            },
            (error) => {
              console.log(error);
            }
          );
        restServicesCaller("toStoreList");
      } else {
        setImmediate(() => {
          setAlertState({
            alertFlag1: true,
            alertSeverity: "error",
            alertMessage: "Invalid Input Passing...!",
          });
        });
      }
    } else if (triggerFrom === "status") {
      if (adminDeskBoardInput.level && adminDeskBoardInput.status) {
        axios
          .post(`${HostManager.mailHostAdmin}/npim/open/portal`, {
            level: adminDeskBoardInput.level,
            mode: adminDeskBoardInput.status,
          })
          .then(
            (response) => {
              console.log(response.data);
              if (response.data.code === "1000") {
                setImmediate(() => {
                  setAlertState({
                    alertFlag3: true,
                    alertSeverity: "success",
                    alertMessage: response.data.value,
                  });
                });
              } else {
                setImmediate(() => {
                  setAlertState({
                    alertFlag3: true,
                    alertSeverity: "error",
                    alertMessage: response.data.value,
                  });
                });
              }
            },
            (error) => {
              console.log(error);
              setImmediate(() => {
                setAlertState({
                  alertFlag3: true,
                  alertSeverity: "error",
                  alertMessage: error,
                });
              });
            }
          );
      } else {
        setImmediate(() => {
          setAlertState({
            alertFlag3: true,
            alertSeverity: "error",
            alertMessage: "Invalid Input Passing...!",
          });
        });
      }
    }
    setImmediate(() => {
      setLoading(false);
    });
  }

  // UPLOAD FILE DATA

  const uploadFileData = () => {
    if (!masterFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", masterFile);
      axios({
        method: "post",
        url: `${HostManager.mailHostAdmin}/npim/insert/sku/master`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag2: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            setLoading(false);
          } else if (response.data.code === "1001") {
            setAlertState({
              alertFlag2: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          setAlertState({
            alertFlag2: true,
            alertSeverity: "error",
            alertMessage: "File Not Uploaded",
          });
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  // GET SKU MASTER DATA
  const GetSKUMasterData = () => {
    setLoading(true);
    axios
      .get(`${HostManager.mailHostAdmin}/npim/get/sku/master`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setMasterExcels({
            rows: response.data.value,
            cols: response.data.col,
          });
          setLoading(false);
        }
      })
      .catch((error) => console.log("error==>", error));
  };

  function FetchCredentials() {
    if (labelValue === "") {
      alert("Please Select Level");
    } else {
      setLoading(true);
      axios
        .get(
          `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIMADMIN/get/login/data/admin/${labelValue}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAdminLoginData(response.data.value);
          }
          setLoading(false);
        })
        .catch((error) => console.log("error==>", error));
    }
  }
  return (
    <>
      <CssBaseline />
      <Drawer
        anchor="left"
        open={barOpener}
        onClose={() => {
          setImmediate(() => {
            setBarOpener(false);
          });
        }}
      >
        <SideAppBar
          navBarList={navBarList}
          pageName="admin"
          // statusOpener={statusOpener}
        />
      </Drawer>

      <Container maxWidth="xl" className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <UpperHeader itemCode="NO Available" storeCode={storeCode} />
            <Loading flag={loading} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReportsAppBar
              barHandler={() => {
                setImmediate(() => {
                  setBarOpener(true);
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Container maxWidth="xl" style={{ marginTop: "2%" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddSharpIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Copy Store Indents
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            {alertState.alertFlag1 ? (
                              <Alert severity={alertState.alertSeverity}>
                                {alertState.alertMessage}
                              </Alert>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="From Date"
                              type="date"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={adminDeskBoardInput.fromDate}
                              name="fromDate"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="From Store Code"
                              optionList={storeList.map(
                                (element) => element.strCode
                              )}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.fromStoreCode}
                              name="fromStoreCode"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="To Store Code"
                              optionList={toStoreList}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.toStoreCode}
                              name="toStoreCode"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={copyIndentsStore}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>
                                  COPY
                                  <FileCopyIcon
                                    className="mx-1 "
                                    style={{ fontSize: "18px" }}
                                  />
                                </span>
                              )}
                            </button>
                          </Grid>
                        </Grid>
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddSharpIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Master File Upload
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <Container maxWidth="sm">
                            <Grid className="text-danger">
                              <h6 className="text-justify">
                                <b className="text-dark">1.</b> **Please make
                                sure that GENDER column is not blank for
                                Categories like BRACELET, COUPLE BAND, FINGER
                                RING, ANKLETS, TOE RING, MANGALSUTRA, CHAIN &
                                WAIST BELT.
                              </h6>
                              <h6 className="text-justify">
                                <b className="text-dark">2.</b> **Please make
                                sure that GENDER & SHAPE column is not blank for
                                BANGLE CATEGORY.
                              </h6>
                              <h6 className="text-justify">
                                <b className="text-dark">3.</b> **Please make
                                sure that FINDINGS column is not blank for
                                Categories like DROP EARRING JHUMKA, & STUD
                                EARRING.
                              </h6>
                              <h6 className="text-justify">
                                <b className="text-dark">4.</b> **Please make
                                sure that ChildNodes_N & ChildNodes_E column is
                                not blank for Categories like G-CATEGORY, SET0,
                                SET1, SET2 & T-CATEGORY.
                              </h6>
                              <hr />
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12}>
                                {alertState.alertFlag2 ? (
                                  <Alert severity={alertState.alertSeverity}>
                                    {alertState.alertMessage}
                                  </Alert>
                                ) : (
                                  ""
                                )}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Typography color="initial" variant="subtitle2">
                                  If you want to master SKU template then please
                                  click &nbsp;
                                  <a
                                    href="https://docs.google.com/spreadsheets/d/1AoThWIV-h0xRdn1ONW_qABM_CvIsVicBx2JiehwODeA/edit#gid=0"
                                    target="_blank"
                                  >
                                    Master Template
                                  </a>
                                </Typography>
                                <br />
                                <TextFieldOfMUI
                                  label="Master File"
                                  type="file"
                                  textFieldHandlerChange={(e) =>
                                    setMasterFile(e.target.files[0])
                                  }
                                  value={adminDeskBoardInput.masterFile}
                                  name="masterFile"
                                  required={true}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <button
                                  className="btn btn-primary w-100"
                                  onClick={uploadFileData}
                                >
                                  {loading ? (
                                    <span
                                      className="spinner-border spinner-border-sm text-light"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span>
                                      UPLOAD
                                      <CloudUploadIcon
                                        style={{
                                          marginTop: "-5px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </span>
                                  )}
                                </button>
                              </Grid>
                            </Grid>
                          </Container>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddSharpIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Update Portal Status
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            {alertState.alertFlag3 ? (
                              <Alert severity={alertState.alertSeverity}>
                                {alertState.alertMessage}
                              </Alert>
                            ) : (
                              ""
                            )}
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="Level"
                              optionList={["L1", "L2", "L3"]}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.level}
                              name="level"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="Status"
                              optionList={["Open", "Close"]}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.status}
                              name="status"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button
                              onClick={() => {
                                restServicesCaller("status");
                              }}
                              color="inherit"
                              variant="contained"
                              fullWidth
                              style={{ minHeight: "100%" }}
                              endIcon={<UpdateIcon />}
                            >
                              Update Status
                            </Button>
                          </Grid>
                        </Grid>
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddSharpIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Get Master SKU
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <Container maxWidth="sm">
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12}>
                                {alertState.alertFlag4 ? (
                                  <Alert severity={alertState.alertSeverity}>
                                    {alertState.alertMessage}
                                  </Alert>
                                ) : (
                                  ""
                                )}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <button
                                  className="btn btn-primary w-100"
                                  onClick={GetSKUMasterData}
                                >
                                  {loading ? (
                                    <span
                                      className="spinner-border spinner-border-sm text-light"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span>SEE MASTER</span>
                                  )}
                                </button>
                              </Grid>
                            </Grid>
                          </Container>
                        </Grid>
                        {masterExcels.rows.length > 0 && (
                          <Grid item xs={12} sm={12}>
                            <Container maxWidth="xl">
                              <DataGridForAdmin
                                col={masterExcels.cols}
                                rows={masterExcels.rows}
                              />
                            </Container>
                          </Grid>
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<AddSharpIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Login Credentials
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="Level"
                              optionList={["L1", "L2", "L3"]}
                              selectHandleChange={(e) =>
                                setLabelValue(e.target.value)
                              }
                              value={labelValue}
                              name="level"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={FetchCredentials}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>FETCH CREDENTIALS</span>
                              )}
                            </button>
                          </Grid>
                        </Grid>
                        {adminLoginData.length > 0 && (
                          <AdminLoginCredentials
                            col={AdminLoginHeading}
                            rows={adminLoginData}
                          />
                        )}
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AdminHome;
