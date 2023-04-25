import {
  FormControl,
  Dialog,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Select,
  Typography,
  Button,
  Container,
  InputLabel,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import OTPInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import SingleImgCreator from "./SingleImgCreator";
import Blink from "react-blink-text";
import "../Style/CssStyle/LowerHeader.css";
import useStyles from "../Style/ComponentForL3";
import HostManager from "../HostManager/HostManager";

function DataGridReport(props) {
  const classes = useStyles();
  const { col, rows, reportLable, rowDataHandler } = props;
  const column = col.map((element) => {
    let fieldRes;

    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Action",
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <Button
              onClick={(data) => {
                rowDataHandler(params.row);
              }}
            >
              Edit
            </Button>
          );
        },
      };
    } else if (element === "Image") {
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
      <Container maxWidth="xl" className={classes.report}>
        <Typography align="center" variant="h5" color="secondary">
          {reportLable}
        </Typography>

        <DataGrid
          rows={rows}
          columns={column}
          autoHeight={true}
          autoPageSize={true}
          pageSize={100}
          disableColumnSelector
        />
      </Container>
    </>
  );
}

function DropDownMaterialUI(props) {
  const classes = useStyles();
  const { labelName, onChangeHandler, optionsList } = props;
  const generateOptions = (dropList) => {
    let optionItems = dropList.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
    return optionItems;
  };
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          {labelName}
        </InputLabel>
        <Select
          label={labelName}
          autoWidth={true}
          onChange={onChangeHandler}
          // value={valueData}
        >
          <MenuItem value="">
            <em>None here</em>
          </MenuItem>
          {generateOptions(optionsList)}
        </Select>
      </FormControl>
    </>
  );
}

