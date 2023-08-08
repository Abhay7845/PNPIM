import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/LowerHeader.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
  AppBar,
  Drawer,
  Grid,
  IconButton,
  TextField,
  Toolbar,
} from "@material-ui/core";
import SideAppBar from "./SideAppBar";
import StatusTabular from "./StatusTabular";
import { useStyles } from "../Style/LowerHeader";

const LowerHeader = (props) => {
  const classes = useStyles();
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [dropState, setDropState] = useState({
    itemCode: "",
  });
  const [itemCodeValid, setItemCodeValid] = useState(false);
  const specialChars = [
    "",
    "+",
    "-",
    "_",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "{",
    "}",
    "[",
    "]",
    ";",
    ":",
    "?",
    "/",
    ">",
    "<",
    ".",
    ",",
    "~",
    "`",
  ];

  const newChangeHandler = (e) => {
    var inputValue = e.target.value;
    if (inputValue === "") {
      setItemCodeValid(false);
    } else {
      for (let char of inputValue) {
        if (specialChars.includes(char)) {
          setItemCodeValid(true);
        } else {
          setItemCodeValid(false);
        }
      }
    }
    setDropState({ itemCode: e.target.value.toUpperCase() });
  };
  const myBarClickHandler = (event) => {
    setBarOpener(!barOpener);
  };
  const mySearchClickHandler = () => {
    if (props.L3) {
      props.setAllDataFromValidation({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
      });
    }
    props.onSear(dropState);
  };

  useEffect(() => {
    if (dropState.itemCode.length === 14) {
      mySearchClickHandler();
    }
  }, [dropState.itemCode]);
  const statusOpener = (event) => {
    setStatusCloserOpener(!statusCloserOpener);
  };
  return (
    <React.Fragment>
      <Drawer anchor="left" open={barOpener} onClose={myBarClickHandler}>
        <SideAppBar navBarList={props.navBarList} statusOpener={statusOpener} />
      </Drawer>

      <Drawer anchor="top" open={statusCloserOpener} onClose={statusOpener}>
        <StatusTabular statusData={props.statusData} />
      </Drawer>
      <section className="lower_header_show ">
        <div className={classes.root}>
          <AppBar
            position="static"
            color="transparent"
            className={classes.lowerHeader}
          >
            <Toolbar>
              <IconButton
                onClick={myBarClickHandler}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              {!props.phyNpim ? (
                <div>
                  <TextField
                    name="phydata"
                    placeholder="Enter 14 digit Item Code"
                    type="text"
                    id="textitemcode"
                    value={dropState.itemCode}
                    onChange={(e) => {
                      newChangeHandler(e);
                    }}
                    helperText={itemCodeValid ? "Enter valid ItemCode" : ""}
                    error={itemCodeValid}
                    autoFocus
                  />
                </div>
              ) : (
                ""
              )}

              {!props.phyNpim ? (
                <div className={classes.searchButton}>
                  <IconButton
                    onClick={mySearchClickHandler}
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              ) : (
                ""
              )}
              {props.phyNpim ? (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  maxWidth="xs"
                  justifyContent="center"
                  className={classes.projectLogo}
                >
                  <TextField
                    name="phydata"
                    placeholder="Enter 14 digit Item Code"
                  />
                </Grid>
              ) : (
                ""
              )}
            </Toolbar>
          </AppBar>
        </div>
      </section>
    </React.Fragment>
  );
};
export default LowerHeader;
