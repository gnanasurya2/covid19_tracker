import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: null,
  deathsData: null,
  recoveredData: null,
  error: true,
  loading: true,
  index: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        deathsData: action.deathsData,
        recoveredData: action.recoveredData,
      };
    case actionTypes.FETCH_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.UPDATE_DATA:
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
};

export default reducer;
