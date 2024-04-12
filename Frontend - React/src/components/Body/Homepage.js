import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from "../apicalls";
import Lbuttons from "./Lbuttons";

const useStyles = makeStyles({
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

const Homepage = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const selectedCheckboxCount = selectedRows.length;

  useEffect(() => {
    (async () => setData(await getData()))();
  }, [isUpdated]);

  useEffect(() => {
    (async () => setData(await getData()))();
  }, []);

  const handleGridUpdate = () => {
    setIsUpdated(!isUpdated);
  };

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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      {/* <Ubuttons /> */}
      <div
        className={classes.root}
        style={{
          width: "100%",
          height: 550,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataGrid
          // {...data}
          rows={data}
          columns={columns}
          className={classes.root}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          pageSize={selectedRowsPerPage}
          onPageSizeChange={(newPageSize) => {
            setSelectedRowsPerPage(newPageSize);
          }}
          selectionModel={selectedRows}
          onSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
          rowHeight={40}
          checkboxSelection
          disableSelectionOnClick
          hideFooterSelectedRowCount
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
      <Lbuttons
        rows={selectedCheckboxCount}
        rowId={selectedRows}
        onUpdate={handleGridUpdate}
      />
    </div>
  );
};

export default Homepage;
