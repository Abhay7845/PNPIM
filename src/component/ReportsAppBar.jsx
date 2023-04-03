import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DropdownField from "./DropdownField";

function ReportsAppBar(props) {
  const {
    barHandler,
    reportOptions,
    reportDropHandler,
    showInformationHandler,
    showInfo,
    switchEnable,
  } = props;

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            onClick={barHandler}
            edge="start"
            color="inherit"
            aria-label="menu"
            className="mr-2"
          >
            <MenuIcon />
          </IconButton>
          <DropdownField
            name="Report"
            labelName="Report"
            bigSmall={false}
            dropList={reportOptions}
            myChangeHandler={(event) => {
              reportDropHandler(event.target.value);
            }}
          />
          {showInformationHandler ? (
            <FormControlLabel
              control={
                <Switch
                  checked={showInfo}
                  onChange={showInformationHandler}
                  name="feedbackSwitch"
                  color="secondary"
                  disabled={switchEnable}
                />
              }
              label="Product Description"
            />
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default ReportsAppBar;
