async function fetchData(url, options) {
  // Node-included fetch api. Response from the Reaktor-provided endpoint.
  let response;
  try {
    response = await fetch(url, options);
  } catch (networkError) {
    // Fetch promise only fails when there's a network error
    // (e.g server is not connected to the internet).
    handleNetworkError(networkError);
    return;
  }

  if (!response?.ok) {
    console.log("Response not OK.");
    return;
  }
  return response;
}

function checkStatusCode(response) {
  //Todo write responses to all status codes
}

function handleNetworkError(networkError) {}

module.exports = fetchData;
