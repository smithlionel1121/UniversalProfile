/* eslint-disable no-sequences */
/* eslint-disable prefer-promise-reject-errors */
export const makeCancelable = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      (error) => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export function promisedBatchRequest(arr, fromAddress) {
  const BatchRequest = new web3.eth.BatchRequest();
  const requestsArray = arr.map(
    (call) =>
      new Promise((resolve, reject) => {
        const request = call.request({ from: fromAddress }, (error, result) => {
          // eslint-disable-next-line no-unused-expressions
          error ? reject(error) : resolve(result);
        });
        BatchRequest.add(request);
      }),
  );
  return BatchRequest.execute(), Promise.all(requestsArray);
}
