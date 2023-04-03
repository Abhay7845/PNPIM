import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 1,
    margin: "0%",
    marginBottom: "1%",

    pending: "0%",
  },
  tableHeader: {
    backgroundColor: "#a1887f",
  },
  tableCell: {
    border: "solid",
    borderColor: "#dcded5",
  },
});
const StatusTabular = (props) => {
  const storeValue = localStorage.getItem("store_value");
  const classes = useStyles();

  let statusData = props.statusData;
  const rowcreater = (oneStatus) => {
    let rows = [];
    let count = 0;
    for (const property in oneStatus) {
      rows[count++] = (
        <TableCell className={classes.tableCell} align="center">
          {oneStatus[property]}
        </TableCell>
      );
    }
    return rows;
  };

  const columns =
    storeValue !== "L3" && props.statusData.coloum.length > 0
      ? [...statusData.coloum, "REMAINING SKU COUNT"]
      : [...statusData.coloum];

  const TableData =
    statusData.value &&
    statusData.value.map((eachItem) => {
      return {
        id: eachItem.id,
        consumerBase: eachItem.consumerBase,
        totalSKU: eachItem.totalSKU,
        saleable: eachItem.saleable,
        notSaleable: eachItem.notSaleable,
        remainingSKUcount: (
          parseInt(eachItem.totalSKU) -
          parseInt(eachItem.saleable) -
          parseInt(eachItem.notSaleable)
        ).toString(),
      };
    });
  const NATTableData =
    statusData.value &&
    statusData.value.map((eachItem) => {
      return {
        consumerBase: eachItem.consumerBase,
        totalSKU: eachItem.totalSKU,
        remaining: eachItem.remaining,
        indented: eachItem.indented,
        totalQty: eachItem.totalQty,
        totalSdtWt: eachItem.totalSdtWt,
        tolValue: eachItem.tolValue,
      };
    });
  const TableDetails = storeValue === "L3" ? NATTableData : TableData;
  const TableColumns = storeValue === "L3" ? statusData.coloum : columns;

  return (
    <>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead style={{ backgroundColor: "#832729" }}>
          {statusData.coloum ? (
            <TableRow>
              {TableColumns.map((statusColoum, index) => (
                <TableCell
                  className={classes.tableCell}
                  key={index}
                  align="center"
                  style={{ color: "#ffff" }}
                >
                  <Typography variant="h6">
                    {statusColoum.toUpperCase()}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ) : (
            ""
          )}
        </TableHead>
        <TableBody>
          {statusData.value ? (
            TableDetails.map((statusColoum, index) => (
              <TableRow key={statusColoum.id}>
                {rowcreater(statusColoum)}
              </TableRow>
            ))
          ) : (
            <Typography align="center" color="secondary">
              Status Data is Empty...!
            </Typography>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default StatusTabular;
