import React, { useState } from "react";
import loadable from "./loadable";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import SingleImgCreator from "./SingleImgCreator";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import * as Icon from "react-bootstrap-icons";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AlertPopup, { ModelPopup } from "./AlertPopup";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import UrlManager from "../HostManager/UrlManager";
import { useStyles } from "../Style/LazyLoadingDataGrid";
import "../Style/CssStyle/LazyLoadingDataGrid.css";
import Box from "@mui/material/Box";

const DataGrid = loadable(() =>
  import("@material-ui/data-grid").then((module) => {
    return { default: module.DataGrid };
  })
);

function CustomToolbar(props) {
  const classes = useStyles();
  const successCountArray = props?.rows.filter(
    (row) => row.confirmationStatus !== ""
  );
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });
  const { storeCode } = useParams();
  function closeHandler() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });
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
    });
  }
  const handelClick = () => {
    props.handelOpen();
  };
  const errorHandling = async () => {
    try {
      const response = await axios.get(`${UrlManager.mailError}${storeCode}`);
      if (response.status === 200) {
        setAlertPopupStatus({
          status: true,
          main: response?.data?.value,
          contain: "",
          mode: true,
        });
      }
    } catch (e) {
      alert(`${e.message} from error handling mail`);
    }
  };

  const handelSendMail = async () => {
    try {
      const response = await axios.get(`${UrlManager.sendMail}${storeCode}`);
      if (response.status === 200) {
        console.log("responseMail==>", response);
        if (response.data.code === "1000") {
          const success = `Thankyou for completing the Indent Confirmation Process successfully`;
          const error = `There was an error in Triggering email please try again ..`;
          const msg =
            response?.data?.value?.storeNPIMStatus === "LOCKED"
              ? `${response?.data?.value?.storeNPIMStatus} and mail already sent`
              : response?.data?.mailStatus === "sent successfully"
              ? success
              : error;
          setAlertPopupStatus({
            status: true,
            main: msg,
            contain: "",
            mode: true,
          });
        } else {
          errorHandling();
        }
      }
    } catch (e) {
      alert(`${e.message} from send mail btn`);
    }
  };
  return (
    <>
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: `Npim-${new Date()}` }} />
        <Grid item container className="mx-3">
          <input
            type="text"
            placeholder="Search ItemCode"
            className={classes.search}
            value={props.searchValue}
            onChange={props.handelSearch}
          />
        </Grid>
        {props.reportLabel === "Item_Wise_Report" && (
          <>
            <Grid item container>
              <h6>
                Total:
                <span>
                  <b>{props?.rows.length}</b>
                </span>
              </h6>
              <h6 className="ml-5">
                Successful Indent Count:
                <span>
                  <b>{successCountArray.length}</b>
                </span>
              </h6>
            </Grid>
            <Grid item container justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                className="m-1"
                onClick={handelClick}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="m-1"
                onClick={handelSendMail}
              >
                Send Mail
              </Button>
            </Grid>
          </>
        )}
        <AlertPopup
          status={alertPopupStatus.status}
          mainLable={alertPopupStatus.main}
          containLable={alertPopupStatus.contain}
          procideHandler=""
          discardHandler=""
          closeHandler={() => {
            alertPopupStatus.mode ? closeHandlerForRest() : closeHandler();
          }}
        />
        <ModelPopup
          open={props.popupOpen}
          handelClose={props.handelClose}
          option1="NO"
          option2="YES"
          message=" Are you sure you want to conclude the indenting process. Click Yes to Confirm"
          onyes={props.handelYes}
        />
      </GridToolbarContainer>
    </>
  );
}
const LazyLoadindDataGrid = (props) => {
  const {
    col,
    rows,
    reportLabel,
    isConfirmed,
    rowDataHandler,
    popupOpen,
    handelYes,
    handelClose,
    handelOpen,
    DeleteRowData,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const column = col.map((element) => {
    let fieldRes;
    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Edit/Delete",
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <>
              {params?.row?.confirmationStatus === "" ? (
                <div className="mx-3">
                  <Icon.PencilSquare
                    onClick={() => {
                      rowDataHandler(params.row);
                    }}
                    size={16}
                    className="EditButton"
                  />
                  <DeleteRoundedIcon
                    size={16}
                    className="DeleteButton"
                    onClick={() => {
                      DeleteRowData(params.row);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {reportLabel === "Cancel_Item_List" ? (
                <div className="mx-3">
                  <Icon.PencilSquare
                    onClick={() => {
                      rowDataHandler(params.row);
                    }}
                    size={16}
                    className="EditButton"
                  />
                </div>
              ) : (
                ""
              )}
            </>
          );
        },
      };
    } else if (element === "Image") {
      fieldRes = {
        field: "Image",
        headerName: "Image",
        sortable: false,
        renderCell: (params) => {
          return (
            <SingleImgCreator
              itemCode={
                params.row.itemCode ? params.row.itemCode : "not item code"
              }
              link="https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName="
            />
          );
        },
      };
    } else if (element === "confirmationStatus") {
      fieldRes = {
        field: "confirmationStatus",
        headerName: "confirmationStatus",
        sortable: false,
        flex: 1,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <>
              {params?.row?.confirmationStatus === "" ? (
                ""
              ) : (
                <p className="text-success">Success</p>
              )}
            </>
          );
        },
      };
    } else {
      fieldRes = {
        field: element,
        sortable: false,
        flex: 1,
      };
    }
    return fieldRes;
  });
  const handelSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const DataRows =
    reportLabel === "Item_Wise_Report" ||
    "NeedState" ||
    "Collection" ||
    "ItGroup" ||
    "Category" ||
    "Cancel_Item_List"
      ? rows?.filter((eachRow) =>
          eachRow?.itemCode?.includes(searchValue.toUpperCase())
        )
      : rows;

  return (
    <>
      <Container maxWidth="xl">
        <Typography align="center" variant="h6" color="secondary">
          {reportLabel.toUpperCase()}
        </Typography>
        <Box className="w-100">
          <DataGrid
            rows={DataRows}
            columns={column}
            autoHeight={true}
            rowsPerPageOptions={[50]}
            pagination
            pageSize={50}
            components={{
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: {
                handelSearch: handelSearch,
                isConfirmed: isConfirmed,
                reportLabel: reportLabel,
                rows: rows,
                popupOpen: popupOpen,
                handelYes: handelYes,
                handelClose: handelClose,
                handelOpen: handelOpen,
              },
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default LazyLoadindDataGrid;
