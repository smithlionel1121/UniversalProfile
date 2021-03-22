import React, { useEffect, useState } from "react";

import { makeCancelable } from "./utils";

function useFetchContractData(erc725, fetchFunction) {
  const [contract, setContract] = useState();
  const [contractFound, setContractFound] = useState(true);

  useEffect(() => {
    const cancelablePromise = makeCancelable(fetchFunction(erc725));
    cancelablePromise.promise
      .then(data => {
        setContract(data);
        setContractFound(true);
      })
      .catch(err => {
        if (!err.isCanceled) {
          if (err.message === "Missing ERC725 contract address.") {
            setContractFound(false);
          } else {
            console.error(err);
          }
        }
      });

    return () => {
      cancelablePromise.cancel();
    };
  }, []);

  return [contract, contractFound];
}

export default useFetchContractData;
