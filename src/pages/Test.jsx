import React, { useState } from "react";
import axios from "axios";
function Test(params) {
  const [state, setState] = useState([]);

  function OnClick(event) {
    axios
      .get("https://logibricks.com/api/blogs/marketplace-management")
      .then((responce) => {
        setImmediate(() => {
          setState(responce.data.blogs.data);
        });
      });
  }
  return (
    <>
      <button onClick={OnClick}>click me !</button>

      {state.map((data) => {
        return <p key={data.id}>{data.id}</p>;
      })}
    </>
  );
}

export default Test;
