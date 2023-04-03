import axios from "axios";
import React, { useState } from "react";

const AxiosCall = (props) => {
  const [res, setRes] = useState([]);

  let resData = axios
    .get(`${HostManager.mainHost}/npim/unscanned/report/L1/NAT`)
    .then(
      (response) => {
        return response.data.value;
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );

  setRes(resData);
  return res;
};

export default AxiosCall;