function MultiselectUomAndSize(props) {
  const classes = useStyles();
  const [childNodeSize, setChildNodeSize] = useState([]);
  const [sizeRow, setSizeRow] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
    O: false,
    P: false,
    Q: false,
    R: false,
    S: false,
    T: false,
    U: false,
    V: false,
    W: false,
    X: false,
    Y: false,
    Z: false,
    Single_Tag: false,
    Separate_Tag: false,
    Only_EARRING: false,
    Only_Mangalsutra: false,
  });

  const {
    optionsList,
    CategoryData,
    sizeUomQuantityResHandler,
    findingsResHandler,
    tegQuantityRes,
  } = props;
  const digit = CategoryData.itemCode[6];
  console.log("digit==>", digit);
  const options = optionsList.map((element, index) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const ChildOptions = childNodeSize.map((element, index) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const childNodesN = CategoryData.childNodesN;

  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${childNodesN}`)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setChildNodeSize(result.data.value);
        } else {
          console.log("data not found");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [childNodesN]);

  const enableRows = (name, value) => {
    setSizeRow((old) => {
      switch (name) {
        case "A":
          return {
            ...old,
            [name]: value,
          };
        case "B":
          return {
            ...old,
            [name]: value,
          };
        case "C":
          return {
            ...old,
            [name]: value,
          };
        case "D":
          return {
            ...old,
            [name]: value,
          };
        case "E":
          return {
            ...old,
            [name]: value,
          };
        case "F":
          return {
            ...old,
            [name]: value,
          };
        case "G":
          return {
            ...old,
            [name]: value,
          };
        case "H":
          return {
            ...old,
            [name]: value,
          };
        case "I":
          return {
            ...old,
            [name]: value,
          };
        case "J":
          return {
            ...old,
            [name]: value,
          };
        case "K":
          return {
            ...old,
            [name]: value,
          };
        case "L":
          return {
            ...old,
            [name]: value,
          };
        case "M":
          return {
            ...old,
            [name]: value,
          };
        case "N":
          return {
            ...old,
            [name]: value,
          };
        case "O":
          return {
            ...old,
            [name]: value,
          };
        case "P":
          return {
            ...old,
            [name]: value,
          };
        case "Q":
          return {
            ...old,
            [name]: value,
          };
        case "R":
          return {
            ...old,
            [name]: value,
          };
        case "S":
          return {
            ...old,
            [name]: value,
          };
        case "T":
          return {
            ...old,
            [name]: value,
          };
        case "U":
          return {
            ...old,
            [name]: value,
          };

        case "V":
          return {
            ...old,
            [name]: value,
          };
        case "W":
          return {
            ...old,
            [name]: value,
          };

        case "X":
          return {
            ...old,
            [name]: value,
          };
        case "Y":
          return {
            ...old,
            [name]: value,
          };
        case "Z":
          return {
            ...old,
            [name]: value,
          };
        case "Single_Tag":
          return {
            ...old,
            [name]: value,
          };
        case "Separate_Tag":
          return {
            ...old,
            [name]: value,
          };
        case "Only_EARRING":
          return {
            ...old,
            [name]: value,
          };
        case "Only_Mangalsutra":
          return {
            ...old,
            [name]: value,
          };
        default:
          break;
      }
    });
  };

  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };

  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item for Add123==>", selectedItem.lableValue);
    enableRows(selectedItem.lableValue, true);
    // setEarRing(selectedItem.lableValue);
  };
  const onInternalRemoveChange = (selectedList, removedItem) => {
    console.log("selected item for remove1234==>", removedItem.lableValue);
    enableRows(removedItem.lableValue, false);
  };
  // CATEGORY T AND ONLY MANGALSUTRA

  const ChildOnInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item for Add123==>", selectedItem.lableValue);
    enableRows(selectedItem.lableValue, true);
  };

  const rowHandlerChange = (event) => {
    let getData = [];
    let count = 0;
    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          uom8: document.getElementById(`${rowName}8`).value
            ? document.getElementById(`${rowName}8`).value
            : "",
          uom6: document.getElementById(`${rowName}6`).value
            ? document.getElementById(`${rowName}6`).value
            : "",
          uom4: document.getElementById(`${rowName}4`).value
            ? document.getElementById(`${rowName}4`).value
            : "",
          uom2: document.getElementById(`${rowName}2`).value
            ? document.getElementById(`${rowName}2`).value
            : "",
          uom1: document.getElementById(`${rowName}1`).value
            ? document.getElementById(`${rowName}1`).value
            : "",
        };
      }
    }
    console.log("sizeUom==>", getData);
    return sizeUomQuantityResHandler(getData);
  };

  const rowHandlerChanges = (event) => {
    let getData = [];
    let count = 0;

    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          quantity: document.getElementById(`${rowName}sq`).value
            ? document.getElementById(`${rowName}sq`).value
            : "",
        };
      }
    }
    return tegQuantityRes(getData);
  };

  const findings = CategoryData.findings;
  const findingsOptions = !findings ? "" : findings.split(",");
  const optionsOnlyM = ["Only_Mangalsutra"];
  const optionM = optionsOnlyM.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const optionsOnlyE = ["Only_EARRING"];
  const optionE = optionsOnlyE.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  return (
    <>
      <Multiselect
        options={options}
        displayValue="lableValue"
        onSelect={onInternalSelectChange}
        onRemove={onInternalRemoveChange}
        showCheckbox={true}
        closeOnSelect={true}
        placeholder={digit === "V" ? "Choose Size" : "Choose Tag"}
        disablePreSelectedValues={true}
      />
      {digit === "V" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7" ? (
        <table style={{ width: "100%", padding: 1, margin: 0 }}>
          <tbody>
            {options.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue) ? classes.show : classes.hide
                }
              >
                <td>
                  <Typography size="small" color="primary">
                    {row.lableValue}
                  </Typography>
                </td>
                <td>
                  <Typography size="small" color="primary">
                    8
                  </Typography>
                </td>
                <td>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}8`}
                    name={`${row.lableValue}8`}
                    className={classes.inputField}
                    placeholder="Quantity"
                  />
                </td>
                <td>
                  <Typography size="small" color="primary">
                    6
                  </Typography>
                </td>
                <td>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}6`}
                    name={`${row.lableValue}6`}
                    className={classes.inputField}
                    placeholder="Quantity"
                  />
                </td>
                <td>
                  <Typography size="small" color="primary">
                    4
                  </Typography>
                </td>
                <td>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}4`}
                    name={`${row.lableValue}4`}
                    className={classes.inputField}
                    placeholder="Quantity"
                  />
                </td>
                <td>
                  <Typography size="small" color="primary">
                    2
                  </Typography>
                </td>
                <td>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}2`}
                    name={`${row.lableValue}2`}
                    className={classes.inputField}
                    placeholder="Quantity"
                  />
                </td>
                <td>
                  <Typography size="small" color="primary">
                    1
                  </Typography>
                </td>
                <td>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}1`}
                    name={`${row.lableValue}1`}
                    className={classes.inputField}
                    placeholder="Quantity"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
      {digit === "T" ? (
        <>
          <table style={{ width: "100%", margin: 0 }}>
            <tbody className="d-flex">
              {options.map((row, index) => (
                <tr
                  key={index}
                  onChange={rowHandlerChanges}
                  id={row.lableValue}
                  className={
                    enableRow(row.lableValue) ? classes.show : classes.hide
                  }
                >
                  <b style={{ fontSize: "12px" }}>Quantity</b>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                    placeholder={row.lableValue}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
      <table style={{ width: "100%", padding: 1, margin: 0 }}>
        <tbody>
          {optionM.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              <div className={classes.drop_multi}>
                <Multiselect
                  options={ChildOptions}
                  displayValue="lableValue"
                  onSelect={ChildOnInternalSelectChange}
                  onRemove={onInternalRemoveChange}
                  showCheckbox={true}
                  closeOnSelect={true}
                  placeholder="Choose Size"
                  disablePreSelectedValues={true}
                />
                <table style={{ width: "100%", margin: 0 }}>
                  <tbody className="d-flex">
                    {ChildOptions.map((row, index) => (
                      <tr
                        key={index}
                        onChange={rowHandlerChanges}
                        id={row.lableValue}
                        className={
                          enableRow(row.lableValue)
                            ? classes.show
                            : classes.hide
                        }
                      >
                        <b style={{ fontSize: "12px" }}>Quantity</b>
                        <input
                          type="text"
                          maxlength="1"
                          id={`${row.lableValue}sq`}
                          name={`${row.lableValue}sq`}
                          className={classes.inputField}
                          placeholder={row.lableValue}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </tr>
          ))}
        </tbody>
      </table>

      <table style={{ width: "100%", padding: 1, margin: 0 }}>
        <tbody>
          {optionE.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.lableValue}
              className={
                enableRow(row.lableValue) ? classes.showDropdown : classes.hide
              }
            >
              {CategoryData.findings ? (
                <DropDownMaterialUI
                  labelName="Findings"
                  onChangeHandler={findingsResHandler}
                  optionsList={findingsOptions}
                  // valueData=""
                />
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function MultiSelectDropDownForAll(props) {
  const classes = useStyles();
  let optionsList = ["prasun", "kamal", "Rekha", "chandan", "megha"];
  const placeholder = "size";

  const options = optionsList.map((element, index) => {
    return { valueData: element, lableValue: element };
  });
  const onInternalSelectChange = (selectedList, selectedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelect(selectedData);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelect(selectedData);
  };

  return (
    <>
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          Label
        </Typography>
        {options ? (
          <Multiselect
            options={options}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            closeOnSelect={true}
            // selectionLimit={3}
            placeholder={placeholder}
            disablePreSelectedValues={true}
          />
        ) : (
          <Typography align="center" color="secondary">
            Options are loading ...!
          </Typography>
        )}
      </div>
    </>
  );
}

function InputFieldMaterialUI(props) {
  const classes = useStyles();
  const { onChangeHandler, allDataFromValidation } = props;
  const [showHelper, setHelper] = useState(0);

  useEffect(() => {
    if (allDataFromValidation.quantityRes !== "") {
      if (
        allDataFromValidation.quantityRes.length > 1 ||
        parseInt(allDataFromValidation.quantityRes) === 0 ||
        parseInt(allDataFromValidation.quantityRes) > 10
      ) {
        setHelper(1);
      } else {
        setHelper(0);
      }
    }
  }, [allDataFromValidation.quantityRes]);

  return (
    <>
      <div className={classes.inputField}>
        <b>Indent Quantity</b>
        <OTPInput
          inputClassName="otp"
          value={allDataFromValidation?.quantityRes}
          onChange={(value) => {
            onChangeHandler(value);
          }}
          autoFocus
          OTPLength={1}
          otpType="number"
        />
        {
          <p className="text-danger">
            {showHelper === 0 ? "" : "Please enter a valid quantity"}
          </p>
        }
      </div>
    </>
  );
}

function MultiSelectAndInput(props) {
  const classes = useStyles();
  const [tagOption, setTagOption] = useState("");
  const [CoupleGentsSize, setCoupleGentsSize] = useState([]);
  const [CoupleLadiesSize, setCoupleLadiesSize] = useState([]);
  const { CategoryData, optionsList, onChangeHandler } = props;
  const digit = CategoryData.itemCode[6];
  const [sizeRow, setSizeRow] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
    O: false,
    P: false,
    Q: false,
    R: false,
    S: false,
    T: false,
    V: false,
    X: false,
    Y: false,
    Z: false,
    2: false,
    4: false,
    6: false,
    8: false,
    Single_Tag: false,
    Separate_Tag: false,
    Only_EARRING: false,
    Only_NECKWEAR_OR_PENDANT: false,
  });
  const chooseOption = ["Single_Tag", "Separate_Tag"];

  const GentsSize = CoupleGentsSize.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const LadiesSize = CoupleLadiesSize.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const options = optionsList.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  const enableRows = (name, value) => {
    setSizeRow(function (old) {
      switch (name) {
        case "1":
          return {
            ...old,
            [name]: value,
          };
        case "2":
          return {
            ...old,
            [name]: value,
          };
        case "3":
          return {
            ...old,
            [name]: value,
          };
        case "4":
          return {
            ...old,
            [name]: value,
          };
        case "5":
          return {
            ...old,
            [name]: value,
          };
        case "6":
          return {
            ...old,
            [name]: value,
          };
        case "7":
          return {
            ...old,
            [name]: value,
          };
        case "8":
          return {
            ...old,
            [name]: value,
          };
        case "9":
          return {
            ...old,
            [name]: value,
          };
        case "A":
          return {
            ...old,
            [name]: value,
          };
        case "B":
          return {
            ...old,
            [name]: value,
          };
        case "C":
          return {
            ...old,
            [name]: value,
          };
        case "D":
          return {
            ...old,
            [name]: value,
          };
        case "E":
          return {
            ...old,
            [name]: value,
          };
        case "F":
          return {
            ...old,
            [name]: value,
          };
        case "G":
          return {
            ...old,
            [name]: value,
          };
        case "H":
          return {
            ...old,
            [name]: value,
          };
        case "I":
          return {
            ...old,
            [name]: value,
          };
        case "J":
          return {
            ...old,
            [name]: value,
          };
        case "K":
          return {
            ...old,
            [name]: value,
          };
        case "L":
          return {
            ...old,
            [name]: value,
          };
        case "M":
          return {
            ...old,
            [name]: value,
          };
        case "N":
          return {
            ...old,
            [name]: value,
          };
        case "O":
          return {
            ...old,
            [name]: value,
          };
        case "P":
          return {
            ...old,
            [name]: value,
          };
        case "Q":
          return {
            ...old,
            [name]: value,
          };
        case "R":
          return {
            ...old,
            [name]: value,
          };
        case "S":
          return {
            ...old,
            [name]: value,
          };
        case "T":
          return {
            ...old,
            [name]: value,
          };
        case "U":
          return {
            ...old,
            [name]: value,
          };
        case "V":
          return {
            ...old,
            [name]: value,
          };
        case "W":
          return {
            ...old,
            [name]: value,
          };
        case "X":
          return {
            ...old,
            [name]: value,
          };
        case "Y":
          return {
            ...old,
            [name]: value,
          };
        case "Z":
          return {
            ...old,
            [name]: value,
          };
        case "Single_Tag":
          return {
            ...old,
            [name]: value,
          };
        case "Separate_Tag":
          return {
            ...old,
            [name]: value,
          };
        case "Only_EAR_RING":
          return {
            ...old,
            [name]: value,
          };
        case "Only_NECKWEAR_OR_PENDANT":
          return {
            ...old,
            [name]: value,
          };
        default:
          break;
      }
    });
  };
  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item Item==>", selectedItem.lableValue);
    enableRows(selectedItem.lableValue, true);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    console.log("selected item removed==>", removedItem.lableValue);
    enableRows(removedItem.lableValue, false);
  };

  const rowHandlerChange = (event) => {
    let getData = [];
    let count = 0;

    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          quantity: document.getElementById(`${rowName}sq`).value
            ? document.getElementById(`${rowName}sq`).value
            : "",
        };
      }
    }
    console.log("getData123456==>", getData);
    return onChangeHandler(getData);
  };

  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };
  const itemCode = CategoryData.itemCode;

  // THIS IS FOR GENTS SIZE FETCH API

  useEffect(() => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20GENTS`
      )
      .then((res) => res)
      .then((result) => {
        setCoupleGentsSize(result.data.value);
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);

  // THIS IS FOR LADIES SIZE FETCH API
  useEffect(() => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20LADIES`
      )
      .then((res) => res)
      .then((result) => {
        setCoupleLadiesSize(result.data.value);
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);

  return (
    <>
      {CategoryData.category === "FINGER RING" ||
      digit === "B" ||
      digit === "M" ||
      digit === "C" ? (
        <div className={classes.drop_multi}>
          <Typography align="center" color="primary">
            {props.labelName}
          </Typography>
          <Multiselect
            options={options}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            closeOnSelect={true}
            placeholder="Choose Size"
            disablePreSelectedValues={true}
          />
          <table style={{ width: "100%", margin: 0 }}>
            <tbody className="d-flex">
              {options.map((row, index) => (
                <tr
                  key={index}
                  onChange={rowHandlerChange}
                  id={row.lableValue}
                  className={
                    enableRow(row.lableValue) ? classes.show : classes.hide
                  }
                >
                  <b style={{ fontSize: "12px" }}>Quantity</b>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                    placeholder={row.lableValue}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      <br />
      {CategoryData.category === "COUPLE BAND" ? (
        <div className="my-2">
          <DropDownMaterialUI
            labelName="Choose Tag"
            onChangeHandler={(e) => setTagOption(e.target.value)}
            optionsList={chooseOption}
          />
        </div>
      ) : (
        ""
      )}

      {tagOption === "Single_Tag" ? (
        <div className={classes.drop_multi}>
          <Typography align="center" color="primary">
            {props.labelName}
          </Typography>
          <Multiselect
            options={options}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            closeOnSelect={true}
            placeholder="Choose Size"
            disablePreSelectedValues={true}
          />
          <table style={{ width: "100%", margin: 0 }}>
            <tbody className="d-flex">
              {options.map((row, index) => (
                <tr
                  key={index}
                  onChange={rowHandlerChange}
                  id={row.lableValue}
                  className={
                    enableRow(row.lableValue) ? classes.show : classes.hide
                  }
                >
                  <b style={{ fontSize: "12px" }}>Quantity</b>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                    placeholder={row.lableValue}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      {tagOption === "Separate_Tag" ? (
        <div className={classes.drop_multi}>
          <Multiselect
            options={GentsSize}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            closeOnSelect={true}
            placeholder="For Gents"
            disablePreSelectedValues={true}
          />
          <table style={{ width: "100%", margin: 0 }}>
            <tbody className="d-flex">
              {GentsSize.map((row, index) => (
                <tr
                  key={index}
                  onChange={rowHandlerChange}
                  id={row.lableValue}
                  className={
                    enableRow(row.lableValue) ? classes.show : classes.hide
                  }
                >
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                    placeholder={`${row.lableValue} Enter Size`}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      {tagOption === "Separate_Tag" ? (
        <div className={classes.drop_multi}>
          <Multiselect
            options={LadiesSize}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            closeOnSelect={true}
            placeholder="For Ladies"
            disablePreSelectedValues={true}
          />
          <table style={{ width: "100%", margin: 0 }}>
            <tbody className="d-flex">
              {LadiesSize.map((row, index) => (
                <tr
                  key={index}
                  onChange={rowHandlerChange}
                  id={row.lableValue}
                  className={
                    enableRow(row.lableValue) ? classes.show : classes.hide
                  }
                >
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                    placeholder={`${row.lableValue} Enter Size`}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function ProductDetailsTabularL3(props) {
  const classes = useStyles();
  return (
    <>
      <h5 className="text-center my-1">
        <b>Product Specification</b>
      </h5>
      <table className="w-100">
        <tbody>
          {props.information.collection ? (
            <tr>
              <th>COLLECTION</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.collection}
              </td>
            </tr>
          ) : null}
          {props.information.consumerBase ? (
            <tr>
              <th>NEED STATE</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.consumerBase}
              </td>
            </tr>
          ) : null}
          {props.information.itGroup ? (
            <tr>
              <th>GROUP</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.itGroup}</td>
            </tr>
          ) : null}
          {props.information.category ? (
            <tr>
              <th>CATEGORY</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.category}</td>
            </tr>
          ) : null}
          {props.information.gender ? (
            <tr>
              <th className={classes.hadding}>Gender</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.gender}</td>
            </tr>
          ) : null}
          {props.information.complexity ? (
            <tr>
              <th className={classes.hadding}>Complexity</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.complexity}
              </td>
            </tr>
          ) : null}
          {props.information.stdWt ? (
            <tr>
              <th>Std Wt</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.stdWt}</td>
            </tr>
          ) : null}
          {props.information.stdUCP || props.information.stdUcp ? (
            <tr>
              <th>Std UCp</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.stdUCP
                  ? props.information.stdUCP
                  : props.information.stdUcp}
              </td>
            </tr>
          ) : null}
          {props.information.indCategory ? (
            <tr>
              <th>IND-CATEGORY</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.indCategory}
              </td>
            </tr>
          ) : null}
          {props.information.colourWt ? (
            <tr>
              <th>METAL COLOR</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.colourWt}</td>
            </tr>
          ) : null}
          {props.information.findings ? (
            <tr>
              <th className={classes.hadding}>Findings</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.findings}</td>
            </tr>
          ) : null}
          {props.information.size ? (
            <tr>
              <th className={classes.hadding}>Size</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.size}</td>
            </tr>
          ) : null}
          {props.information.uom ? (
            <tr>
              <th className={classes.hadding}>UOM</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.uom}</td>
            </tr>
          ) : null}
          {props.information.itemQty ? (
            <tr>
              <th>QUANTITY</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.itemQty}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}

function SmallDataTable(props) {
  let digit = props.itemCode[6];
  console.log("propsTable1==>", props);

  if (digit) {
    if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7" ||
      digit === "N" ||
      digit === "T" ||
      digit === "G"
    ) {
      if (props.childNodesE || props.childNodesN) {
        return (
          <>
            <table
              className="table table-bordered"
              style={{ marginLeft: "0px" }}
            >
              <thead>
                <tr>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">StdWt</th>
                  <th scope="col">UCP</th>
                </tr>
              </thead>
              <tbody>
                {props.childNodeF === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>FINGER RING</td>
                    <td>{props.stdWtF}</td>
                    <td>{props.stdUcpF}</td>
                  </tr>
                )}
                {props.childNodesE === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>EAR RING</td>
                    <td>{props.stdWtE}</td>
                    <td>{props.stdUcpE}</td>
                  </tr>
                )}

                {props.childNodesN === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>NECKWEAR</td>
                    <td>{props.stdWtN}</td>
                    <td>{props.stdUcpN}</td>
                  </tr>
                )}
                {props.childNodeH === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>HARAM</td>
                    <td>{props.stdWtH}</td>
                    <td>{props.stdUcpH}</td>
                  </tr>
                )}
                {props.childNodeK === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>TIKKA</td>
                    <td>{props.stdWtK}</td>
                    <td>{props.stdUcpK}</td>
                  </tr>
                )}
                {props.childNodeV === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>BANGLE</td>
                    <td>{props.stdWtV}</td>
                    <td>{props.stdUcpV}</td>
                  </tr>
                )}
                {props.childNodeO === "" ? (
                  ""
                ) : (
                  <tr>
                    <td>OTHER</td>
                    <td>{props.stdWtO}</td>
                    <td>{props.stdUcpO}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        );
      } else {
        return null;
      }
    }
  }
}

function DynamicMultiSelectAndInput(props) {
  const classes = useStyles();
  const [sizeRow, setSizeRow] = useState();

  useEffect(() => {
    if (props.optionsList)
      setImmediate(() => {
        setSizeRow(
          props.optionsList.reduce(
            (total, value) => ({ ...total, [value[1]]: false }),
            {}
          )
        );
      });
  }, [props.optionsList]);

  const options = props.optionsList.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  const enableRows = (name, value) => {
    setSizeRow(function (old) {
      return {
        ...old,
        [name]: value,
      };
    });
  };
  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item for Add", selectedItem.lableValue);
    enableRows(selectedItem.lableValue, true);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    console.log("selected item for remove", removedItem.lableValue);
    enableRows(removedItem.lableValue, false);
  };
  const rowHandlerChange = (event) => {
    let getData = [];
    let count = 0;

    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          quantity: document.getElementById(`${rowName}sq`).value
            ? document.getElementById(`${rowName}sq`).value
            : "",
        };
      }
    }
    console.log("get data ", getData);

    return props.onChangeHandler(getData);
  };

  const enableRow = (lableValue) => {
    for (let rowName in sizeRow) {
      if (rowName === lableValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          {props.labelName}
        </Typography>
        <Multiselect
          options={options}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          closeOnSelect={true}
          // selectionLimit={3}
          placeholder="Choose Options"
          disablePreSelectedValues={true}
        />
        <table style={{ width: "100%", padding: 1, margin: 0 }}>
          <tbody>
            {options.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue) ? classes.show : classes.hide
                }
              >
                <td>
                  <Typography size="small" color="primary">
                    {row.lableValue}&nbsp
                  </Typography>
                </td>
                <td>
                  <input
                    type="text"
                    maxlength="1"
                    id={`${row.lableValue}sq`}
                    name={`${row.lableValue}sq`}
                    className={classes.inputField}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function BlinkingComponent(props) {
  const { color, text, fontSize } = props;
  return (
    <>
      <Blink color={color} text={text} fontSize={fontSize}>
        Testing the Blink
      </Blink>
    </>
  );
}

function AlertForL3(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Use Google's location service?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DataGridReport;
export {
  MultiselectUomAndSize,
  MultiSelectDropDownForAll,
  DropDownMaterialUI,
  InputFieldMaterialUI,
  MultiSelectAndInput,
  ProductDetailsTabularL3,
  SmallDataTable,
  DynamicMultiSelectAndInput,
  BlinkingComponent,
  AlertForL3,
};
