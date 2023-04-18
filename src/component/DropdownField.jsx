import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectDrop: {
    fontSize: "500",
    padding: "5px",
  },
});

const DropdownField = (props) => {
  const classes = useStyles();
  const generateOptions = (dropList) => {
    let optionItems = dropList.map((option) => (
      <option className={classes.selectDrop} key={option} value={option}>
        {option}
      </option>
    ));
    return optionItems;
  };
  return (
    <>
      <div className="input-group" style={{ width: "75%" }}>
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            {props.labelName}
          </label>
        </div>
        <select
          onChange={props.myChangeHandler}
          name={props.name}
          value={props.value}
          className={classes.selectDrop}
          id="inputGroupSelect01"
        >
          <option className={classes.selectDrop} value="ALL">
            ALL
          </option>
          {generateOptions(!props.dropList ? [""] : props.dropList)}
        </select>
      </div>
    </>
  );
};
export default DropdownField;
