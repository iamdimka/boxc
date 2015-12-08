'use strict';

const https = require('https');
const querystring = require('querystring');

function request(token, method, path, args) {
    return new Promise((resolve, reject) => {

        if (method[0] === 'P' && args) {
            path += '?' + querystring.stringify(args);
            args = null;
        }

        let options = {
            protocol: 'https',
            host: 'api.boxc.com',
            method: method,
            path: '/v1/' + path
        };

        if (token) {
            options.headers = {
                Authorization: 'Bearer ' + token
            }
        }

        let req = https.request(options, res => {
            let chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        });

        req.on('error', reject);

        if (args) {
            req.write(JSON.stringify(args));
        }

        req.end();
    });
}

request.get = (token, path, args) => request('GET', path, args);
request.post = (token, path, body) => request('POST', path, body);
request.put = (token, path, body) => request('PUT', path, body);
request.delete = (token, path) => request('DELETE', path);

request.asJSON = buffer => JSON.stringify(buffer.toString());

module.exports = request;