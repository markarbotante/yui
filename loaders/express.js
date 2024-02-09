'use strict';

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rekuire = require('rekuire');
const Logger = rekuire('Logger');

const expressConfiguration = {
	init: (app) => {
		return new Promise((resolve, reject) => {
			Promise.all([
				/* Express Configurations here */
				app.use(bodyParser.json()),
				app.use(bodyParser.urlencoded({ extended: false })),
				app.use(cookieParser()),

				/* Check Reference Id on all requests */
				app.use((req, res, next) => {
					let referenceId = req.headers['x-reference-id'] || req.headers['reference-id'] || req.body.referenceId || '';
					/* Generate new refId */
					if (!referenceId)
						referenceId = expressConfiguration.generateRefId();
					req.headers.refId = referenceId;

					let query = req.query || {};
					let headers = req.headers || {};
					let body = JSON.parse(Logger.formatObject(req.body)) || {}

					// Log Headers + query + body
					Logger.log('debug', `[REQUEST][REFID:${req.headers.refId}] ` + res.req.method + ' ' + req.originalUrl, {
						headers: headers,
						query: query,
						body: body
					});
					next();
				}),

				/* Responses */
				app.use((req, res, next) => {
					res.ok = function (body) {
						Logger.log('debug', `[RESPONSE][REFID:${req.headers.refId}] ` + res.req.method + ' ' + req.originalUrl + ' response', body);
						res.status(200);
						res.json(body);
					}
					res.error = function (error) {
						Logger.log('error', `[RESPONSE][REFID:${req.headers.refId}] ` + res.req.method + ' ' + req.originalUrl, error);
						res.status(error.status);
						//res.json({ error: error.error });
						res.json({ errors: [error.error] });
					}
					next();
				})
			]).then((result) => {
				resolve({
					EXPRESS: true
				});
			}).catch((e) => {
				reject(e)
			});
		});
	},

	generateRefId: () => {
		let uuidLength = 14;
		let requestUUID = Math.floor(Math.pow(10, uuidLength - 1) + Math.random() * (Math.pow(10, uuidLength), -Math.pow(10, uuidLength - 1) - 1));
		return requestUUID;
	}
}

module.exports = expressConfiguration;
