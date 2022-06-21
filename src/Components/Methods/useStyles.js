import React from "react";
import { makeStyles }  from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
}));

export const useStylesName = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo2: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "yellow",
    textAlign: "left",
  },
}));
