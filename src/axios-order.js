import axios from "axios";

const instance = axios.create({
  baseURL: "https://coronavirus-tracker-api.herokuapp.com/",
});

export default instance;
