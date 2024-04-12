import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box, Button } from "@material-ui/core";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { getRecentList } from "../apicalls";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddData() {
  const [data, setData] = useState({
    custOrderId: "",
    salesOrg: "",
    distChan: "",
    custNum: "",
    compCode: "",
    orderCurr: "",
    amountInUsd: "",
    orderCreationDate: "",
  });
  const initialState = {
    custOrderId: "",
    salesOrg: "",
    distChan: "",
    custNum: "",
    compCode: "",
    orderCurr: "",
    amountInUsd: "",
    orderCreationDate: "",
  };
  const {
    custOrderId,
    salesOrg,
    distChan,
    custNum,
    compCode,
    orderCurr,
    amountInUsd,
    orderCreationDate,
  } = data;

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClearData = () => {
    toastClearDataInfo();
    setData(initialState);
  };

  const [latestData, setLatestData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    (async () => setLatestData(await getRecentList()))();
  }, []);

  useEffect(() => {
    (async () => setLatestData(await getRecentList()))();
  }, [isUpdated]);

  const toastError = () => {
    toast.error("Error while saving Invoice.", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const toastSuccess = () => {
    toast.success("Invoice Added Successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const toastClearDataInfo = () => {
    toast.info("Data Cleared!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      await axios.post("http://localhost:8080/invoices", data);
      console.log("Data successfully sent to the server");
      setData(initialState);
      setIsUpdated(!isUpdated);
      toastSuccess();
    } catch (error) {
      console.error("Error while sending data:", error);
      toastError();
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      "& .MuiGrid-spacing-xs-3> .MuiGrid-item": {
        padding: "8px",
      },
    },
    input: {
      width: "100%",
      height: "2.5rem",
      margin: "0",
      border: "none",
      borderRadius: "3px",
      paddingLeft: "5px",
    },
    button1: {
      width: "100%",
      height: "100%",
      backgroundColor: "#fc7500",
      color: "white",
    },
    button2: {
      width: "100%",
      height: "100%",
      backgroundColor: "#db4437",
      color: "white",
    },
  }));

  const gridStyles = makeStyles({
    root: {
      "& .MuiDataGrid-root": {
        fontFamily: "Roboto, RobotoDraft, Helvetica, Arial, sans-serif",
        color: "white",
        backgroundColor: "#666666",
        borderRadius: 0,
        border: "none",
      },
      "& .MuiDataGrid-row": {
        textAlign: "left",
        fontSize: "12.5px",
        borderBottom: "1px solid #fff",
        color: "white",
      },
      "& .MuiDataGrid-cell": {
        border: "none",
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        textAlign: "left",
        overflow: "visible",
        border: "none",
        padding: "0",
        fontWeight: "bold",
        lineHeight: "1.5",
        fontSize: "14px",
        whiteSpace: "normal",
        textOverflow: "clip",
        color: "white",
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiSvgIcon-root": {
        color: "white",
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        padding: 0,
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "1px solid #fff",
        color: "white",
      },
      "& .MuiTablePagination-caption": {
        color: "white",
      },
      "& .MuiSelect-select.MuiSelect-select": {
        color: "white",
      },
      "& .MuiButton-label": {
        color: "white",
        marginRight: "1rem",
        borderRadius: "5px",
        padding: "8px 12px",
        backgroundColor: "#fc7500",
        borderColor: "#797a7d",
        fontWeight: "700",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        "&:hover": {
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          backgroundColor: "#d5d5d5",
        },
      },
      "& .MuiDataGrid-root .MuiDataGrid-toolbarContainer": {
        paddingBottom: "12px",
        paddingLeft: 0,
        paddingTop: 0,
        // float: "right",
      },
      "& .MuiBadge-anchorOriginTopRightRectangle": {
        top: 0,
        right: 0,
        transform: "scale(1) translate(390%, -80%)",
        transformOrigin: "100% 0%",
      },
      "& .MuiBadge-anchorOriginTopRightRectangle.MuiBadge-invisible": {
        transform: "scale(0) translate(50%, -50%)",
      },
    },
  });

  const classes = useStyles();
  const gridClasses = gridStyles();

  const columns = [
    { field: "id", headerName: "Sl No", width: 75 },
    { field: "custOrderId", headerName: "CUSTOMER ORDER ID", width: 145 },
    { field: "salesOrg", headerName: "SALES ORG", width: 105 },
    { field: "distChan", headerName: "DISTRIBUTION CHANNEL", width: 270 },
    { field: "compCode", headerName: "COMPANY CODE", width: 130 },
    {
      field: "orderCreationDate",
      headerName: "ORDER CREATION DATE",
      width: 220,
    },
    { field: "orderCurr", headerName: "ORDER CURRENCY", width: 140 },
    { field: "custNum", headerName: "CUSTOMER NUMBER", width: 170 },
    { field: "amountInUsd", headerName: "AMOUNT IN USD", width: 100 },
  ];

  return (
    <>
      <div>
        {/* <Ubuttons /> */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.root}
        >
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="number"
                id="custOrderId"
                name="custOrderId"
                placeholder="CUSTOMER ORDER ID"
                value={custOrderId}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="number"
                id="salesOrg"
                name="salesOrg"
                placeholder="SALES ORG"
                value={salesOrg}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="text"
                id="distChan"
                name="distChan"
                placeholder="DISTRIBUTION CHANNEL"
                value={distChan}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="number"
                id="custNum"
                name="custNum"
                placeholder="CUSTOMER NUMBER"
                value={custNum}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="number"
                id="compCode"
                name="compCode"
                placeholder="COMPANY CODE"
                value={compCode}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="text"
                id="orderCurr"
                name="orderCurr"
                placeholder="ORDER CURRENCY"
                value={orderCurr}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="text"
                id="amountInUsd"
                name="amountInUsd"
                placeholder="AMOUNT IN USD"
                value={amountInUsd}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <input
                onChange={handleInputChange}
                className={classes.input}
                type="text"
                id="orderCreationDate"
                name="orderCreationDate"
                placeholder="ORDER CREATION DATE"
                value={orderCreationDate}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.button1}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.button2}
                variant="contained"
                onClick={() => handleClearData()}
              >
                Clear Data
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>

      <ToastContainer />
      <hr></hr>
      <div class="recentlyAdded">
        <p>Recently Added Data</p>
      </div>
      <div
        className={gridClasses.root}
        style={{
          width: "100%",
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataGrid
          // {...data}
          rows={latestData}
          columns={columns}
          className={gridClasses.root}
          getRowId={(row) => row.id}
          rowHeight={40}
          rowsPerPageOptions={[]}
          disableSelectionOnClick
          hideFooterSelectedRowCount
        />
      </div>
    </>
  );
}

export default AddData;
