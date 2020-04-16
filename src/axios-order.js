import axios from "axios";

const instance = axios.create({
  baseURL: "https://covid-tracker-us.herokuapp.com/",
});

export default instance;
