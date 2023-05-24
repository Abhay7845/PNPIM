import React from "react";

const TableColoumGenrator = (props) => {
  const { tableName } = props;

  switch (tableName) {
    case "Item_Wise_Report":
      urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
      break;
    case "NeedState":
      urlReport = `${UrlManager.SummaryReportL3}${storeCode}/NeedState`;
      break;
    case "Collection":
      urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Collection`;
      break;
    case "ItGroup":
      urlReport = `${UrlManager.SummaryReportL3}${storeCode}/ItGroup`;
      break;
    case "Category":
      urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Category`;
      break;
    case "Cancel_Item_List":
      urlReport = `${UrlManager.canceledItemReportL3}${storeCode}`;
      break;

    default:
      urlReport = urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
      break;
  }
};

function itemWiseReport() {
  let colRes = [
    {
      field: "",
      headerName: "Action",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            onClick={(data) => {
              rowDataHandler(params.row);
            }}
          >
            Click
          </Button>
        );
      },
    },
  ];

  return;
}

export default TableColoumGenrator;
