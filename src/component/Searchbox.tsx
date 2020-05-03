import React from "react";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import { AuthContext } from './Store/Context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: 15,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "40vw",
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(1),
        width: "30%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "35vw",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

const Searchbox: React.FC = () => {
  const classes = useStyles();
  const { checkSearch } = React.useContext(AuthContext);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let keyword = e.target.value;
    checkSearch(keyword);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={(e)=>searchHandler(e)}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default Searchbox;
