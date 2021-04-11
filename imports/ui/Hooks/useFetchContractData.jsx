import React, { useEffect, useState } from "react";

import { makeCancelable } from "./utils";

function useFetchContractData(fetchFunction, ...params) {
  const [contractInfo, setContractInfo] = useState([null, null]);

  useEffect(() => {
    const cancelablePromise = makeCancelable(fetchFunction(...params));
    cancelablePromise.promise
      .then(data => {
        setContractInfo([data, true]);
      })
      .catch(err => {
        if (!err.isCanceled) {
          if (err.message === "Missing ERC725 contract address.") {
            setContractInfo([null, false]);
          } else {
            console.error(err);
          }
        }
      });

    return () => {
      cancelablePromise.cancel();
    };
  }, []);

  return contractInfo;
}

export default useFetchContractData;
