import axios from "axios";
import { BASE_URL } from "./constants";

export const submitBillDetails = (uri, billDetails) => {
  return axios.post(BASE_URL + uri, billDetails);
};

export const updateBillDetails = (uri, billDetails) => {
  return axios.put(BASE_URL + uri, billDetails);
};

export const getBillDetails = (uri) => {
  return axios.get(BASE_URL + uri);
};

export const login = (uri) => {
  return axios.get(BASE_URL + uri);
};

export const register = (uri, loginDetails) => {
  return axios.post(BASE_URL + uri, loginDetails);
};

export const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  return localStorage.getItem(key);
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
