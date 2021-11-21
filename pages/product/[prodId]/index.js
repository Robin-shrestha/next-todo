import React from "react";
import { useRouter } from "next/router";
const ProdDetail = (props) => {
  const route = useRouter();
  return (
    <div>
      detail {route.query.prodid}
      <button
        onClick={() => {
          route.push("/");
        }}
      >
        home
      </button>
      <button
        onClick={() => {
          route.back();
        }}
      >
        back
      </button>
    </div>
  );
};

export default ProdDetail;
