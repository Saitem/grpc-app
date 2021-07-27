async function grpcCall(serviceFunction, serviceName: string, data) {
  return new Promise((resolve, reject) => {
    serviceFunction[serviceName](data, (err, response) => {
      if (response) {
        return resolve(response);
      } else {
        return reject(err);
      }
    });
  });
}

function sleep(milliseconds) {
  console.log(`Sleep on ${milliseconds / 1000} seconds`);
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function retryCall(callFunc, retries = 3) {
  console.log(`Attempts left ${retries}`);
  try {
    return await callFunc();
  } catch (e) {
    if (retries > 0) {
      await sleep(10000);
      return retryCall(callFunc, retries - 1);
    } else {
      return {
        message: 'Service unavailable',
        status: 500
      };
    }
  }
}

async function retryGrpcCall(serviceFunction, serviceName: string, data) {
  return await retryCall(async () => await grpcCall(serviceFunction, serviceName, data));
}

export default retryGrpcCall