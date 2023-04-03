import {
  Button,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import SearchBar from "material-ui-search-bar";
import SingleImgCreator from "./SingleImgCreator";
import NoData from "../pages/NoData";

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
    margin: "0",
  },

  tableHeader: {
    background: "black",
    color: "#e8eaf6",
    fontSize: "5rem",
  },
  tableCell: {
    color: "White",
  },
  searchBar: {
    align: "center",
    margin: "5%",
  },
  tableTitle: {
    margin: "5%",
  },
});

const TableComponent = (props) => {
  const classes = useStyles();
  const [rows, setRows] = useState(props.report);
  const [searched, setSearched] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const requestSearch = (searchedVal) => {
    const filteredRows = props.report.filter(
      (row) =>
        row.itemCode.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.collection.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.consumerBase.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.itGroup.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.category.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.stdWt.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.stdUCP.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.saleable.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.reasons.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.scannedCount.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.unscannedCount.toLowerCase().includes(searchedVal.toLowerCase())
    );
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handlerChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlerRowPerChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const onEditChange = (event) => {
    props.getProductData(event);
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Paper elevation={5}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                id="tableTitle"
                className={classes.tableTitle}
              >
                {props.reportName.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ display: "none" }}>
              <SearchBar
                className={classes.searchBar}
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            </Grid>
            <Divider />
            <Grid item xs={12}>
              {props.report.length > 0 ? (
                <TableContainer component="div">
                  <Table size="small" className={classes.table}>
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        {props.coloum.map((column, index) => (
                          <TableCell
                            key={index}
                            align="center"
                            className={classes.tableCell}
                          >
                            {column}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.report
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <TableRow
                            key={row.id}
                            style={
                              index % 2
                                ? { background: "#90caf9" }
                                : { background: "white" }
                            }
                          >
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.id}
                            </TableCell>
                            <TableCell align="center">
                              <SingleImgCreator
                                itemCode={row.itemCode}
                                link="https://tanishqdigitalnpim.titan.in/NpimImages/"
                              />
                            </TableCell>
                            <TableCell align="center">{row.itemCode}</TableCell>
                            <TableCell align="center">
                              {row.collection}
                            </TableCell>
                            <TableCell align="center">
                              {row.consumerBase}
                            </TableCell>
                            <TableCell align="center">{row.itGroup}</TableCell>
                            <TableCell align="center">{row.category}</TableCell>
                            <TableCell align="center">{row.stdWt}</TableCell>
                            <TableCell align="center">{row.stdUCP}</TableCell>
                            <TableCell align="center">{row.saleable}</TableCell>
                            <TableCell align="center">{row.reasons}</TableCell>
                            <TableCell align="center">
                              {row.quality_Rating}
                            </TableCell>
                            <TableCell align="center">
                              {row.quality_Reasons}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                onClick={() => {
                                  onEditChange(row);
                                }}
                              >
                                <EditIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={props.report.length}
                    page={page}
                    onChangePage={handlerChangePage}
                    onChangeRowsPerPage={handlerRowPerChange}
                  />
                </TableContainer>
              ) : (
                <NoData />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};
export default TableComponent;
