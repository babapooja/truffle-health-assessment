import axios from "axios";
import { BASE_URL } from "./constants";

export const submitBillDetails = (uri, billDetails) => {
  return axios.post(BASE_URL + uri, billDetails);
};

export const updateBillDetails = (uri, billDetails) => {
  return axios.put(BASE_URL + uri, billDetails);
};

export const getBillDetails = (uri) => {
  console.log(BASE_URL + uri)
  return axios.get(BASE_URL + uri);
};
