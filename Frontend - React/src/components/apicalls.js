import axios from "axios";

export const getData = async () => {
  let response = await axios.get("http://localhost:8080/invoices");
  return response.data;
};

export const getDistChanList = async () => {
  let response = await axios.get(
    "http://localhost:8080/invoices/distChan/items"
  );
  return response.data;
};

export const getCustNumList = async () => {
  let response = await axios.get(
    "http://localhost:8080/invoices/custNum/items"
  );
  return response.data;
};

export const getRecentList = async () => {
  let response = await axios.get(
    "http://localhost:8080/invoices/recent"
  );
  return response.data;
};
