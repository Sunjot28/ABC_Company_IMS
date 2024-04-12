import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles, withStyles } from "@material-ui/core/styles";

function Ubuttons() {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: "black",
      left: "17rem",
      bottom: "2.6rem",
      marginRight: "0.5rem",
      marginBottom: "1rem",
      padding: "10px",
    },
  }));

  const Button1 = withStyles((theme) => ({
    root: {
      backgroundColor: "white",
      textTransform: "none",
    },
  }))(Button);

  const Button2 = withStyles((theme) => ({
    root: {
      backgroundColor: "#8fd163",
    },
  }))(Button);

  const classes = useStyles();
  return (
    <div className="buttonContainer2">
      <Button1 variant="contained" className={classes.root}>
        Search Customer Order ID
      </Button1>

      <Button2 className={classes.root} variant="contained">
        Advanced Search
      </Button2>
    </div>
  );
}

export default Ubuttons;
