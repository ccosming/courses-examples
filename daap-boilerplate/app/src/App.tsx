import axios from "axios";
import { useState } from "react";

export const App = () => {
  const [data, setData] = useState({ message: "" });

  const callSmartContract = async () => {
    axios({
      method: "get",
      url: "http://localhost:4000",
      responseType: "json",
    }).then(function (response) {
      setData(response.data);
    });
  };

  return (
    <div>
      {data && <h1>{data.message}</h1>}
      <button
        onClick={async (e) => {
          e.preventDefault();
          await callSmartContract();
        }}
      >
        Call smart contract
      </button>
    </div>
  );
};
