import React, { Suspense } from "react";
import loadable from "./loadable";
import { Typography } from "@material-ui/core";
import SingleImgCreator from "./SingleImgCreator";

const DataGrid = loadable(() =>
  import("@material-ui/data-grid").then((module) => {
    return { default: module.DataGrid };
  })
);

const LazyLoadingDataGridForClosedPortal = (props) => {
  const { col, rows, caller, reportLable } = props;
  const column = col.map((element) => {
    let fieldRes;

    if (element === "Image") {
      fieldRes = {
        field: "Image",
        headerName: "Image",
        sortable: false,
        innerHeight: 500,
        flex: 1,

        renderCell: (params) => {
          return (
            <SingleImgCreator
              itemCode={
                params.row.itemCode ? params.row.itemCode : "502783VWQR1A02"
              }
              link="https://tanishqdigitalnpim.titan.in/NpimImages/"
            />
          );
        },
      };
    } else {
      fieldRes = {
        field: element,
        flex: 1,
        sortable: false,
      };
    }

    return fieldRes;
  });

  return (
    <>
      <Typography align="center" variant="h5" color="secondary">
        {reportLable}
      </Typography>
      <Suspense fallback={<Typography>dada is loading </Typography>}>
        <DataGrid
          rows={rows}
          columns={column}
          autoHeight={true}
          rowsPerPageOptions={[50]}
          pagination
          pageSize={50}
        />
      </Suspense>
    </>
  );
};

export default LazyLoadingDataGridForClosedPortal;
