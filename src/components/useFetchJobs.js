import { useReducer, useEffect } from "react";
import axios from "axios";

// Dealing with Cors probleam
// https://cors-anywhere.herokuapp.com/

// API URL
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

const initialState = {
  jobs: [],
  loading: true
};

// ACTIONS BY API
const ACTIONS = {
  MAKE_REQ: "make-req",
  GET_DATA: "get-data",
  ERROR: "error"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQ:
      return { loading: true, jobs: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: []
      };

    default:
      return state;
  }
};

function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cancelTocken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQ });
    axios
      .get(BASE_URL, {
        cancelTocken: cancelTocken.token,
        params: { markdown: true, page: page, ...params }
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { jobs: error } });
      });
  }, [params, page]);

  return state;
}

export default useFetchJobs;
