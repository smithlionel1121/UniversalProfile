export const makeCancelable = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export function promisedBatchRequest(arr, fromAddress) {
  let BatchRequest = new web3.eth.BatchRequest();
  let requestsArray = arr.map(
    call =>
      new Promise((resolve, reject) => {
        let request = call.request({ from: fromAddress }, (error, result) => {
          error ? reject(error) : resolve(result);
        });
        BatchRequest.add(request);
      })
  );
  return BatchRequest.execute(), Promise.all(requestsArray);
}
