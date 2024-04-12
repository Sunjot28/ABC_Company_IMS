import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Modal, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Lbuttons(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#fc7500",
      color: "white",
      left: "0.75rem",
      bottom: "2.6rem",
      marginRight: "1.25rem",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    formHeading1: {
      fontSize: 18,
      fontFamily: "Roboto",
      color: "#797a7d",
      margin: 0,
    },
    formHeading2: {
      fontSize: 22,
      fontFamily: "Roboto",
      color: "#797a7d",
      margin: 0,
    },
    input: {
      height: "2rem",
      borderRadius: "4px",
      border: "1px solid #a9a9a9",
    },
    label: {
      position: "absolute",
      fontSize: 12,
      marginTop: "10px",
      backgroundColor: "white",
      paddingRight: 2,
      paddingLeft: 2,
      marginLeft: 8,
      color: "#797a7d",
    },
    editPaper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "none",
      padding: theme.spacing(1),
      outline: "none",
      maxWidth: "400px",
      height: 200,
      width: 350,
      margin: "auto",
      marginTop: "11rem",
      border: "2.5px solid #fc7500",
      borderRadius: "10px",
    },
    deletePaper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "none",
      padding: theme.spacing(2),
      outline: "none",
      maxWidth: "400px",
      height: 146,
      width: 325,
      margin: "auto",
      marginTop: "12rem",
      border: "2.5px solid #fc7500",
      borderRadius: "10px",
    },
    formButtons1: {
      width: "100%",
      borderColor: "#797a7d",
    },
    formButtons2: {
      width: "100%",
      borderColor: "#797a7d",
      margin: 3,
    },
  }));

  const classes = useStyles();
  const [editData, setEditData] = useState({
    custOrderId: "",
    salesOrg: "",
    distChan: "",
    custNum: "",
    compCode: "",
    orderCurr: "",
    amountInUsd: "",
    orderCreationDate: "",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const changeHandler = (event) => {
    const { value, name } = event.target;
    console.log(name, value);
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const onEditClose = (isDataRequired) => {
    setEditOpen(false);
    console.log(isDataRequired ? console.log(editData) : null);
  };

  const onDeleteClose = (isDataRequired) => {
    setDeleteOpen(false);
    console.log(isDataRequired ? console.log(editData) : null);
  };

  const toggleEditModal = () => {
    setEditOpen(!editOpen);
  };

  const toggleDeleteModal = () => {
    setDeleteOpen(!deleteOpen);
  };

  const editRowId = props.rowId;
  console.log(editRowId);

  const toastDeleteSuccess = () => {
    toast.success("Invoice(s) Deleted Successfully!", {
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

  const toastEditSuccess = () => {
    toast.success("Invoice Edited Successfully!", {
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

  const toastDeleteError = () => {
    toast.error("Error while Deleting Invoice.", {
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

  const toastEditError = () => {
    toast.error("Error while Editing Invoice.", {
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

  const toastRefreshInfo = () => {
    toast.info("Invoices Refreshed Successfully!", {
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

  const toastRefreshError = () => {
    toast.error("Error while Refreshing Invoices.", {
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/invoices/${editRowId}`, editData);
      console.log("Data edited successfully.");
      toggleEditModal();
      setIsUpdated(!isUpdated);
      props.onUpdate(isUpdated);
      toastEditSuccess();
    } catch (error) {
      toastEditError();
      console.error("Error while editing data:", error);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/invoices/${editRowId}`);
      console.log("Data deleted successfully.");
      toggleDeleteModal();
      setIsUpdated(!isUpdated);
      props.onUpdate(isUpdated);
      toastDeleteSuccess();
    } catch (error) {
      toastDeleteError();
      console.error("Error while deleting data:", error);
    }
  };

  const handleEditDefault = async (e) => {
    try {
      const resp = await axios.get(
        `http://localhost:8080/invoices/${editRowId}`
      );
      setEditData(resp.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleRefresh = () => {
    try {
      setIsUpdated(!isUpdated);
      props.onUpdate(isUpdated);
      toastRefreshInfo();
    } catch (error) {
      toastRefreshError();
      console.error("Error while refreshing data:", error);
    }
  };

  return (
    <>
      <div className="buttonContainer1">
        <Button
          className={classes.root}
          variant="contained"
          onClick={() => handleRefresh()}
        >
          Refresh Data
        </Button>

        <Button
          className={classes.root}
          onClick={() => {
            if (!editOpen) {
              setEditOpen(true);
            }
            handleEditDefault();
          }}
          variant="contained"
          disabled={props.rows !== 1}
        >
          Edit
        </Button>

        <Button
          className={classes.root}
          variant="contained"
          disabled={props.rows < 1}
          onClick={() => {
            if (!deleteOpen) {
              setDeleteOpen(true);
            }
          }}
        >
          Delete
        </Button>

        <Modal open={editOpen} onClose={onEditClose} className={classes.modal}>
          <form className={classes.editPaper} onSubmit={handleEditSubmit}>
            <h1 className={classes.formHeading1}>Edit</h1>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <label className={classes.label} for="orderCurrency">
                  ORDER CURRENCY
                </label>
                <br />
                <input
                  type="text"
                  name="orderCurr"
                  className={classes.input}
                  value={editData.orderCurr}
                  onChange={changeHandler}
                  id="orderCurr"
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label} for="companyCode">
                  COMPANY CODE
                </label>
                <br />
                <input
                  type="number"
                  name="compCode"
                  value={editData.compCode}
                  className={classes.input}
                  onChange={changeHandler}
                  id="compCode"
                />
              </Grid>
              <Grid item xs={12}>
                <label className={classes.label} for="distChan">
                  DISTRIBUTION CHANNEL
                </label>
                <br />
                <input
                  type="text"
                  name="distChan"
                  value={editData.distChan}
                  className={classes.input}
                  onChange={changeHandler}
                  id="distChan"
                  style={{ width: "21.5rem", height: "2.5rem" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.formButtons1}
                  variant="outlined"
                  type="submit"
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.formButtons1}
                  variant="outlined"
                  onClick={() => onEditClose(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Modal>

        <Modal open={deleteOpen} onClose={onDeleteClose}>
          <form className={classes.deletePaper} onSubmit={handleDeleteSubmit}>
            <h1 className={classes.formHeading2}>Delete Records?</h1>
            <p style={{ color: "#797a7d" }}>
              Are you sure you want to delete these record[s]?
            </p>
            <div style={{ display: "flex" }}>
              <Button
                className={classes.formButtons2}
                variant="outlined"
                onClick={() => onDeleteClose(false)}
              >
                CANCEL
              </Button>
              <Button
                className={classes.formButtons2}
                variant="outlined"
                type="submit"
              >
                DELETE
              </Button>
            </div>
          </form>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}

export default Lbuttons;
