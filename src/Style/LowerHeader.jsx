import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    letterSpacing: "2px",
    fontFamily: "Raleway, sans-serif",
  },
  menuButton: {
    marginRight: "2%",
  },
  searchButton: {
    marginLeft: "2%",
  },
  title: {
    flexGrow: 1,
  },
  projectLogo: {
    flexGrow: 1,
    marginTop: "1%",
    fontWeight: "12px",
  },

  lowerHeader: {
    minHeight: "2rem",
  },

  show: {
    display: "block",
  },
  hide: {
    display: "none",
  },

  phyInput: {
    textAlign: "center",
  },
});
