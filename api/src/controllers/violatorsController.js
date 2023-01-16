//Sends new data to user every one second. getViolatorData updates global variable.
exports.start_updating_connection = (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(() => {
    res.write(
      "data: message" + JSON.stringify(global.violatorData) + "\n\n",
      () => {
        console.log("callback done");
      }
    );
  }, 1000);
};
