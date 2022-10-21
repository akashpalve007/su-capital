function sendResponse(res, status, data, err = "Something went wrong !") {
  if (err) {
    res.status(status).json({
      status: status,
      data: err,
    });
  } else {
    res.status(status).json({
      status: status,
      data,
    });
  }
}

module.exports.sendResponse = sendResponse;
