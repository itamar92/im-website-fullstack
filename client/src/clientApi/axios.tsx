import axios from "axios";
import { urlUsers } from "../endpoints";

const baseURL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: `${baseURL}`,
});
