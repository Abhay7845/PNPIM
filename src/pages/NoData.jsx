import { Button, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router";
import Nodata from "../images/nodata.jpg";

const useStyle = makeStyles({
  root: {
    width: "100wh",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(" + Nodata + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
});

const NoData = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const onBackHandler = () => {
    navigate.goBack();
  };

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Button onClick={onBackHandler} variant="contained" color="secondary">
            Go-Back
          </Button>
        </Container>
      </div>
    </>
  );
};
export default NoData;
