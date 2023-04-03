import { Button, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
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

const FavoriteL3 = () => {
  const classes = useStyle();
  const history = useHistory();
  const onBackHandler = () => {
    history.goBack();
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
export default FavoriteL3;
