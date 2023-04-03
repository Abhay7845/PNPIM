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
import DropdownField from "../component/DropdownField";
import TableComponent from "../component/TableComponent";
import MenuIcon from "@material-ui/icons/Menu";
import UpperHeader from "../component/UpperHeader";
import SideAppBar from "../component/SideAppBar";
import { useParams } from "react-router-dom";
import ProductInfo from "../component/ProductInfo";
import NpimDataDisplay from "../component/NpimDataDisplay";
import HostManager from "../HostManager/HostManager";
import StatusTabular from "../component/StatusTabular";
import Loading from "../component/Loading";
import gifLoading from "../images/Loading_icon.gif";

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
  const selectReportList = ["yet to submit", "submitted"];
  const [selectReport, setSelectReport] = useState("yet to submit");
  const [showInfo, setShowInfo] = useState(false);
  const [switchEnable, setSwitchEnable] = useState(true);
  const [statusData, setStatusData] = useState({});
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);

  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });

    setTimeout(() => {
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
            console.log(data, "report l1 and L2");
          } else {
            console.log("response.data.value==>", response.data.value);
          }
        },
        (error) => {
          console.log("error==>", error);
        }
      );

      axios.get(`${HostManager.mainHost}/npim/status/L1/${storeCode}`).then(
        (response) => {
          if (response.data.code === "1001") {
            console.log("Data Not Found");
          } else {
            setStatusData(response.data);
          }
        },
        (error) => {
          console.log("error==>", error);
        }
      );
      setShowInfo(false);
      setImmediate(() => {
        setLoading(false);
      });
    }, 1500);
  }, [selectReport, editState, storeCode]);

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
    scrollTop();
    setProductInfo(data);
    setShowInfo(true);
    setSwitchEnable(false);
  };

  const statusOpener = (event) => {
    setStatusCloserOpener(!statusCloserOpener);
  };

  const getResponceFormChild = (input) => {
    setImmediate(() => {
      setLoading(true);
    });

    if (!input.switchData && input.multiSelectDrop.toString().length === 0) {
      alert("Please select Reason for NO");
      return;
    }
    if (input.qualityRating === 0) {
      alert("Please select Quality Rating  !");
      return;
    }
    if (
      input.qualityRating > 0 &&
      input.qualityRating <= 4 &&
      input.multiSelectQltyfeed.toString().length === 0
    ) {
      alert("Please Select Reason for Low Quality Rating");
      return;
    }

    setProductInfo((old) => {
      if (!input.switchData) {
        old.reasons = input.multiSelectDrop.toString();

        old.saleable = "NO";
        old.rsoName = rsoName;
      } else {
        old.reasons = "";
        old.saleable = "YES";
        old.rsoName = rsoName;
      }
      old.submitStatus = "report";
      old.strCode = storeCode;
      old.reasons = input.multiSelectQltyfeed.toString();
      old.quality_Reasons = input.multiSelectQltyfeed.toString();
      old.quality_Rating = input.qualityRating.toString();
      return old;
    });

    setTimeout(() => {
      axios
        .post(`${HostManager.mainHost}/npim/insert/responses`, productInfo)
        .then((response) => {
          console.log("response==>", response.data);
          setSelectReport(selectReport);
          setShowInfo(false);
        })
        .catch((error) => {
          console.log("error==>", error);
        });
      setImmediate(() => {
        setLoading(false);
      });

      setImmediate(() => {
        setSelectReport(selectReport);
      });

      setImmediate(() => {
        setEditState(!editState);
      });
    }, 1500);
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
              getResponceFormChild={getResponceFormChild}
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
              <img src={gifLoading} alt="loading" />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default ReportL1AndL2;
