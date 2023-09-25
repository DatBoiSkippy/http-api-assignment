
const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'Success',
    id: 'success',
  };

  if (acceptedTypes[0] === 'application/json') {

    const responseString = JSON.stringify(responseObj);
    return respond(request, response, 200, responseString, 'application/json');
  }

  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseObj.message}</message>`;
  responseXML = `${responseXML} <id>${responseObj.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 200, responseXML, 'text/xml');
};
const notFound = (request, response, params, acceptedTypes) => {

  const responseObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'application/json') {

    const responseString = JSON.stringify(responseObj);
    return respond(request, response, 404, responseString, 'application/json');
  }

  // return a 404 with an error message
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseObj.message}</message>`;
  responseXML = `${responseXML} <id>${responseObj.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 404, responseXML, 'text/xml');
};
const badRequest = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {

    responseObj.message = "Missing valid query parameter set to true";
    responseObj.id = 'badRequest';

    if (acceptedTypes[0] === 'application/json') {

      const responseString = JSON.stringify(responseObj);
      return respond(request, response, 400, responseString, 'application/json');
    }
    // return a 400 with an error message
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 400, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(responseObj), 'application/json');
};
const unAuthorized = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'Unauthorized',
  };

  if (!params.loggedIn || params.loggedIn !== 'true') {

    responseObj.message = "Missing loggedIn query parameter set to yes";
    responseObj.id = 'unauthorized';

    if (acceptedTypes[0] === 'application/json') {

      const responseString = JSON.stringify(responseObj);
      return respond(request, response, 401, responseString, 'application/json');
    }
    // return a 401 with an error message
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 401, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(responseObj), 'application/json');
};
const forbidden = (request, response, params, acceptedTypes) => {

  const responseObj = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'application/json') {

    const responseString = JSON.stringify(responseObj);
    return respond(request, response, 403, responseString, 'application/json');
  }

  // return a 403 with an error message
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseObj.message}</message>`;
  responseXML = `${responseXML} <id>${responseObj.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 403, responseXML, 'text/xml');
};
const internalError = (request, response, params, acceptedTypes) => {

  const responseObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'application/json') {

    const responseString = JSON.stringify(responseObj);
    return respond(request, response, 500, responseString, 'application/json');
  }

  // return a 403 with an error message
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseObj.message}</message>`;
  responseXML = `${responseXML} <id>${responseObj.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 500, responseXML, 'text/xml');
};
const notImplemented = (request, response, params, acceptedTypes) => {

  const responseObj = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'application/json') {

    const responseString = JSON.stringify(responseObj);
    return respond(request, response, 501, responseString, 'application/json');
  }

  // return a 403 with an error message
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${responseObj.message}</message>`;
  responseXML = `${responseXML} <id>${responseObj.id}</id>`;
  responseXML = `${responseXML} </response>`;

  return respond(request, response, 501, responseXML, 'text/xml');
};
module.exports = {
  success,
  notFound,
  badRequest,
  unAuthorized,
  forbidden,
  internalError,
  notImplemented,
}