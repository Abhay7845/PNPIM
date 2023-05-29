import {
  Grid,
  makeStyles,
  Toolbar,
  IconButton,
  AppBar,
  Drawer,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DropdownField from "../Components/DropdownField";
import TableComponent from "../Components/TableComponent";
import MenuIcon from "@material-ui/icons/Menu";
import UpperHeader from "../Components/UpperHeader";
import SideAppBar from "../Components/SideAppBar";
import { useParams } from "react-router-dom";
import ProductInfo from "../Components/ProductInfo";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import HostManager from "../HostManager/HostManager";
import StatusTabular from "../Components/StatusTabular";
import Loading from "../Components/Loading";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  reportDrop: {
    width: "50%",
    marginTop: "1%",
  },
  appBar: {
    flexGrow: 1,
    border: "2px solid red",
  },
  menuButton: {
    marginRight: 2,
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },

  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
});

const ReportL1AndL2 = (props) => {
  const classes = useStyles();
  const { storeCode, rsoName } = useParams();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);
  const [column, setColumn] = useState([]);
  const [barOpener, setBarOpener] = useState(false);
  const [editState, setEditState] = useState(false);
  const [productInfo, setProductInfo] = useState(NpimDataDisplay);
  const [selectReport, setSelectReport] = useState("submitted");
  const [showInfo, setShowInfo] = useState(false);
  const [switchEnable, setSwitchEnable] = useState(true);
  const [statusData, setStatusData] = useState({});
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const selectReportList = ["yet to submit", "submitted"];

  console.log("report==>", report);
  useEffect(() => {
    setLoading(true);
    let reportUrl = "/npim/unscanned/report/L1/";
    switch (selectReport) {
      case "yet to submit":
        reportUrl = "/npim/unscanned/report/L1/";
        break;
      case "submitted":
        reportUrl = "/npim/scanned/report/L1/";
        break;
      case "groupwise":
        reportUrl = "/npim/groupwise/report/L1/";
        break;
      case "consumerbase":
        reportUrl = "/npim/consumerbase/report/L1/";
        break;
      case "collection":
        reportUrl = "/npim/collection/report/L1/";
        break;
      case "category":
        reportUrl = "/npim/category/report/L1/";
        break;

      default:
        reportUrl = "/npim/unscanned/report/L1/";
        break;
    }

    axios.get(`${HostManager.mainHost}${reportUrl}${storeCode}`).then(
      (response) => {
        if (response.data.code === "1000") {
          let data = response.data;
          setReport(data.value);
          setColumn(data.coloum);
        } else {
          console.log("response.data.value==>", response.data.value);
        }
      },
      (error) => {
        console.log("error==>", error);
      }
    );
    setShowInfo(false);
    setLoading(false);
  }, [selectReport, editState, storeCode]);

  useEffect(() => {
    axios
      .get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`)
      .then((response) => {
        if (response.data.code === "1000") {
          setStatusData(response.data);
        } else if ((response.data.code = "1001")) {
          console.log("No Data Found");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, []);

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

  const onchangeHandler = (event) => {
    setSelectReport(event.target.value);
    setSwitchEnable(true);
  };

  const scrollTop = () => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  const myBarClickHandler = (event) => {
    setBarOpener(!barOpener);
  };

  const getProductData = (data) => {
    console.log("DATA==>", data);
    scrollTop();
    setProductInfo(data);
    setShowInfo(true);
    setSwitchEnable(false);
  };

  const statusOpener = (event) => {
    setStatusCloserOpener(!statusCloserOpener);
  };

  const getResponseFormChild = (input) => {
    console.log("input==>", input);
    setLoading(true);
    if (!input.switchData && input.multiSelectDrop.toString().length === 0) {
      alert("Please select Reason for NO");
      return;
    }
    if (input.qualityRating === 0) {
      alert("Please select Quality Rating");
      return;
    }
    if (
      input.qualityRating > 0 &&
      input.qualityRating <= 4 &&
      input.multiSelectQtyFeed.toString().length === 0
    ) {
      alert("Please Select Reason For Low Quality Rating");
      return;
    }

    // setProductInfo((old) => {
    //   if (!input.switchData) {
    //     old.reasons = input.multiSelectDrop.toString();
    //     old.saleable = "NO";
    //     old.rsoName = rsoName;
    //   } else {
    //     old.reasons = "";
    //     old.saleable = "YES";
    //     old.rsoName = rsoName;
    //   }
    //   old.submitStatus = "report";
    //   old.strCode = storeCode;
    //   old.reasons = input.multiSelectDrop.toString();
    //   old.quality_Reasons = input.multiSelectQtyFeed.toString();
    //   old.quality_Rating = input.qualityRating.toString();
    //   return old;
    // });

    const UpdateInput = {
      activity: productInfo.activity,
      adVariant: productInfo.adVariant,
      btqCount: productInfo.btqCount,
      catPB: productInfo.catPB,
      category: productInfo.category,
      childNodeF: productInfo.childNodeF,
      childNodeH: productInfo.childNodeH,
      childNodeK: productInfo.childNodeK,
      childNodeO: productInfo.childNodeO,
      childNodeV: productInfo.childNodeV,
      childNodesE: productInfo.childNodesE,
      childNodesN: productInfo.childNodesN,
      collection: productInfo.collection,
      colourWt: productInfo.colourWt,
      complexity: productInfo.complexity,
      consumerBase: productInfo.consumerBase,
      diamondWt: productInfo.diamondWt,
      doe: productInfo.doe,
      findings: productInfo.findings,
      gender: productInfo.gender,
      i2Gh: productInfo.i2Gh,
      id: productInfo.id,
      indCategory: productInfo.indCategory,
      indQty: productInfo.indQty,
      indentLevelType: productInfo.indentLevelType,
      itGroup: productInfo.itGroup,
      itemCode: productInfo.itemCode,
      itemLevelType: productInfo.itemLevelType,
      karatageRange: productInfo.karatageRange,
      metalColor: productInfo.metalColor,
      metalWt: productInfo.metalWt,
      npimEventNo: productInfo.npimEventNo,
      parentItemCode: productInfo.parentItemCode,
      quality_Rating: input.qualityRating,
      quality_Reasons: input.multiSelectQtyFeed.toString(),
      reasons: input.multiSelectDrop.toString(),
      region: productInfo.region,
      rsoName: rsoName,
      saleable: !switchEnable ? "YES" : "NO",
      scannedCount: "N/A",
      set2Type: productInfo.set2Type,
      shape: productInfo.shape,
      si2Gh: productInfo.si2Gh,
      si2Ij: productInfo.si2Ij,
      size: productInfo.size,
      stdUCP: productInfo.stdUCP,
      stdUcpE: productInfo.stdUCP,
      stdUcpF: productInfo.stdUcpF,
      stdUcpH: productInfo.stdUcpH,
      stdUcpK: productInfo.stdUcpK,
      stdUcpN: productInfo.stdUcpN,
      stdUcpO: productInfo.stdUcpO,
      stdUcpV: productInfo.stdUcpV,
      stdWt: productInfo.stdWt,
      stdWtE: productInfo.stdWtE,
      stdWtF: productInfo.stdWtF,
      stdWtH: productInfo.stdWtH,
      stdWtK: productInfo.stdWtK,
      stdWtN: productInfo.stdWtN,
      stdWtO: productInfo.stdWtO,
      stdWtV: productInfo.stdWtV,
      stoneQuality: productInfo.stoneQuality,
      stoneQualityVal: productInfo.stoneQualityVal,
      strCode: storeCode,
      submitStatus: productInfo.submitStatus,
      unscannedCount: productInfo.unscannedCount,
      uom: productInfo.uom,
      videoLink: productInfo.videoLink,
      vsGh: productInfo.vsGh,
      vvs1: productInfo.vvs1,
    };

    console.log("productInfo==>", UpdateInput);
    axios
      .post(`${HostManager.mainHostL3}/npim/update/responses`, UpdateInput)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          alert("Data Updated Successfully");
        }
      })
      .catch((error) => {
        console.log("error==>", error);
      });
    setImmediate(() => {
      setLoading(false);
      setSelectReport(selectReport);
      setEditState(!editState);
    });
  };

  return (
    <>
      <Drawer anchor="left" open={barOpener} onClose={myBarClickHandler}>
        <SideAppBar navBarList={navBarList} statusOpener={statusOpener} />
      </Drawer>
      <Drawer anchor="top" open={statusCloserOpener} onClose={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UpperHeader storeCode={storeCode} />
          <Loading flag={loading} />
          <AppBar position="static" color="inherit">
            <Toolbar>
              <IconButton
                onClick={myBarClickHandler}
                edge="start"
                color="inherit"
                aria-label="menu"
                className="mr-2"
              >
                <MenuIcon />
              </IconButton>
              <DropdownField
                name="Select Report Type"
                value={selectReport}
                labelName="Select Report Type"
                dropList={selectReportList}
                myChangeHandler={onchangeHandler}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showInfo}
                    onChange={() => setShowInfo(!showInfo)}
                    name="feedbackSwitch"
                    color="secondary"
                    disabled={switchEnable}
                  />
                }
                label="Product Description"
              />
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item xs={12} className={showInfo ? classes.show : classes.hidden}>
          {report.length > 0 && column.length > 0 ? (
            <ProductInfo
              productInfo={productInfo}
              getResponseFormChild={getResponseFormChild}
              showInfo={showInfo}
            />
          ) : (
            "NO DATA"
          )}
        </Grid>
        <Grid item xs={12}>
          {report.length > 0 && column.length > 0 ? (
            <TableComponent
              report={report}
              coloum={column}
              reportType={selectReport}
              getProductData={getProductData}
              reportName={selectReport}
            />
          ) : (
            <div className="text-center">
              {/* <img src={gifLoading} alt="loading" /> */}
              <p>No Data Available</p>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ReportL1AndL2;
