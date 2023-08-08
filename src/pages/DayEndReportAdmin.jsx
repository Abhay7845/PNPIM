/** @format */

import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Button,
  Drawer,
} from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  DataGridForAdmin,
  SelectOfMUI,
  TextFieldOfMUI,
} from "../Components/ComponentFroAdmin";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import SideAppBar from "../Components/SideAppBar";
import UpperHeader from "../Components/UpperHeader";
import UrlManager from "../HostManager/UrlManager";
import { Alert } from "@material-ui/lab";
import "../Style/CssStyle/DayEndReportAdmin.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const DayEndReportAdmin = () => {
  const { storeCode, rsoName } = useParams();
  const [endDayReport, setEndDayReport] = useState({
    col: [],
    rows: [],
  });
  const [endDayReportInput, setEndDayReportInput] = useState({
    level: "",
    parameter: "",
    fromDate: "",
    toDate: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [fieldAlert, setFieldAlert] = useState({
    flagData: false,
    message: "",
    severity: "",
  });
  const [barOpener, setBarOpener] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ParameterData, setParameterData] = useState();

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

  function endDayReportCall(inputData) {
    axios
      .get(`${UrlManager.endDayReportForAdmin}/${inputData}`)
      .then((response) => {
        setImmediate(() => {
          setLoading(false);
        });
        if (response.data.code === "1001") {
          setFieldAlert({
            flagData: true,
            message: "DATA NOT AVAILABLE",
            severity: "error",
          });
          setEndDayReport({
            col: [],
            rows: [],
          });
        } else {
          setImmediate(() => {
            setFieldAlert({
              flagData: true,
              message: "Data Fetched Successfully",
              severity: "success",
            });
            const cols_L1 = response.data.coloum;
            const rowss_L1 =
              response.data.value.length > 0 &&
              response.data.value.map((eachRow) => {
                return {
                  id: eachRow.id,
                  doe: eachRow.doe,
                  storeCode: eachRow.storeCode,
                  region: eachRow.region,
                  needState: eachRow.needState,
                  collection: eachRow.collection,
                  itemCode: eachRow.itemCode,
                  activity: eachRow.activity,
                  itgroup: eachRow.itgroup,
                  category: eachRow.category,
                  saleable: eachRow.saleable,
                  reasons: eachRow.reasons,
                  rsoName: eachRow.rsoName,
                  qualityRating: eachRow.qualityRating,
                  qualityReasons: eachRow.qualityReasons,
                };
              });
            const rows_L3 =
              response.data.value.length > 0 &&
              response.data.value.map((eachRow) => {
                return {
                  id: eachRow.id,
                  indentDate: eachRow.indentDate,
                  storeCode: eachRow.storeCode,
                  region: eachRow.region,
                  needState: !eachRow.needState ? "N/A" : eachRow.needState,
                  collection: eachRow.collection,
                  itemCode: eachRow.itemCode,
                  stdUcp: eachRow.stdUcp,
                  stdWt: eachRow.stdWt,
                  indQty: eachRow.indQty,
                  size: !eachRow.size ? "N/A" : eachRow.size,
                  uom: eachRow.uom,
                  stoneQuality: eachRow.stoneQuality,
                  stoneQualityVal: eachRow.stoneQualityVal,
                  totCost: eachRow.totCost,
                  totWeight: eachRow.totWeight,
                  revisedItemCode: eachRow.revisedItemCode,
                  indCategory: eachRow.indCategory,
                  activity: eachRow.activity,
                  itgroup: eachRow.itgroup,
                  category: eachRow.category,
                  saleable: eachRow.saleable,
                  reasons: eachRow.reasons,
                  rsoName: eachRow.rsoName,
                  qualityRating: eachRow.qualityRating,
                  qualityReasons: eachRow.qualityReasons,
                };
              });

            const new_cols =
              endDayReportInput.level === "L1/L2"
                ? cols_L1
                : response.data.coloum;
            const new_rows =
              endDayReportInput.level === "L1/L2" ? rowss_L1 : rows_L3;
            setEndDayReport({
              col: new_cols,
              rows: new_rows,
            });
          });
        }
      })
      .catch((error) => {
        console.log("error==>", error);
      });
  }

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setEndDayReportInput((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const validateFiled = () => {
    let { level, fromDate, toDate } = endDayReportInput;
    if (!level) {
      setFieldAlert({
        flagData: true,
        message: "Select Level",
        severity: "error",
      });
    } else if (!fromDate) {
      setFieldAlert({
        flagData: true,
        message: "Select From Date",
        severity: "error",
      });
    } else if (!toDate) {
      setFieldAlert({
        flagData: true,
        message: "Select To Date",
        severity: "error",
      });
    }
    if (level && fromDate && toDate) {
      endDayReportCall(`?fromDate=${fromDate}&level=${level}&toDate=${toDate}`);
      setImmediate(() => {
        setLoading(true);
      });
    }
  };

  //API CALLING
  const getParameterData = (parameter) => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIM/npim/scanned/report/L1/hit/rates/${parameter}`
      )
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setParameterData(result.data.value);
        }
        if (result.data.code === "1001") {
          setFieldAlert({
            flagData: true,
            message: "DATA NOT AVAILABLE",
            severity: "error",
          });
        }
        setImmediate(() => {
          setLoading(false);
        });
      })
      .catch((error) => console.log("error==>", error));
  };

  const validateParameter = () => {
    setImmediate(() => {
      setLoading(true);
    });
    let { parameter } = endDayReportInput;
    if (!parameter) {
      setFieldAlert({
        flagData: true,
        message: "Select Parameter",
        severity: "error",
      });
    }
    if (parameter) {
      getParameterData(parameter);
    }
    setImmediate(() => {
      setLoading(true);
    });
  };

  const levelDropDown = ["L1/L2", "L3", "HitRate Report"];
  const parameterOption = ["ItemCode", "Region"];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log("endDayReport==>", endDayReport);
  return (
    <>
      <CssBaseline />
      <Drawer
        anchor='left'
        open={barOpener}
        onClose={() => {
          setImmediate(() => {
            setBarOpener(false);
          });
        }}>
        <SideAppBar navBarList={navBarList} pageName='admin' />
      </Drawer>
      <Grid item xs={12} sm={12}>
        <UpperHeader itemCode={123} storeCode={storeCode} />
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
      {fieldAlert.flagData ? (
        <Alert severity={fieldAlert.severity}>{fieldAlert.message}</Alert>
      ) : (
        ""
      )}
      <Grid className='ReportGenerateStyle'>
        <Grid item xs={6} sm={3} className='mx-2 Level_Style'>
          <SelectOfMUI
            label='Level'
            optionList={levelDropDown}
            selectHandleChange={onChangeInputHandler}
            value={endDayReportInput.level}
            name='level'
          />
        </Grid>
        <br />
        {endDayReportInput.level === "HitRate Report" ? (
          <Grid item xs={6} sm={3} className='mx-2 Parameter_style'>
            <SelectOfMUI
              label='Parameter'
              optionList={parameterOption}
              selectHandleChange={onChangeInputHandler}
              value={endDayReportInput.parameter}
              name='parameter'
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={6} sm={3} className='Parameter_style'>
              <TextFieldOfMUI
                lable='From'
                type='date'
                textFieldHandlerChange={onChangeInputHandler}
                value={endDayReportInput.fromDate}
                name='fromDate'
                placeholder='Select Date'
              />
            </Grid>
            <br />
            <Grid item xs={6} sm={3} className='mx-2 Parameter_style'>
              <TextFieldOfMUI
                lable='To'
                type='date'
                textFieldHandlerChange={onChangeInputHandler}
                value={endDayReportInput.toDate}
                name='toDate'
              />
            </Grid>
          </>
        )}
        <br />
        <Grid className='d-flex mx-1'>
          {endDayReportInput.level === "HitRate Report" ? (
            <Button
              color='primary'
              variant='contained'
              onClick={validateParameter}>
              GENERATE REPORT
            </Button>
          ) : (
            <Button color='primary' variant='contained' onClick={validateFiled}>
              GENERATE REPORT
            </Button>
          )}
        </Grid>
      </Grid>
      {endDayReportInput.level === "L1/L2" ||
      endDayReportInput.level === "L3" ? (
        <Container maxWidth='xl' className='my-3'>
          {endDayReport.col[0] && endDayReport.rows[0] ? (
            <DataGridForAdmin
              col={endDayReport.col}
              rows={endDayReport.rows}
              reportLable='END DAY REPORTS'
            />
          ) : null}
        </Container>
      ) : (
        ""
      )}

      {endDayReportInput.level === "L1/L2" ||
      endDayReportInput.level === "L3" ? (
        ""
      ) : (
        <>
          {ParameterData ? (
            <div className='container my-4'>
              <TableContainer>
                <Table
                  id='table-to-xls'
                  className='table-bordered ml-0'
                  style={{ marginTop: "-1%", marginBottom: "8px" }}>
                  <TableHead className='bg-primary'>
                    {endDayReportInput.parameter === "Region" ? (
                      <TableRow>
                        <TableCell>
                          <b className='text-light'>REGION</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>ITEM CODE</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>SALEABLE</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>NOT SALEABLE</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>TOTAL COUNT</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>HIT RATE</b>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell>
                          <b className='text-light'>ITEM CODE</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>SALEABLE</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>NOT SALEABLE</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>TOTAL COUNT</b>
                        </TableCell>
                        <TableCell>
                          <b className='text-light'>HIT RATE</b>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableHead>
                  <TableBody>
                    {ParameterData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    ).map((item, i) => {
                      return (
                        <>
                          {endDayReportInput.parameter === "Region" ? (
                            <TableRow key={i} hover>
                              <TableCell>{item.region}</TableCell>
                              <TableCell>{item.itemCode}</TableCell>
                              <TableCell>{item.sealable}</TableCell>
                              <TableCell>{item.notSealable}</TableCell>
                              <TableCell>{item.totalCount}</TableCell>
                              <TableCell>{item.hitRate}%</TableCell>
                            </TableRow>
                          ) : (
                            <TableRow key={i} hover>
                              <TableCell>{item.itemCode}</TableCell>
                              <TableCell>{item.sealable}</TableCell>
                              <TableCell>{item.notSealable}</TableCell>
                              <TableCell>{item.totalCount}</TableCell>
                              <TableCell>{item.hitRate}%</TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className='d-flex justify-content-end my-2'>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='excelButton'
                  table='table-to-xls'
                  filename={endDayReportInput.parameter}
                  sheet='tablexls'
                  buttonText='DOWNLOAD'
                />
                <TablePagination
                  rowsPerPageOptions={[50, 100, 150, ParameterData.length]}
                  component='div'
                  count={ParameterData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default DayEndReportAdmin;
