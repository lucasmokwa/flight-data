exports.handler = async (event) => {
  const getPrice = require("./dbFunc");

  if (
    event.queryStringParameters &&
    event.queryStringParameters.origin &&
    event.queryStringParameters.dest
  ) {
    const origin = event.queryStringParameters.origin;
    const dest = event.queryStringParameters.dest;
    let data = await getPrice(origin, dest);

    const response = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return response;
  } else {
    const error = {
      statusCode: 400,
      body: JSON.stringify("Error parsing request."),
    };
    return error;
  }
};
