/* Router Entry Point */
'use strict';

require('dotenv').config();

const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const Logger = require('../util/Logger');
const Errors = require('../util/Errors');
const Swagger = require('../util/Swagger');

const loader = {
	init: (app) => {
		return new Promise((resolve, reject) => {
			var paths = {};

			try {
				/* Get Version */
				fs.readdirSync('./routes/').forEach((version) => {
					if (version.toUpperCase() !== 'INDEX.JS' && version.toUpperCase() !== 'CONTROLLERS') {
						fs.readdirSync('./routes/' + version + '/').forEach((module) => {

							/* Get Router File: {version}/{module}/{router}.js */
							let _router = './' + version + '/' + module + '/' + module.replace('.js', '');

							/* Register Route */
							let router = require(_router);
							let newPath = loader.formatBasePath(`/${version}${router.basePath}`);
							paths[newPath] = loader.registerRoute(app, router, version, module);
						});
					}
				});

				/* Api Documentation - Swagger 2.0 */
				/* Format paths */
				for (var key in paths) {
					paths[key].forEach((endpoint, index) => {
						paths[key][index]['path'] = loader.formatBasePath(paths[key][index]['path']);
					});
				}
				/* Generate Swagger Docs*/
				let swaggerDocument = Swagger.generateDocs(paths);
				var options = {
					customCss: '.swagger-ui .topbar { display: none }'
				};
				app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

				app.get('/swagger', (req, res, next) => {
					res.status(200).json(swaggerDocument);
				});

				/* Handle non existing endpoints */
				app.use('*', (req, res, next) => {
					res.error(Errors.raise('NOT_FOUND'));
				});

				resolve({ ROUTES: true });
			} catch (e) {
				reject(e);
			}
		});
	},

	registerRoute: (app, router, version, module) => {
		let basePath = '/' + version + router.basePath;
		let list = [];
		try {
			router.endpoints.forEach((endpoint) => {
				try {
					app[endpoint.method.toLowerCase()](basePath + endpoint.path, endpoint.handler);
					// endpoint.version = version;
					// endpoint.module = module;
					if (endpoint.path === '/')
						endpoint.path = '';
					endpoint.handler = '';
					endpoint.tags = router.tags;
					Logger.log('info', 'Endpoint created', endpoint.method.toUpperCase() + ' ' + basePath + endpoint.path);
					list.push(endpoint);
				} catch (e) {
					let method = JSON.stringify({ endpoint: endpoint.method + ' ' + basePath + endpoint.path })
					throw new Error('Invalid method:' + method);
				}
			});
		} catch (e) {
			throw Error(e);
		}
		return list
	},

	formatBasePath: (basePath) => {
		let newPath = ''
		let spl = basePath.split('/');
		spl.forEach((str, index) => {
			if (str.charAt(0) === ':') {
				let newStr = str.replace(':', '');
				spl[index] = `{${newStr}}`
			}
		});
		newPath = spl.join('/');
		return newPath
	}
}

module.exports = loader