import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InputField = (props) => {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          {props.labelName}
        </span>
        <input
          type={props.type}
          className="form-control"
          value={props.value}
          name={props.name}
          placeholder={props.placeholderName}
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={props.onHendler}
        />
      </div>
    </>
  );
};
export default InputField;
