import axios from "axios";
import GLOBAL from "../global/Globals";

const api = axios.create({
  baseURL: GLOBAL.BASE_URL,
});

export default api;
