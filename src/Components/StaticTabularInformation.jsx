import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import useStyles from "../Style/StaticTabularInformation";

const StaticTabularInformation = (props) => {
  const classes = useStyles();
  return (
    <>
      <Paper className="my-4">
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.tableCell}
                component="th"
                scope="row"
              >
                SI2_GH
              </TableCell>
              <TableCell className={classes.tableCell}>VS_GH</TableCell>
              <TableCell className={classes.tableCell}>VVS1</TableCell>
              <TableCell className={classes.tableCell}>I2_GH</TableCell>
              <TableCell className={classes.tableCell}>SI2_IJ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={props.si2Gh}>
              <TableCell
                className={classes.tableCell}
                component="td"
                scope="row"
              >
                {props.si2Gh}
              </TableCell>
              <TableCell className={classes.tableCell}>{props.vsGh}</TableCell>
              <TableCell className={classes.tableCell}>{props.vvs1}</TableCell>
              <TableCell className={classes.tableCell}>{props.i2Gh}</TableCell>
              <TableCell className={classes.tableCell}>{props.si2Ij}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default StaticTabularInformation;
