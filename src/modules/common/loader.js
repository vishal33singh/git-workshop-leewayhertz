import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.buttonProgress} />
    </div>
  );
}
