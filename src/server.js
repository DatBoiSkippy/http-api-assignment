const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonReponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    GET: {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        '/success': jsonHandler.success,
        '/badRequest': jsonHandler.badRequest,
        '/unauthorized': jsonHandler.unAuthorized,
        '/forbidden' : jsonHandler.forbidden,
        '/internal' : jsonHandler.internalError,
        '/notImplemented' : jsonHandler.notImplemented,
        notFound: jsonHandler.notFound,
    },
}

const onRequest = (request, response) => {

    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);
    const acceptedTypes = request.headers.accept.split(',');

    if (!urlStruct[request.method]) {
        return urlStruct.GET.notFound(request, response, params, acceptedTypes);
    }

    if (urlStruct[request.method][parsedUrl.pathname]) {
        return urlStruct[request.method][parsedUrl.pathname](request, response, params, acceptedTypes);
    }

    return urlStruct[request.method].notFound(request, response, params, acceptedTypes);
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
})