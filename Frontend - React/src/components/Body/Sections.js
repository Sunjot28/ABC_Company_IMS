import React from "react";
import Homepage from "./Homepage";
import { Tab, Tabs, makeStyles } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import AnalyticsView from "./AnalyticsView";
import AddData from "./AddData";

const Sections = () => {
  const [value, setValue] = useState("0");
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: "8px",
      backgroundColor: "#666666",
    },
    tabs: {
      marginBottom: 0,
    },
    tab: {
      minWidth: "auto",
      marginRight: theme.spacing(1),
      color: "white",
      marginLeft: "1rem",
    },
    indicator: {
      backgroundColor: "white",
    },
  }));

  const changeTab = (value) => {
    setValue(value);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TabContext value={value} className={classes.root}>
        <Tabs
          value={value}
          className={classes.tabs}
          classes={{ indicator: classes.indicator }}
        >
          <Tab
            label="Home Page"
            className={classes.tab}
            value={"0"}
            onClick={() => changeTab("0")}
          ></Tab>
          <Tab
            label="Add Data"
            className={classes.tab}
            value={"1"}
            onClick={() => changeTab("1")}
          ></Tab>
          <Tab
            label="Analytics View"
            className={classes.tab}
            value={"2"}
            onClick={() => changeTab("2")}
          ></Tab>
        </Tabs>
        <TabPanel value={"0"}>
          <Homepage />
        </TabPanel>
        <TabPanel value={"1"}>
          <AddData />
        </TabPanel>
        <TabPanel value={"2"}>
          <AnalyticsView />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Sections;
