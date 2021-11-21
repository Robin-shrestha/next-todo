import React from "react";

const ErrorComponent = ({ errorList, name }) => {
  return (
    <>
      {errorList.some((el) => el.field === name) ? (
        <small style={{ color: "red" }}>
          {errorList.find((el) => el.field === name).message}
        </small>
      ) : null}
    </>
  );
};

export default ErrorComponent;
