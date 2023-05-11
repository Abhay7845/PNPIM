import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { Multiselect } from "multiselect-react-dropdown";
const useStyles = makeStyles({
  formControl: {
    minWidth: "15%",
  },
  report: {
    width: "100%",
    margin: "0%",
    padding: "0%",
  },
  search: {
    border: 0,
    outline: "none",
    background: "none",
    borderBottom: "1px solid #000000",
    marginLeft: "-15px",
    marginBottom: "10px",
  },
});

const ComponentFroAdmin = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6} sm={3}></Grid>
        <Grid item xs={6} sm={3}></Grid>
        <Grid item xs={6} sm={3}></Grid>
        <Grid item xs={6} sm={3}>
          <Button>Generate Report </Button>
        </Grid>
      </Grid>
    </>
  );
};

const TextFieldOfMUI = (props) => {
  const {
    lable,
    type,
    textFieldHandlerChange,
    value,
    name,
    multiline,
    rows,
    autoComplete,
    required,
  } = props;
  return (
    <>
      <TextField
        fullWidth
        id="date"
        label={lable}
        type={type}
        variant="outlined"
        onChange={textFieldHandlerChange}
        value={value}
        name={name}
        multiline={multiline}
        rows={rows}
        required={required}
        autoComplete={autoComplete}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};

const SelectOfMUI = (props) => {
  const { lable, optionList, selectHandleChange, value, name } = props;
  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">{lable} </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={selectHandleChange}
          name={name}
          label={lable}
        >
          {optionList.map((element) => {
            return (
              <MenuItem key={element} value={element}>
                {element}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

function CustomToolbar(props) {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ fileName: "DayEndReport" }} />
    </GridToolbarContainer>
  );
}

function TableForMasterSKU(props) {
  const classes = useStyles();
  const { col, rows, reportLabel } = props;
  const [loginValue, SetLoginValue] = useState("");
  const column = col.map((element) => {
    return {
      field: element,
      sortable: false,
      flex: 150,
    };
  });

  return (
    <>
      <Container maxWidth="xl" className={classes.report}>
        <Typography variant="h6" color="secondary">
          {reportLabel}
        </Typography>
        <Typography color="primary" className="my-2">
          COUNT: {rows.length}
        </Typography>
        <DataGrid
          rows={rows}
          columns={column}
          autoHeight={true}
          pageSize={50}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Container>
    </>
  );
}
function DataGridForAdmin(props) {
  const classes = useStyles();
  const { col, rows, reportLabel } = props;
  const [loginValue, SetLoginValue] = useState("");
  const column = col.map((element) => {
    return {
      field: element,
      sortable: false,
      flex: 150,
    };
  });
  const DataRows = rows.filter((eachRow) =>
    eachRow.loginId.includes(loginValue.toUpperCase())
  );
  return (
    <>
      <Container maxWidth="xl" className={classes.report}>
        <Typography variant="h6" color="secondary">
          {reportLabel}
        </Typography>
        <Typography color="primary" className="my-2">
          COUNT: {rows.length}
        </Typography>
        <Grid item className="mx-3">
          <input
            type="text"
            placeholder="Search By Login ID"
            className={classes.search}
            onChange={(e) => SetLoginValue(e.target.value)}
          />
        </Grid>
        <DataGrid
          rows={DataRows}
          columns={column}
          autoHeight={true}
          pageSize={50}
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            toolbar: {
              rows: rows,
            },
          }}
        />
      </Container>
    </>
  );
}

function MultiSelectFroAdmin(props) {
  const classes = useStyles();
  let { optionsList, labelName, onChangeHandler } = props;
  const options = optionsList.map((element) => {
    return {
      abmMailId: element.abmMailId,
      npd: element.npd,
      npdManagerMailId: element.npdManagerMailId,
      plainManager: element.plainManager,
      rbmMailId: element.rbmMailId,
      rmMailId: element.rmMailId,
      storeMailId: element.storeMailId,
      strCode: element.strCode,
      studdedManager: element.studdedManager,
    };
  });
  const onInternalSelectChange = (selectedList, selectedItem) => {
    console.log("selected item for Add", selectedItem.lableValue);
    onChangeHandler(selectedList);
  };
  const onInternalRemoveChange = (selectedList, removedItem) => {
    console.log("selected item for remove", removedItem.lableValue);
    onChangeHandler(selectedList);
  };

  return (
    <>
      <div className={classes.drop_multi}>
        <Typography align="center" color="primary">
          {labelName}
        </Typography>
        <Multiselect
          options={options}
          displayValue="strCode"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          closeOnSelect={false}
          placeholder="Choose Options"
          disablePreSelectedValues={true}
        />
      </div>
    </>
  );
}

export default ComponentFroAdmin;
export {
  TextFieldOfMUI,
  SelectOfMUI,
  DataGridForAdmin,
  MultiSelectFroAdmin,
  TableForMasterSKU,
};
