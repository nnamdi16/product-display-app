import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./Loader.css";

const ShowDetail = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="loader">
        <Loader type="ThreeDots" color="#2BAD60" />
      </div>
    )
  );
};

export default ShowDetail;
