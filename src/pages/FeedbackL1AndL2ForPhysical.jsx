import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/FeedbackL1AndL2.css";
import UpperHeader from "../component/UpperHeader";
import LowerHeader from "../component/LowerHeader";
import MuliSelectDropdownField from "../component/MuliSelectDropdownField";
import axios from "axios";
import NpimDataDisplay from "../component/NpimDataDisplay";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Button,
  Container,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import { useParams } from "react-router";
import HostManager from "../HostManager/HostManager";
import Loading from "../component/Loading";
import StaticTabularInformation from "../component/StaticTabularInformation";
import WarningPopup from "../component/WarningPopup";
import ImgShow from "../component/ImgShow";
import AlertPopup from "../component/AlertPopup";
import { useStyles } from "../Style/FeedbackL1AndL2ForPhysical";

const FeedbacL1AndL2ForPhysical = () => {
  const classes = useStyles();
  const { storeCode, rsoName } = useParams();
  const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
  const [multiSelectDrop, setMultiSelectDrop] = useState([]);
  const [loading, setLoading] = useState(false);
  const [switchData, setSwitchData] = useState(true);
  const [resetDrop, SetResetDrop] = useState(true);
  const [statusData, setStatusData] = useState({});
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });
  const [productDetails, setProductDetails] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
  });
  const warningPopupState = false;
  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/FeedbacL1AndL2ForPhysical/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 3,
      name: "Report",
      link: `/reportL1andL2/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];

  const handleChange = (event) => {
    setSwitchData(!switchData);
  };

  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });

    setTimeout(() => {
      axios
        .post(
          `${HostManager.mainHost}/npim/get/product/details`,
          productDetails
        )
        .then((response) => {
          let mailSms = "";
          if (response.data.code === "1001") {
            if (
              productDetails.collection === "ALL" ||
              productDetails.consumerBase === "ALL" ||
              productDetails.group === "ALL" ||
              productDetails.category === "ALL"
            ) {
              mailSms =
                "You have successfully completed the Indented. Thankyou.";
            } else if (
              productDetails.collection !== "ALL" ||
              productDetails.consumerBase !== "ALL" ||
              productDetails.group !== "ALL" ||
              productDetails.category !== "ALL"
            ) {
              mailSms = "No more data available for the selected category.";
            } else {
              mailSms = response.data.value;
            }

            setImmediate(() => {
              setAlertPopupStatus({
                status: true,
                main: mailSms,
                contain: "",
                mode: true,
              });
            });
          } else {
            setFeedShowState(response.data.value);
          }
        })
        .catch((error) => {
          console.log("error==>", error);
        });

      axios.get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`).then(
        (response) => {
          if (response.data.code === "1001") {
          } else {
            setStatusData(response.data);
          }
        },
        (error) => {
          console.log("error==>", error);
        }
      );
      setImmediate(() => {
        setLoading(false);
      });
    }, 1000);
  }, [productDetails]);

  const onSearchClick = (dropState) => {
    setProductDetails({
      storeCode: storeCode,
      collection: dropState.collection,
      consumerBase: dropState.consumerBase,
      group: dropState.groupdata,
      category: dropState.category,
    });
  };

  const onBarClick = () => {};
  function closeHandler() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });
    });
    setImmediate(() => {
      setLoading(false);
    });
  }

  function closeHandlerForRest() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });

      SetResetDrop(!resetDrop);
      setProductDetails({
        storeCode: storeCode,
        collection: "ALL",
        consumerBase: "ALL",
        group: "ALL",
        category: "ALL",
      });
    });

    setImmediate(() => {
      setLoading(false);
      SetResetDrop(true);
    });
  }

  const onClickSubmitBtnHandler = (event) => {
    setImmediate(() => {
      setLoading(true);
    });

    if (!switchData && multiSelectDrop.toString().length === 0) {
      alert("Please select reason for NO");
      return;
    }

    setFeedShowState((old) => {
      if (!switchData) {
        old.reasons = multiSelectDrop.toString();
        old.saleable = "NO";
        old.rsoName = storeCode;
      } else {
        old.reasons = "";
        old.saleable = "YES";
        old.rsoName = storeCode;
      }
      old.collection = productDetails.collection;
      old.consumerBase = productDetails.consumerBase;
      old.itGroup = productDetails.group;
      old.submitStatus = "feedback";
      old.category = productDetails.category;
      return old;
    });

    setTimeout(() => {
      axios
        .post(`${HostManager.mainHost}/npim/insert/responses`, feedShowState)
        .then((response) => {
          console.log(response.data);
          let mailSms = "";
          if (response.data.code === "1001") {
            if (
              productDetails.collection === "ALL" ||
              productDetails.consumerBase === "ALL" ||
              productDetails.group === "ALL" ||
              productDetails.category === "ALL"
            ) {
              mailSms =
                "You have successfully completed the Indented. Thankyou.";
            } else if (
              productDetails.collection !== "ALL" ||
              productDetails.consumerBase !== "ALL" ||
              productDetails.group !== "ALL" ||
              productDetails.category !== "ALL"
            ) {
              mailSms = "No more data available for the selected category.";
            } else {
              mailSms = response.data.value;
            }

            setImmediate(() => {
              setAlertPopupStatus({
                status: true,
                main: mailSms,
                contain: "",
                mode: true,
              });
            });
          } else {
            setFeedShowState(response.data.value);
          }
        })
        .catch((error) => {
          console.log("error==>", error);
        });
      setMultiSelectDrop([]);
      setSwitchData(true);
      setImmediate(() => {
        setLoading(false);
      });
    }, 1500);
  };

  const onMultiSelect = (multiSelectData) => {
    setMultiSelectDrop(multiSelectData);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <WarningPopup
        flag={warningPopupState}
        headerSms="No more data available for the selected category"
        subSms="Please click on Agree...!"
        reportLink={`/reportL1andL2/${storeCode}/${rsoName}`}
      />

      <AlertPopup
        status={alertPopupStatus.status}
        // status={true}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={() => {
          alertPopupStatus.mode ? closeHandlerForRest() : closeHandler();
        }}
      />

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <UpperHeader
            itemCode={feedShowState.itemCode}
            storeCode={feedShowState.strCode}
          />
          <Loading flag={loading} />
          {resetDrop ? (
            <LowerHeader
              onBar={onBarClick}
              onSear={onSearchClick}
              navBarList={navBarList}
              statusData={statusData}
              phyNpim={true}
            />
          ) : (
            "Loading...!"
          )}
        </Grid>
        <Grid item xs={12}>
          <div className="container-fluid   " style={{ marginTop: "1%" }}>
            <div className="row">
              <div className="col-md-5 border">
                <div className="img_info_show ">
                  {feedShowState.itemCode !== "" ? (
                    <ImgShow
                      className="img_show"
                      itemCode={feedShowState.itemCode}
                      imgLink="https://tanishqdigitalnpim.titan.in/NpimImages/"
                      videoLink={feedShowState.videoLink}
                    />
                  ) : (
                    "Loading Images... "
                  )}
                </div>
              </div>
              <div
                className="col-md-7 border"
                style={{ margin: "0%", padding: "0%" }}
              >
                <Typography className={classes.headingColor} align="center">
                  {feedShowState.itemCode}
                </Typography>

                <div className="row">
                  <div
                    className="col-md-6 border"
                    style={{ margin: "0%", padding: "0%" }}
                  >
                    <div className="pro_info ">
                      <h5 className="text-center my-1">
                        <b>PRODUCT DETAILS</b>
                      </h5>
                      <table
                        style={{
                          width: "100%",
                          fontWeight: 900,
                          letterSpacing: "2px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <th className={classes.hadding}>Collection</th>
                            <td>
                              -
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                            <td className={classes.rowData}>
                              {feedShowState.collection}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Consumer Base</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.consumerBase}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Group</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.itGroup}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Category</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.category}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Gender</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.gender}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Complexity</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.complexity}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Std Wt</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.stdWt}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Std UCp</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.stdUCP}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Metal Colour</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.colourWt}
                            </td>
                          </tr>
                          <tr>
                            <th className={classes.hadding}>Findings</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                              {feedShowState.findings}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feed_info">
                      <h5 className="text-center my-1">
                        <b>FEEDBACK</b>
                      </h5>
                      <div className="text-lg-center">
                        <FormGroup row className={classes.feedbackSwitch}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={switchData}
                                onChange={handleChange}
                                name="feedbackSwitch"
                                color="primary"
                              />
                            }
                            label={
                              switchData ? (
                                <Typography color="primary">YES</Typography>
                              ) : (
                                <Typography color="secondary">NO</Typography>
                              )
                            }
                          />
                        </FormGroup>
                        <br />
                        {!switchData ? (
                          <div className="mutli_select_drop">
                            <MuliSelectDropdownField
                              onMultiSelect={onMultiSelect}
                              value={multiSelectDrop}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {feedShowState.si2Gh ? (
                  <div className="row-cols-1 staticTabularInfo">
                    <Container m={0} p={0}>
                      <StaticTabularInformation
                        si2Gh={feedShowState.si2Gh}
                        vsGh={feedShowState.vsGh}
                        vvs1={feedShowState.vvs1}
                        i2Gh={feedShowState.i2Gh}
                        si2Ij={feedShowState.si2Ij}
                      />
                    </Container>
                  </div>
                ) : (
                  ""
                )}
                <div className="row-cols-1 btn_feed_show">
                  <Container className={classes.btnGroupContainer}>
                    <Grid container alignItems="center" justify="center">
                      <Button
                        className={classes.btnSub}
                        onClick={onClickSubmitBtnHandler}
                        variant="contained"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default FeedbacL1AndL2ForPhysical;
