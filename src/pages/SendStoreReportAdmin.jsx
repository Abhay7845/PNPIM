import { useEffect } from "react";
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
import React, { useState } from "react";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import UpperHeader from "../Components/UpperHeader";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import {
  MultiSelectFroAdmin,
  TextFieldOfMUI,
} from "../Components/ComponentFroAdmin";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import HostManager from "../HostManager/HostManager";
import SideAppBar from "../Components/SideAppBar";

const useStyle = makeStyles({
  root: {
    margin: "0%",
    padding: "0%",
  },
});

function SendStoreReportAdmin(props) {
  const classes = useStyle();
  const { storeCode, rsoName } = useParams();
  const [barOpener, setBarOpener] = useState(false);
  const [sendReportInput, setSendReportInput] = useState({
    from: "",
    // fromMailIdTest: "",
    subject: "",
    mailBody: "",
    fromDate: "",
    storeCode: "",
    to: "",
    cc: "",
  });

  const [alertState, setAlertState] = useState({
    alertFlag1: false,
    alertFlag2: false,
    alertFlag3: false,
    alertSeverity: "",
    alertMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [storeList, setStoreList] = useState([]);
  useEffect(() => {
    if (sendReportInput.fromDate) {
      restServicesCaller("storeList");
    }
  });

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
    setImmediate(() => {
      setSendReportInput((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    });
  }

  function restServicesCaller(triggerFrom) {
    setImmediate(() => {
      setLoading(true);
    });
    if (triggerFrom === "update") {
      let requestData = {
        fromMailId: sendReportInput.from,
        mailSubject: sendReportInput.subject,
        mailBody: sendReportInput.mailBody,
      };

      setTimeout(() => {
        axios
          .post(
            `${HostManager.mailHostAdmin}/npim/insert/auto/mailer/content`,
            requestData
          )
          .then((responce) => {
            console.log(responce.data);
            if (responce.data.code === 1000) {
              setImmediate(() => {
                setAlertState({
                  alertFlag1: true,
                  alertFlag2: false,
                  alertFlag3: false,
                  alertSeverity: "success",
                  alertMessage: responce.data.value,
                });
              });
            } else {
              setImmediate(() => {
                setAlertState({
                  alertFlag1: true,
                  alertFlag2: false,
                  alertFlag3: false,
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
    } else if (triggerFrom === "report") {
      if (sendReportInput.storeCode[0]) {
        setTimeout(() => {
          axios
            .post(
              `${HostManager.mailHostAdmin}/npim/send/mail`,
              sendReportInput.storeCode
            )
            .then((responce) => {
              console.log(responce.data);
              if (responce.data.code === 1000) {
                let notSent = responce.data.notSent[0]
                  ? `But fro this stores not send mail plz check mail content and mail Ids ${responce.data.notSent}`
                  : "";

                setImmediate(() => {
                  setAlertState({
                    alertFlag1: false,
                    alertFlag2: true,
                    alertFlag3: false,
                    alertSeverity: "success",
                    alertMessage: `${responce.data.value}  ${notSent}`,
                  });
                });
              } else {
                setImmediate(() => {
                  setAlertState({
                    lertFlag1: false,
                    alertFlag2: true,
                    alertFlag3: false,
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
            lertFlag1: false,
            alertFlag2: true,
            alertFlag3: false,
            alertSeverity: "error",
            alertMessage: "Invalid Input Data ...!",
          });
        });
      }
    } else if (triggerFrom === "test") {
      if (sendReportInput.to && sendReportInput.cc) {
        setTimeout(() => {
          axios
            .post(`${HostManager.mailHostAdmin}/npim/test/send/mail`, {
              to: sendReportInput.to,
              cc: sendReportInput.cc,
            })
            .then((responce) => {
              console.log(responce.data);
              if (responce.data.code === "1000") {
                setImmediate(() => {
                  setAlertState({
                    alertFlag1: false,
                    alertFlag2: false,
                    alertFlag3: true,
                    alertSeverity: "success",
                    alertMessage: responce.data.value,
                  });
                });
              } else {
                setImmediate(() => {
                  setAlertState({
                    lertFlag1: false,
                    alertFlag2: false,
                    alertFlag3: true,
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
            lertFlag1: false,
            alertFlag2: false,
            alertFlag3: true,
            alertSeverity: "error",
            alertMessage: "Invalid Input Data ...!",
          });
        });
      }
    } else if (triggerFrom === "storeList") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/from/store/list/${sendReportInput.fromDate}`
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
                  alertFlag1: false,
                  alertFlag2: true,
                  alertFlag3: false,
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
    }
    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    }, 3000);
  }

  function ccCombiner(inputCc) {
    let resData = [];
    for (const key in inputCc) {
      if (key === "strCode" || key === "storeMailId") {
        continue;
      }
      if (inputCc[key]) {
        resData = [...resData, inputCc[key]];
      }
    }
    return resData;
  }

  function onChangeStoreCodeHandler(storeCodes) {
    let storeDataList = storeCodes.map((objData) => ({
      storeCode: objData.strCode,
      to: objData.storeMailId,
      cc: ccCombiner(objData),
    }));
    setImmediate(() => {
      setSendReportInput((old) => {
        return {
          ...old,
          storeCode: storeDataList,
        };
      });
    });
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
                        Update AutoMail
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
                              lable="From"
                              type="email"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.from}
                              name="from"
                              autoComplete="email"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              lable="Subject"
                              type="textarea"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.subject}
                              name="subject"
                              multiline={true}
                              rows={0}
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              lable="Mail Body"
                              type="textarea"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.mailBody}
                              name="mailBody"
                              multiline={true}
                              rows={3}
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button
                              onClick={() => {
                                restServicesCaller("update");
                                setLoading(true);
                              }}
                              color="inherit"
                              variant="contained"
                              fullWidth
                              style={{ minHeight: "100%" }}
                              endIcon={<SaveIcon />}
                            >
                              Save
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
                        Send Store Report
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                            <TextFieldOfMUI
                              lable="From Date"
                              type="date"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.fromDate}
                              name="fromDate"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <MultiSelectFroAdmin
                              optionsList={storeList}
                              labelName="Store Code"
                              onChangeHandler={onChangeStoreCodeHandler}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button
                              onClick={() => {
                                restServicesCaller("report");
                                setLoading(true);
                              }}
                              color="inherit"
                              variant="contained"
                              fullWidth
                              style={{ minHeight: "100%" }}
                              endIcon={<SendIcon />}
                            >
                              Send
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
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Send Test Mail
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
                            <TextFieldOfMUI
                              lable="To"
                              type="text"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.to}
                              name="to"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              lable="CC"
                              type="textarea"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.cc}
                              name="cc"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button
                              onClick={() => {
                                restServicesCaller("test");
                                setLoading(true);
                              }}
                              color="inherit"
                              variant="contained"
                              fullWidth
                              style={{ minHeight: "100%" }}
                              endIcon={<SendIcon />}
                            >
                              Send Test Mail{" "}
                            </Button>
                          </Grid>
                        </Grid>
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

export default SendStoreReportAdmin;
