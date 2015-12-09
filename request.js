'use strict';

const https = require('https');
const querystring = require('querystring');

function request(token, method, path, args) {
    return new Promise((resolve, reject) => {
        if (method[0] !== 'P' && args) {
            path += '?' + querystring.stringify(args);
            args = null;
        }

        let options = {
            protocol: 'https:',
            host: 'api.boxc.com',
            method: method,
            path: '/v1/' + path,
            headers: {}
        };

        if (token) {
            options.headers = {
                Authorization: 'Bearer ' + token
            }
        }

        if (args) {
            args = JSON.stringify(args);
            options.headers['Content-Length'] = Buffer.byteLength(args);
        }

        let req = https.request(options, res => {
            let chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                let json = JSON.parse(Buffer.concat(chunks).toString());

                if (json.status && json.status === 'error') {
                    return reject(new Error(json.message, json.code));
                }

                resolve(json);
            });
        });

        req.on('error', reject);

        if (args) {
            req.write(args);
        }

        req.end();
    });
}

request.get = (token, path, args) => request(token, 'GET', path, args);
request.post = (token, path, body) => request(token, 'POST', path, body);
request.put = (token, path, body) => request(token, 'PUT', path, body);
request.delete = (token, path) => request(token, 'DELETE', path);

request.asJSON = buffer => JSON.stringify(buffer.toString());

module.exports = request;