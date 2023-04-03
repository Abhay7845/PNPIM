import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/FeedbackL1AndL2.css";
import UpperHeader from "../component/UpperHeader";
import LowerHeader from "../component/LowerHeader";
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
import AlertPopup from "../component/AlertPopup";
import ImgShow from "../component/ImgShow";
import MuliSelectDropdownField, {
  MuliSelectDropdownFieldQualityFeedback,
} from "../component/MuliSelectDropdownField";
import { useStyles } from "../Style/FeedBackL1AndL2";

const FeedbacL1AndL2 = () => {
  const classes = useStyles();
  const { storeCode, rsoName } = useParams();
  const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
  const [multiSelectDrop, setMultiSelectDrop] = useState([]);
  const [multiSelectQltyfeed, setMultiSelectQualityFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [switchData, setSwitchData] = useState(true);
  const [resetDrop, SetResetDrop] = useState(true);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });
  const warningPopupState = false;
  const [value, setValue] = useState(0);
  const [productDetails, setProductDetails] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
    itemCode: "",
  });
  const [statusData, setStatusData] = useState({});
  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/feedbackL1andL2/${storeCode}/${rsoName}`,
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
    console.log(switchData);
  };
  useEffect(() => {
    setLoading(true);
    if (productDetails.itemCode !== "") {
      axios
        .post(
          `${HostManager.mainHost}/npim/get/product/details`,
          productDetails
        )
        .then((response) => {
          let mailSms = "";
          if (response.data.code === "1001") {
            document.getElementById("result").style.visibility = "hidden";
            mailSms = "ItemCode not in Master";
            setImmediate(() => {
              setAlertPopupStatus({
                status: true,
                main: mailSms,
                contain: "",
                mode: true,
              });
            });
          } else if (response.data.code === "1003") {
            document.getElementById("result").style.visibility = "hidden";
            setAlertPopupStatus({
              status: true,
              main: response.data.value,
              contain: "",
              mode: true,
            });
          } else {
            setFeedShowState(response.data.value);
            if (productDetails.itemCode === "") {
              document.getElementById("result").style.visibility = "hidden";
            }
            if (productDetails.itemCode !== "") {
              document.getElementById("result").style.visibility = "visible";
            }
          }
        })
        .catch((error) => {
          console.log("error==>", error);
        });
    }
    axios.get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`).then(
      (response) => {
        console.log(response);
        if (response.data.code === "1001") {
          console.log("Data Not Available");
        } else {
          setStatusData(response.data);
        }
      },
      (error) => {
        console.log("error==>", error);
      }
    );

    setLoading(false);
  }, [productDetails]);
  const onSearchClick = (dropState) => {
    console.log(dropState.itemCode + "232");
    var doc = dropState.itemCode;
    document.getElementById("result").style.visibility = "visible";
    setProductDetails({
      storeCode: storeCode,
      collection: "ALL",
      consumerBase: "ALL",
      group: "ALL",
      category: "ALL",
      itemCode: doc,
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
      alert("Please Select Reason for NO!");
      return;
    }
    if (value === 0) {
      alert("Please Select Quality Rating");
      return;
    }
    if (
      value > 0 &&
      value <= 4 &&
      multiSelectQltyfeed.toString().length === 0
    ) {
      alert("Please select Reason For Low Quality Rating");
      return;
    }

    setFeedShowState((old) => {
      if (!switchData) {
        old.reasons = multiSelectDrop.toString();
        old.saleable = "NO";
        old.rsoName = rsoName;
      } else {
        old.reasons = "";
        old.saleable = "YES";
        old.rsoName = rsoName;
      }
      old.collection = productDetails.collection;
      old.consumerBase = productDetails.consumerBase;
      old.itGroup = productDetails.group;
      old.submitStatus = "feedback";
      old.category = productDetails.category;
      old.quality_Reasons = multiSelectQltyfeed.toString();
      old.quality_Rating = value.toString();
      return old;
    });
    axios
      .post(`${HostManager.mainHost}/npim/insert/responses`, feedShowState)
      .then((response) => {
        let mailSms = "";
        if (response.data.code === "1001") {
          setMultiSelectDrop([]);
          setMultiSelectQualityFeedback([]);
          setValue(0);
          document.getElementById("result").style.visibility = "hidden";
          if (
            productDetails.collection === "ALL" ||
            productDetails.consumerBase === "ALL" ||
            productDetails.group === "ALL" ||
            productDetails.category === "ALL"
          ) {
            mailSms = "You have successfully completed the Indented. Thankyou.";
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
          if (
            response.status === 200 &&
            response.data.code !== "1001" &&
            response.data.code !== "1003"
          ) {
            document.getElementById("result").style.visibility = "hidden";
            setImmediate(() => {
              setAlertPopupStatus({
                status: true,
                main: "Data has been saved Successfully",
                contain: "",
                mode: true,
              });
            });
          }
          setMultiSelectDrop([]);
          setMultiSelectQualityFeedback([]);
          setValue(0);
          setFeedShowState(response.data.value);
        }
      })
      .catch((error) => {
        console.log(error);
        setMultiSelectDrop([]);
        setMultiSelectQualityFeedback([]);
        setValue(0);
        alert(error, "3");
      });
    setSwitchData(true);
    setImmediate(() => {
      setLoading(false);
    });
  };
  const onMultiSelect = (multiSelectData) => {
    setMultiSelectDrop(multiSelectData);
  };
  const onMultiSelectQtyFeedback = (multiSelectQlty) => {
    setMultiSelectQualityFeedback(multiSelectQlty);
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
            storeCode={storeCode}
          />
          <Loading flag={loading} />
          {resetDrop ? (
            <LowerHeader
              onBar={onBarClick}
              onSear={onSearchClick}
              navBarList={navBarList}
              statusData={statusData}
              L3={false}
            />
          ) : (
            "LOding...!"
          )}
        </Grid>
        <Grid item xs={12}>
          <div
            className="container-fluid"
            id="result"
            style={{ marginTop: "1%", visibility: "hidden" }}
          >
            <div className="row">
              <div className="col-md-5">
                <div className="img_info_show">
                  {feedShowState.itemCode !== "" ? (
                    <ImgShow
                      className="img_show"
                      itemCode={feedShowState.itemCode}
                      imgLink="https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName="
                      videoLink={feedShowState.videoLink || ""}
                    />
                  ) : (
                    "Loading Images"
                  )}
                </div>
              </div>
              <div className="col-md-7">
                <Typography className={classes.headingColor} align="center">
                  {feedShowState.itemCode}
                </Typography>

                <div className="row mx-0">
                  <div className=" col-md-7">
                    <div>
                      <h5 className="text-center my-1">
                        <b>Product Details</b>
                      </h5>
                      <table>
                        <tbody>
                          <tr>
                            <th>COLLECTION</th>
                            <td>
                              -
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                            <td>{feedShowState.collection}</td>
                          </tr>
                          <tr>
                            <th>NEED STATE</th>
                            <td>-</td>
                            <td>{feedShowState.consumerBase}</td>
                          </tr>
                          <tr>
                            <th>GROUP</th>
                            <td>-</td>
                            <td>{feedShowState.itGroup}</td>
                          </tr>
                          <tr>
                            <th>CATEGORY</th>
                            <td>-</td>
                            <td>{feedShowState.category}</td>
                          </tr>
                          <tr>
                            <th>GENDER</th>
                            <td>-</td>
                            <td>{feedShowState.gender}</td>
                          </tr>
                          <tr>
                            <th>COMPLEXITY</th>
                            <td>-</td>
                            <td>{feedShowState.complexity}</td>
                          </tr>
                          <tr>
                            <th>STD WT</th>
                            <td>-</td>
                            <td>{feedShowState.stdWt}</td>
                          </tr>
                          <tr>
                            <th>STD UCP</th>
                            <td>-</td>
                            <td>{feedShowState.stdUCP}</td>
                          </tr>
                          <tr>
                            <th>METAL COLOR</th>
                            <td>-</td>
                            <td>{feedShowState.metalColor}</td>
                          </tr>
                          <tr>
                            <th>FINDING</th>
                            <td>-</td>
                            <td>{feedShowState.findings}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center col-md-4">
                    <div className="text-lg-center">
                      <h5 className="text-center my-1">
                        <b>Feedback</b>
                      </h5>
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
                      {value > 0 && value <= 4 && (
                        <div className="mutli_select_drop">
                          <MuliSelectDropdownFieldQualityFeedback
                            onMultiSelectQlty={onMultiSelectQtyFeedback}
                            value={multiSelectQltyfeed}
                          />
                        </div>
                      )}
                      <div>
                        <h6 className="text-center my-1">
                          <b>Quality Feedback</b>
                        </h6>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                        />
                        <br />
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
                <div className="mx-4">
                  <Button
                    className={classes.btnSub}
                    onClick={onClickSubmitBtnHandler}
                    variant="contained"
                    fullWidth
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default FeedbacL1AndL2;
