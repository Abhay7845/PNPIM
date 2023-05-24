import React from "react";
import { Button, Container, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Error404 from "../images/404.jpg";

const useStyle = makeStyles({
  root: {
    width: "100wh",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(" + Error404 + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
});

const Error = () => {
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
export default Error;
