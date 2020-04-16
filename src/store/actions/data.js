import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

let timeElasped = null;
export const fetchDataStart = () => {
  console.log("fetchDataStart");
  return {
    type: actionTypes.FETCH_DATA_START,
  };
};

export const fetchDataSuccess = (data, deathsData, recoveredData) => {
  timeElasped = new Date().getSeconds() - timeElasped;
  console.log("fetchDataSuccess  ", timeElasped);
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    data: data,
    deathsData: deathsData,
    recoveredData: recoveredData,
  };
};

export const fetchDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAILED,
    error: error,
  };
};

export const fetchData = () => {
  console.log("fetchData");
  timeElasped = new Date().getSeconds();
  return (dispatch) => {
    axios
      .get("/all")
      .then((Response) => {
        dispatch(
          fetchDataSuccess(
            Response.data.confirmed,
            Response.data.deaths,
            Response.data.recovered
          )
        );
      })
      .catch((Error) => {
        dispatch(fetchDataFailed(Error.message));
      });
  };
};

export const updateData = (index) => {
  return {
    type: actionTypes.UPDATE_DATA,
    index: index,
  };
};
