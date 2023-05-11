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
import Loading from "../component/Loading";
import ReportsAppBar from "../component/ReportsAppBar";
import UpperHeader from "../component/UpperHeader";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import {
  DataGridForAdmin,
  SelectOfMUI,
  TextFieldOfMUI,
} from "../component/ComponentFroAdmin";
import { useParams } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import HostManager from "../HostManager/HostManager";
import SideAppBar from "../component/SideAppBar";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import UpdateIcon from "@material-ui/icons/Update";
import { AdminData, AdminLoginHeading } from "../DataCenter/DataList";
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
  console.log("masterExcels.rows==>", masterExcels);
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
      link: `/dayEndreportForAdmin/${storeCode}/${rsoName}`,
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

  function OnFileChange(event) {
    setImmediate(() => {
      setMasterFile(event.target.files[0]);
    });
  }

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

    if (triggerFrom === "copy") {
      if (
        adminDeskBoardInput.fromStoreCode &&
        adminDeskBoardInput.toStoreCode
      ) {
        setTimeout(() => {
          axios
            .get(
              `${HostManager.mailHostAdmin}/npim/store/response/copy/${adminDeskBoardInput.fromStoreCode}/${adminDeskBoardInput.toStoreCode}`
            )
            .then((responce) => {
              console.log(responce.data);
              if (responce.data.code === "1000") {
                setImmediate(() => {
                  setAlertState({
                    alertFlag1: true,
                    alertSeverity: "success",
                    alertMessage: responce.data.value,
                  });
                });
              } else {
                setImmediate(() => {
                  setAlertState({
                    alertFlag1: true,
                    alertSeverity: "error",
                    alertMessage: responce.data.value,
                  });
                });
              }
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }, 1000);
      } else {
        setImmediate(() => {
          setAlertState({
            alertFlag1: true,
            alertSeverity: "error",
            alertMessage: "Invalid Input Passing...!",
          });
        });
      }
    } else if (triggerFrom === "toStoreList") {
      setTimeout(() => {
        axios
          .get(`${HostManager.mailHostAdmin}/npim/to/store/list`)
          .then((responce) => {
            console.log(responce.data);
            if (responce.data.code === "1000") {
              setImmediate(() => {
                setToStoreList(responce.data.value);
              });
            } else {
              setImmediate(() => {
                setAlertState({
                  lertFlag1: true,
                  alertSeverity: "error",
                  alertMessage: responce.data.value,
                });
              });
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
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
              alert(error);
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
    } else if (triggerFrom === "master") {
      if (masterFile) {
        let formData = new FormData();
        console.log(masterFile, "master");
        formData.append("masterFile", masterFile);
        axios({
          method: "post",
          url: `${HostManager.mailHostAdmin}npim/insert/sku/master`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(
          (response) => {
            console.log(response.data);
            if (response.data.code === "1000") {
              setImmediate(() => {
                setAlertState({
                  alertFlag2: true,
                  alertSeverity: "success",
                  alertMessage: response.data.value,
                });
              });
            } else {
              setImmediate(() => {
                setAlertState({
                  alertFlag2: true,
                  alertSeverity: "error",
                  alertMessage: response.data.value,
                });
              });
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
      } else {
        setImmediate(() => {
          setAlertState({
            alertFlag2: true,
            alertSeverity: "error",
            alertMessage: "Invalid Input Passing...!",
          });
        });
      }
    } else if (triggerFrom === "getMaster") {
      axios
        .get(`${HostManager.mailHostAdmin}/npim/get/sku/master`)
        .then((responce) => {
          console.log("responseMaster==>", responce.data);
          if (responce.data.code === "1000") {
            setImmediate(() => {
              setMasterExcels({
                rows: responce.data.value,
                cols: responce.data.col,
              });
            });
          } else {
            setImmediate(() => {
              setAlertState({
                alertFlag4: true,
                alertSeverity: "error",
                alertMessage: responce.data.value,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setImmediate(() => {
            setAlertState({
              alertFlag4: true,
              alertSeverity: "error",
              alertMessage: error,
            });
          });
        });
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
              // alert(error);
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

    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    }, 3000);
  }

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
  console.log("adminLoginData==>", adminLoginData);
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
                              lable="From Date"
                              type="date"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={adminDeskBoardInput.fromDate}
                              name="fromDate"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              lable="From Store Code"
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
                              lable="To Store Code"
                              optionList={toStoreList}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.toStoreCode}
                              name="toStoreCode"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button
                              onClick={() => {
                                restServicesCaller("copy");
                                setLoading(true);
                              }}
                              color="inherit"
                              variant="contained"
                              fullWidth
                              style={{ minHeight: "100%" }}
                              endIcon={<FileCopyIcon />}
                            >
                              Copy
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
                                    href={`${HostManager.mailHostAdmin}/npim/master/template/export`}
                                  >
                                    MasterTemplate
                                  </a>
                                </Typography>
                                <br />
                                <TextFieldOfMUI
                                  lable="Master File"
                                  type="file"
                                  textFieldHandlerChange={OnFileChange}
                                  value={adminDeskBoardInput.masterFile}
                                  name="masterFile"
                                  required={true}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Button
                                  onClick={() => {
                                    restServicesCaller("master");
                                    setLoading(true);
                                  }}
                                  color="inherit"
                                  variant="contained"
                                  fullWidth
                                  style={{ minHeight: "100%" }}
                                  endIcon={<CloudUploadIcon />}
                                >
                                  Upload
                                </Button>
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
                        Update Status
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
                              lable="Level"
                              optionList={["L1", "L2", "L3"]}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.level}
                              name="level"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              lable="Status"
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
                                setLoading(true);
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
                                <Button
                                  onClick={() => {
                                    restServicesCaller("getMaster");
                                    setLoading(true);
                                  }}
                                  variant="contained"
                                  fullWidth
                                  color="primary"
                                >
                                  See Master
                                </Button>
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
                                reportLable="Master Excel"
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
                              lable="Level"
                              optionList={["L1", "L2", "L3"]}
                              selectHandleChange={(e) =>
                                setLabelValue(e.target.value)
                              }
                              value={labelValue}
                              name="level"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button
                              onClick={FetchCredentials}
                              variant="contained"
                              color="primary"
                              fullWidth
                            >
                              Fetch Credentials
                            </Button>
                          </Grid>
                        </Grid>
                        {adminLoginData.length > 0 && (
                          <DataGridForAdmin
                            col={AdminLoginHeading}
                            rows={AdminData}
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
